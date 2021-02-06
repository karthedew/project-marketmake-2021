// SPDX-License-Identifier: MIT

pragma solidity ^0.7.3;

import "./AAVE/IERC20.sol";
import "./AAVE/IWETHGateway.sol";
import "./AAVE/IAToken.sol";

contract Lend {

    address admin;
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
    address payable giveAddress;

    event Deposit(uint _totalDeposit, uint _interest);
    event DepositAave(uint _aTokenBalance); 
    event Withdraw(address _beneficiary, uint _amount, bool _deleted); 
    event Give(uint _amount);
    event AdjustGivingRate(address _user, uint _percentInterest);
    event AddressUpdated(address _admin, address _giveAddress);
    event AdminUpdated(address _oldAdmin, address _newAdmin);

    receive() external payable {}

    // For MAINNET + LOCAL, needs updating for KOVAN
    IWETHGateway gateway = IWETHGateway(0xDcD33426BA191383f1c9B431A342498fdac73488);
    IAToken aWETH = IAToken(0x030bA81f1c18d280636F32af80b9AAd02Cf0854e);
    IERC20 WETH = IERC20(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);

    constructor(address payable _giveAddress) {
        admin = msg.sender;
        giveAddress = _giveAddress;
    }

    // Handles deposits, updates user struct and calls depositAave
    function deposit(uint _interest) external payable {
        scaleBalances();
        bool _exists = checkUserExistence(msg.sender);
        if (_exists == false) {
            userIndex.push(msg.sender);
        }
        userStructs[msg.sender].totalDeposited += userStructs[msg.sender].totalDeposited;
        userStructs[msg.sender].givePercent = _interest;
        userStructs[msg.sender].index = userIndex.length-1;

        emit Deposit(userStructs[msg.sender].totalDeposited, _interest);

        depositAave(msg.sender, msg.value);
    }

    // Check if a user exists
    function checkUserExistence(address _userAddress) public view returns(bool) {
        uint _index = userStructs[_userAddress].index;
        address _indexed_address = userIndex[_index];
        if (_userAddress == _indexed_address) {
            return true;
        } else {
            return false;
        }
    }

    // Take ETH and deposit it into the AAVE lending protocol
    function depositAave(address _spender, uint _amount) private {
        gateway.depositETH{value: _amount}(address(this), 0);
        userStructs[_spender].aTokenBalance += userStructs[_spender].aTokenBalance + _amount;
        lastATokenBalance = aWETH.balanceOf(address(this));
        emit DepositAave(userStructs[_spender].aTokenBalance);
    }

    // Scales up aToken balances for all users to account for accrued interest
    function scaleBalances() private {
        uint _aTokenBalance = aWETH.balanceOf(address(this));
        uint scalingFactor = (_aTokenBalance * 100)/lastATokenBalance;
        for (uint i=0; i < userIndex.length; i++) {
            userStructs[userIndex[0]].aTokenBalance = userStructs[userIndex[0]].aTokenBalance * (scalingFactor/100);
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
        lastATokenBalance = aWETH.balanceOf(address(this));
        emit Withdraw(msg.sender, _amount, _all);
    }

    // Remove a user from userIndex and reorder
    function deleteUser(address _user) private {
        uint index = userStructs[_user].index;
        address structToMove = userIndex[userIndex.length-1];
        userIndex[index] = structToMove;
        userStructs[structToMove].index = index;
        delete userIndex[userIndex.length-1];
    } 

    // Sends a percentage to the give address
    function give() private {
        scaleBalances();
        uint _giveAmount = 0;
        for (uint i; i < userIndex.length; i++) {
            uint _giveableGain = userStructs[userIndex[i]].aTokenBalance - userStructs[userIndex[i]].savedInterest - userStructs[userIndex[i]].totalDeposited;
            _giveAmount = _giveAmount + ((_giveableGain * userStructs[userIndex[i]].givePercent)/100);
            userStructs[userIndex[i]].savedInterest = userStructs[userIndex[i]].savedInterest + (_giveableGain - _giveAmount);
        }
        aWETH.transfer(giveAddress, _giveAmount);
        lastATokenBalance = aWETH.balanceOf(address(this));

        emit Give(_giveAmount);
    }

    // Adjust the user's give percentage
    function adjustGivingRate(uint _percentInterest) external {
        require(checkUserExistence(msg.sender), "You must be a depositor to adjust your give percentage.");
        userStructs[msg.sender].givePercent = _percentInterest;

        emit AdjustGivingRate(msg.sender, _percentInterest);
    }

    // Read a user balance from the contract
    function balanceOf(address _account) external view returns (uint) {
        return userStructs[_account].aTokenBalance;
    }

    // Update the give address
    function updateGiveAddress(address payable _giveAddress) public {
        require(msg.sender == admin, "You do not have permission to update the giving address.");
        giveAddress = _giveAddress;

        emit AddressUpdated(msg.sender, _giveAddress);
    }

    // Transfer admin privileges
    function updateAdmin(address _newAdmin) external {
        require(msg.sender == admin, "Only the current admin can elect a new admin.");
        admin = _newAdmin;

        emit AdminUpdated(msg.sender, admin);
    }

}

