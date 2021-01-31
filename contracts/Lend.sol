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

    }

    //function to receive ETH and record the balance for the address
    //in the balances mapping, and record the percentage of interest going to giveth
    function deposit(uint _interest) external payable {
        balances[msg.sender] += msg.value;
        giving_rates[msg.sender] = _interest; // what if payload for percent_interest is empty?
        deposit_aave(msg.sender, msg.value);
    }

    //function to take ETH and deposit it into the AAVE lending protocol
    function deposit_aave(address _spender, uint _amount) internal {
        require(balances[_spender] >= _amount, "Balance not sufficient for transaction.");
        total_deposited += _amount;
        gateway.depositETH{value: balances[_spender]}(address(this), 0);
        track_liquidity(_spender);
        //aWETH.approve(address(pool), _amount); 
        //pool.deposit(address(aWETH), _amount, address(this), 0);
        balances[_spender] = balances[_spender] - _amount;
    }

    //function to track interest for depositors, using the liquidity index
    function track_liquidity(address _spender) internal {
        uint256 scaled_balance = aTWETH.scaledBalanceOf(address(this));
        //These divisions will not work as return number will not be uint,
        //but floating point, need another way around this
        uint256 liquidity_index = total_deposited/scaled_balance;
        if (liquidity_indices[_spender] == 0) {
            liquidity_indices[_spender] = liquidity_index;
        } else {
            //work out weighted liquidity index and store
        }
    }

    //function to work out what the depositor wants to withdraw
    //and withdraw ETH to the their address
    function withdraw(address _beneficiary, uint _amount, bool _all) external {
        require(balances[_beneficiary] >= _amount, "Trying to withdraw more than amount in account.");
        if (_all == true) {
            gateway.withdrawETH(uint(-1), _beneficiary);
        } else if (_all == false) {
            gateway.withdrawETH(_amount, _beneficiary);
        }
    }

    //function work out the interest earned by each depositor for giving
    //at any point in time
    function interest_earned() internal {

    }

    //function to send a percentage to giveth
    function give() internal {

    }

    //function to adjust give percentage
    function adjust_giving_rate(uint _percent_interest) external {
        giving_rates[msg.sender] = _percent_interest;
    }

    //function to read a user balance from the contract
    function balanceOf(address _account) external view returns (uint) {
        return balances[_account];
    }

}

