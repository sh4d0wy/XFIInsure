async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const balance = await deployer.getBalance();
    console.log("Account balance:", balance.toString());
  
    const Token = await ethers.getContractFactory("ReducedManager");
    const tokenAddress = "0x62f533dc3e52b9b6016adf4007f7ca1354b62bed";
    const insurancePooladdress = "0x27219f74691059787b022a596b9e5c62f8979e0b";
    const token = await Token.deploy(tokenAddress,insurancePooladdress);
    //0x1D055d65a625d8544ac9D4edF3109fB78A72e6E4 policy manager
    console.log("Contract deployed to address:", token.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  