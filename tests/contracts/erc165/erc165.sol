pragma solidity 0.5.5;

contract Contract {
    function supportsInterface(bytes4 interfaceID) external pure returns (bool) {
        return (interfaceID == 0xffffffff);
    }
}