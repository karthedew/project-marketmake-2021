//"SPDX-License-Identifier: UNLICENSED"

pragma solidity ^0.7.3;

import "./AAVE/ILendingPool.sol";
import "./AAVE/IERC20.sol";
import "./AAVE/IWETHGateway.sol";
import "./AAVE/ILendingPoolAddressesProvider.sol";
import "./AAVE/IAToken.sol";

contract Lend {

    address depositor;
    uint amount;
    uint total_deposited;
    uint total_contract_balance;
    uint total_given;

    address deployer;
    uint lastATokenBalance;
    address[] userIndex;
    struct UserStruct {
        uint totalDeposited;
        uint aTokenBalance;
        uint givePercent;
        uint savedInterest;
        uint index;
    }
    mapping(address => UserStruct) userStructs;
    address payable giveAddress = 0x8f951903c9360345b4e1b536c7f5ae8f88a64e79;

    mapping(address => uint) internal total_interest;
    mapping(address => uint) internal balances;
    mapping(address => uint) internal giving_rates;
    mapping(address => uint) internal pool_percentage;
    mapping(address => uint) internal liquidity_indices;

    receive() external payable {}

    // FOR KOVAN
    // ILendingPool pool = ILendingPool(0x9FE532197ad76c5a68961439604C037EB79681F0);
    // IERC20 link = IERC20(0xa36085F69e2889c224210F603D836748e7dC0088);
    // IERC20 alink = IERC20(0xEC23855Ff01012E1823807CE19a790CeBc4A64dA);
    // WETHGateway gateway = WETHGateway(0xf8aC10E65F2073460aAD5f28E1EABE807DC287CF);

    // FOR MAINNET + LOCAL
    ILendingPoolAddressesProvider provider = ILendingPoolAddressesProvider(0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5);
    ILendingPool pool = ILendingPool(0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9);
    IERC20 link = IERC20(0xa36085F69e2889c224210F603D836748e7dC0088);
    IERC20 alink = IERC20(0xa06bC25B5805d5F8d82847D191Cb4Af5A3e873E0);
    IWETHGateway gateway = IWETHGateway(0xDcD33426BA191383f1c9B431A342498fdac73488);
    IERC20 aETH = IERC20(0x3a3A65aAb0dd2A17E3F1947bA16138cd37d08c04);
    IERC20 aWETH = IERC20(0x030bA81f1c18d280636F32af80b9AAd02Cf0854e);
    IERC20 WETH = IERC20(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);
    IAToken aTWETH = IAToken(0x030bA81f1c18d280636F32af80b9AAd02Cf0854e);

    constructor() {
        deployer = msg.sender;
    }

    //function to receive ETH and record the balance for the address
    //in the balances mapping, and record the percentage of interest going to giveth
    function deposit(uint _interest) external payable {
        scaleBalances();
        bool _exists = checkUserExistence(msg.sender);
        if (_exists == false) {
            userIndex.push(msg.sender);
        }
        userStructs[msg.sender].totalDeposited += userStructs[msg.sender].total_deposited;
        userStructs[msg.sender].givePercent = _interest;
        userStructs[msg.sender].index = userIndex.push(msg.sender)-1;

        depositAave(msg.sender, msg.value);
    }

    // Check if a user exists
    function checkUserExistence(address _userAddress) internal returns(bool) {
        uint _index = userStructs[_userAddress].index;
        address _indexed_address = userIndex[_index];
        if (_userAddress == _indexed_address) {
            return true;
        } else {
            return false;
        }
    }

    // Take ETH and deposit it into the AAVE lending protocol
    function depositAave(address _spender, uint _amount) internal {
        gateway.depositETH{value: _amount}(address(this), 0);
        userStructs[msg.sender].aTokenBalance += userStructs[msg.sender].aTokenBalance + _amount;
        lastATokenBalance = aWETH.balanceOf(address(this));
    }

    function scaleBalances() private {
        uint _aTokenBalance = aWETH.balanceOf(address(this));
        uint scalingFactor = (_aTokenBalance * (10 ** 2))/lastATokenBalance;
        for (uint i=0; i < userIndex.length; i++) {
            userStructs[userIndex[0]].aTokenBalance = userStructs[userIndex[0]].aTokenBalance * scalingFactor;
        }
    }

    // Withdraw ETH to the beneficiary's address
    function withdraw(uint _amount, bool _all) external {
        scaleBalances();
        require(userStructs[msg.sender].aTokenBalance >= _amount, "Trying to withdraw more than amount in account.");
        if (_all == true) {
            gateway.withdrawETH(uint(-1), msg.sender);
            deleteUser(msg.sender);
        } else if (_all == false) {
            gateway.withdrawETH(_amount, msg.sender);
        }
    }

    // Remove a user from userIndex and reorder
    function deleteUser(address _user) {
        uint index = userStructs[_user].index;
        address structToMove = userIndex[userIndex.length-1];
        userIndex[index] = structToMove;
        userStructs[structToMove].index = index;
        delete userIndex[userIndex.length-1];
    }

    //function work out the interest earned by each depositor for giving
    //at any point in time
    function interest_earned() internal {

    }   

    //function to send a percentage to giveth
    function give() internal {
        scaleBalances();
        
    }

    // Adjust the user's give percentage
    function adjust_giving_rate(uint _percentInterest) external {
        require(checkUserExistence(msg.sender), "You must be a depositor to adjust your give percentage.");
        userStructs[msg.sender].givePercent = _percentInterest;
    }

    // Read a user balance from the contract
    function balanceOf(address _account) external view returns (uint) {
        return userStructs[_account].aTokenBalance;
    }

    // Update the give address
    function updateGiveAddress(address payable _giveAddress) {
        require(msg.sender == deployer, "You do not have permission to update the giving address.");
        giveAddress = _giveAddress;
    }

}

