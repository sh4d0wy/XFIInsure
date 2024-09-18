// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "./interfaces/IPolicyManager.sol";
import "./interfaces/IInsurancePool.sol";
import "./interfaces/IToken.sol";

// Policy Manager Contract
contract PolicyManager is IPolicyManager, Ownable, ReentrancyGuard {
    IToken public safeToken;
    IInsurancePool public insurancePool;
    mapping(uint256 => Policy) public policies;
    uint256 public nextPolicyId;
    mapping(address user=>uint256[] policyIdArray) public addressToPolicy;
    event PremiumPaid(uint256 policyId, address subscriber, uint256 premium);

    
    constructor(address _safeToken, address _insurancePool) Ownable(msg.sender){
        safeToken = IToken(_safeToken);
        insurancePool = IInsurancePool(_insurancePool);
    }

    modifier checkPolicyId(uint256 policyId){
        uint256[] storage policyIdArray = addressToPolicy[msg.sender];
        bool flag = false;
        for(uint256 index = 0;index<policyIdArray.length;index++){
            if(policyId==index){
                flag = true;
            }
        }
        if(!flag){
            revert("User does not purchased policy");
        }
        _;
    }

    function createPolicy(string memory _title,uint256 coverageAmount, uint256 duration, string memory coverageType) external onlyOwner override nonReentrant returns (uint256) {
        uint256 premium = calculatePremium(coverageAmount, duration, coverageType);
        require(safeToken.transferFrom(msg.sender, address(insurancePool), premium), "Premium payment failed");

        uint256 policyId = nextPolicyId++;
        policies[policyId] = Policy({
            title:_title,
            owner: msg.sender,
            coverageAmount: coverageAmount,
            premium: premium,
            expirationDate: block.timestamp + duration,
            isActive: true,
            coverageType: coverageType
        });

        emit PolicyCreated(policyId, msg.sender, coverageAmount, premium, block.timestamp + duration);
        return policyId;
    }

    function purchasePolicy(uint256 policyId) payable external nonReentrant {
        Policy storage policy = policies[policyId];
        require(block.timestamp <= policy.expirationDate, "Policy expired");
        uint256 premium = policy.premium;      
        require(msg.value==premium,"Insufficient funds sent");
        insurancePool.receivePremium{value:msg.value}(msg.sender,msg.value);
        addressToPolicy[msg.sender].push(policyId);
    }

    function claimPolicy(uint256 policyId)checkPolicyId(policyId) external override nonReentrant {
        Policy storage policy = policies[policyId];
        require(policy.isActive, "Policy not active");
        require(block.timestamp <= policy.expirationDate, "Policy expired");
        try insurancePool.payClaim(msg.sender, policy.coverageAmount){}
        catch{revert("Claim Pay Failed");}
        emit PolicyClaimed(policyId, msg.sender, policy.coverageAmount);
    }

    function payPremium(uint256 userPolicyId) checkPolicyId(userPolicyId) external payable nonReentrant {
        Policy storage policy = policies[userPolicyId];
        require(block.timestamp <= policy.expirationDate, "Policy expired");
        uint256 premium = policy.premium;      
        require(msg.value==premium,"Insufficient funds sent");
        insurancePool.receivePremium{value:msg.value}(msg.sender,msg.value);
        emit PremiumPaid(userPolicyId, msg.sender, premium);
    }

    function getPolicyDetails(uint256 policyId) external view override returns (Policy memory) {
        return policies[policyId];
    }

    function getAllPolicies() external view returns (Policy[] memory) {
        uint256 policyCount = nextPolicyId;
        Policy[] memory policiesArray = new Policy[](policyCount);
        for(uint256 index=1; index < policyCount; index++){
            policiesArray[index] = policies[index];
        }
        return policiesArray;
     }

    function getAllPoliciesForUser(address user) public view returns (Policy[] memory) {
        uint256 policyCount = addressToPolicy[user].length;
        Policy[] memory policiesOfUser = new Policy[](policyCount);
        for(uint256 index=1; index < policyCount; index++){
            policiesOfUser[index] = policies[index];
        }
        return policiesOfUser;
     }

    function calculatePremium(uint256 coverageAmount, uint256 duration, string memory coverageType) public pure returns (uint256) {
        uint256 baseRate = 1; // 1% per year
        if (keccak256(bytes(coverageType)) == keccak256(bytes("exchange_hack"))) {
            baseRate = 2; // 2% per year for exchange hack coverage
        } else if (keccak256(bytes(coverageType)) == keccak256(bytes("defi_risk"))) {
            baseRate = 3; // 3% per year for general DeFi risk
        }
        return (coverageAmount * baseRate * duration) / (30 days*100);
    }
}







