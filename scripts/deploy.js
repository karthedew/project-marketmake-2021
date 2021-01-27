// This is a script for deploying your contracts. You can adapt it to deploy

const { ethers } = require("hardhat");
var fs = require('fs');

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

  // =================================
  // --- DEPLOY MULTIPLE CONTRACTS ---
  // =================================

  // TODO: Use this to automatically read a list of contracts from directory,
  // rather than adding manually
  const contracts_directory = __dirname + "/../contracts";

  // Add your contract name to the list:
  const contracts = ["PriceConsumerV3", "Lend"];

  var i;
  for (i=0; i < contracts.length; i++) {
    console.log('Getting contract artifact')
    var current_contract = await ethers.getContractFactory("PriceConsumerV3")
    console.log("Deploying contract: " + contracts[i])
    var current_contract = await current_contract.deploy()
    await current_contract.deployed()

    console.log(contracts[i] + " deployed to: ", current_contract.address)
    ethPrice = await current_contract.getLatestPrice()
    console.log("Price data for ETH: ", ethPrice.toString())
  }

  // =============================
  // --- DEPLOY TOKEN CONTRACT ---
  // =============================
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();

  console.log("Token address:", token.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(token);

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
