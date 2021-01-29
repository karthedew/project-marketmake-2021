// --- Local Imports ---
const { ethers, providers } = require("ethers");
var contract = require('./LendingPool.json')

var AaveLendingPool_Address = "0x95D1189Ed88B380E319dF73fF00E479fcc4CFa45";

// --- Set the Ethers.js Provider ---
const provider = new providers.JsonRpcProvider('https://kovan.infura.io/v3/4133d31370e042c1883b30ef86dfd251');
let signer = provider.getSigner()

// --- Create a new Ethere.js Contract ---
console.log('The signer: ', signer);
let cn = new ethers.Contract(AaveLendingPool_Address, contract, signer);

console.log(cn);
// --- Call the name() method from the Smart Contract ---
// let contract_name = cn.name();
// var tx = cn.deposit(assetAddress, amountToDeposit, interactor, 0)

// console.log(contract_name);