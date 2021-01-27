// This is a script for deploying your contracts. You can adapt it to deploy

const { ethers } = require("hardhat");

// yours, or create new ones.
async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is avaialble in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // =============================
  // --- DEPLOY TOKEN CONTRACT ---
  // =============================
  console.log('Getting artifacts together for Token Contract');
  const Token = await ethers.getContractFactory("Token");
  console.log('Deploying TokenContract')
  const token = await Token.deploy();
  await token.deployed();

  console.log("Token address:", token.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(token);


  // =================================================
  // --- DEPLOY PriceConsumerV3 Chainlink CONTRACT ---
  // =================================================
  console.log('Getting artifacts together - some else')
  const PriceConsumerV3 = await ethers.getContractFactory("PriceConsumerV3")
  console.log("Deploying PriceConsumerV3")
  const priceConsumerV3 = await PriceConsumerV3.deploy()
  await priceConsumerV3.deployed()

  console.log("priceConsumerV3 deployed to: ", priceConsumerV3.address)
  // ethPrice = await priceConsumerV3.getLatestPrice()
  // console.log("Price data for ETH: ", ethPrice.toString())
}


/**
 * 
 * @param {Contract} token 
 */
function saveFrontendFiles(token) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../client/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Token");

  fs.writeFileSync(
    contractsDir + "/Token.json",
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
