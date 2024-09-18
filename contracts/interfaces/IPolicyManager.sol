// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Policy Manager Interface
interface IPolicyManager {
    event PolicyCreated(uint256 indexed policyId, address owner, uint256 coverageAmount, uint256 premium, uint256 expirationDate);
    event PolicyClaimed(uint256 indexed policyId, address owner, uint256 claimAmount);

    struct Policy {
        address owner;
        string title;
        uint256 coverageAmount;
        uint256 premium;
        uint256 expirationDate;
        bool isActive;
        string coverageType; // e.g., "smart_contract_failure", "exchange_hack", "defi_risk"
    }

    function createPolicy(string memory title,uint256 coverageAmount, uint256 duration, string memory coverageType) external returns (uint256);
    function claimPolicy(uint256 policyId) external;
    function getPolicyDetails(uint256 policyId) external view returns (Policy memory);
}