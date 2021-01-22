import { ethers } from "ethers";

const interactor = "0x497f35b5a2859343CdAA98aeDb7605B2c46136d7";
const pv_int = "d558cd5d5aa53cd3555a701994a12f9c3bfa566104d7eea7e7ffacd7232da6d2";
const lendingPoolAddress = "0x9FE532197ad76c5a68961439604C037EB79681F0";
const assetAddress = "0xAD5ce863aE3E4E9394Ab43d4ba0D80f419F61789"; // LINK
const amountToDeposit = ethers.utils.parseEther('20'); // 20 LINK 
const approvedAmount = ethers.utils.parseEther('200'); // 200 LINK approved

const provider = new ethers.providers.JsonRpcProvider('https://kovan.infura.io/v3/e5295e44f05647808a9855fbe7ce95f7');
var wallet = new ethers.Wallet(pv_int,provider);

const providerInstance = new ethers.Contract(assetAddress, erc20Abi, wallet );
const lendingPoolInstance = new ethers.Contract(lendingPoolAddress, lendingPoolAbi, wallet )


/**
 * [1] approve ERC20 Token amount that contract is allowed to spend
 * [2] deposit ERC20 Token into Aave LendingPool
 */

//const estGascostApprove = providerInstance.estimateGas.approve(lendingPoolAddress, approvedAmount).then((s)=> {console.log("Estimated Gascost approve : ",s)}).catch((e)=> console.log(e)) // estimated gascost for approve

//const approveLink = providerInstance.approve(lendingPoolAddress, approvedAmount).then((s)=> {console.log("Successfully approved: ",s)}).catch((e)=> console.log("Error : ",e)) // approve ERC20 [1]

//const estGascostDeposit = lendingPoolInstance.estimateGas.deposit(assetAddress, amountToDeposit, interactor, 0).then((s)=> {console.log("Estimated Gascost deposit : ",s)}).catch((e)=> console.log(e)) // estimated gascost for deposit

const depositLink = lendingPoolInstance.deposit(assetAddress, amountToDeposit, interactor, 0).then((s)=> {console.log("Successfully deposited : ",s)}).catch((e)=> console.log("Error : ",e)) // deposit ERC20 into Aave Lendingpool [2]

