// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import '@uniswap/v2-periphery/contracts/UniswapV2Router02.sol';


contract TDex {
  string public name = "TDex";
  address internal constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D; // on mainnet. You can change to testnet address
  IUniswapV2Router02 public uniswapRouter;

  constructor() public payable {
    uniswapRouter = IUniswapV2Router02(UNISWAP_V2_ROUTER);
  }

  function swapEthForToken(uint ethAmount, ERC20 token) external payable {
    uint deadline = block.timestamp + 150;
    address[] memory path = getEthForUSDCPath(token.address);
    uint amountOutMin = uniswapRouter.getAmountsOut(ethAmount, path)[1];
    uniswapRouter.swapExactETHForTokens{value: msg.value}(amountOutMin, path, msg.sender, deadline);
  }

  function swapTokenForEth(uint tokenAmount, ERC20 token) external payable {
    uint deadline = block.timestamp + 150;
    address[] memory path = getUSDCForEthPath(token.address);
    uint amountOutMin = uniswapRouter.getAmountsOut(tokenAmount, path)[1];
    token.transferFrom(msg.sender, address(this), tokenAmount);
    token.approve(UNISWAP_V2_ROUTER, tokenAmount);
    uniswapRouter.swapExactTokensForETH(tokenAmount, amountOutMin, path, msg.sender, deadline);
  }

  function getEthForTokenPath(address token) private view returns (address[] memory) {
    address[] memory path = new address[](2);
    path[0] = uniswapRouter.WETH();
    path[1] = token;

    return path;
  }

  function getTokenForEthPath(address token) private view returns (address[] memory) {
    address[] memory path = new address[](2);
    path[0] = token;
    path[1] = uniswapRouter.WETH();

    return path;
  }
}