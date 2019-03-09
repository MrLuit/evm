pragma solidity 0.5.5;

contract Contract {
    function () external {
        selfdestruct(msg.sender);
    }
}