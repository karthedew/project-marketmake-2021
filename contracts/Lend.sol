//"SPDX-License-Identifier: UNLICENSED"

pragma solidity ^0.7.3;

import "./AAVE/ILendingPool.sol";
import "./AAVE/IERC20.sol";

contract Lend {

    address depositor;
    uint amount;
    mapping(address => uint) internal balances;
    mapping(address => uint) internal giving_rates;
    mapping(address => uint) internal pool_percentage;

    // Lending pool and IERC20 addresses are for mainnet AAVE pool and LINK. For koven use:
    // Lending pool: 0x9FE532197ad76c5a68961439604C037EB79681F0
    // Link: 0xa36085F69e2889c224210F603D836748e7dC0088
    // aLink: 
    ILendingPool pool = ILendingPool(0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9);
    IERC20 link = IERC20(0xa36085F69e2889c224210F603D836748e7dC0088);
    IERC20 alink = IERC20(0xa06bC25B5805d5F8d82847D191Cb4Af5A3e873E0);

    constructor() {

    }

    // function to receive LINK and record the balance for the address in the balances mapping, and record the percentage of interest going to giveth
    function deposit(uint _amount, uint percent_interest) external payable {
        balances[msg.sender] += _amount;
        giving_rates[msg.sender] = percent_interest; // what if payload for percent_interest is empty?
        deposit_aave(msg.sender, _amount);

    }

    //function to take LINK and deposit it into the AAVE lending protocol
    function deposit_aave(address _spender, uint _amount) internal {
        require(balances[_spender] >= _amount, "Balance not sufficient for transaction.");
        link.approve(address(pool), _amount);
        pool.deposit(address(link), _amount, address(this), 0);
        
    }

    //function to work out what the depositor wants to withdraw and withdraw LINK to the their address
    function withdraw(address _beneficiary, uint _amount) external {

    }

    //function to send a percentage to giveth
    function give() internal {

    }

    //function to adjust give percentage
    function adjust_giving_rate(uint _percent_interest) external {
        giving_rates[msg.sender] = _percent_interest;
    }
}

