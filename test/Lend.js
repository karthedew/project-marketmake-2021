const { expect } = require("chai");
const { ethers } = require("hardhat");
const { assert } = require("chai");

const poolAddress = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9";
const aWETHAddress = "0x030bA81f1c18d280636F32af80b9AAd02Cf0854e";

describe("Lend contract", function () {

    let Lend;
    let lendToken;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        Lend = await ethers.getContractFactory("Lend");
        [owner, addr1, addr2] = await ethers.getSigners();
        lendToken = await Lend.deploy();
        aWETH = await ethers.getContractAt("IERC20", aWETHAddress);
    });

    describe("Depositing", function () {
        it("Should receive ETH", async function () {
            await expect(() => owner.sendTransaction({to: lendToken.address, value: 200}))
            .to.changeEtherBalance(lendToken, 200);
        });
        it("Should have an ETH balance of 0 for the contract", async function () {
            await lendToken.connect(addr1).deposit(50, {value: ethers.utils.parseEther("10")});
            const balance = await ethers.provider.getBalance(lendToken.address);
            expect(balance).to.equal(0);
        });
        it("Should have a aWETH balance for the contract", async function () {
            await lendToken.connect(addr1).deposit(50, {value: ethers.utils.parseEther("10")});
            let aWETHBalance = await aWETH.balanceOf(lendToken.address);
            expect(aWETHBalance).to.equal(ethers.utils.parseEther("10"))
        });

    });
});