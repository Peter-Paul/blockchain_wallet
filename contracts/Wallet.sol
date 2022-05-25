// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Wallet {
    address public creator; // creator of the wallet
    // Address of the user => Address of token => Balance from token 
    mapping( address => mapping( address => uint256)) walletAccounts;

    constructor(){
        creator = msg.sender;
    }

    function balanceInToken(ERC20 token, address owner) public view returns(uint256){
        return token.balanceOf(owner);
    }

    function depositToken( ERC20 token) external payable{
        uint256 amount = msg.value;
        address account = msg.sender;
        // require that theres enough tokens in the wallet to be swapped for eth
        require(token.balanceOf(address(this)) >= amount, "Not enough tokens to swap");
        walletAccounts[account][address(token)]=token.balanceOf(account);
        token.transfer(account, amount);
    }

    function withdrawToken ( ERC20 token, uint256 amount) public {
        address account = msg.sender;
        // require that the account has enough tokens to be withdrawn
        require(token.balanceOf(account) >= amount, "Not enough tokens to swap");
        // transfer account tokens to this wallet
        token.transferFrom(account, address(this), amount);
        // add edit account in wallet storage
        walletAccounts[account][address(token)]=token.balanceOf(account);
        payable(account).transfer(amount);
    }

    function tokenAddress( ERC20 token ) public pure returns(address){
        return address(token);
    }

    function balanceForToken( ERC20 token ) public view returns(uint256){
        return walletAccounts[msg.sender][address(token)];
    }

}