const { expect } = require("chai");
const { ethers } = require("hardhat");

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
    });

    describe("Depositing", function () {
        it("Should receive ETH", async function () {
            await expect(() => owner.sendTransaction({to: lendToken.address, value: 200}))
            .to.changeEtherBalance(lendToken, 200);
        });
        it("Should attribute ETH balance to the correct account", async function () {
            await lendToken.deposit(50, {value: 10});
            let balance = await lendToken.balanceOf(owner.address);
            expect(balance).to.equal(10);
        });
        it("Should have an ETH balance of 0 for the owner", async function () {
            await lendToken.deposit({value: 10});
            let balance = await lendToken.balancOf(owner.address);
            expect(balance).to.equal(0);
        });

    });
});