// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract T1 is ERC20 {
    address public admin;
    constructor(uint initialSupply) ERC20("Token One","T1") {
        _mint(msg.sender,initialSupply);
        admin=msg.sender;
    }

    function mint(address to, uint amount) external {
        require(msg.sender == admin,"You don't have permission to ");
        _mint(to, amount);
    }
}