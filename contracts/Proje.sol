pragma solidity >=0.4.22 <0.9.0;

contract Proje {
    uint data;

    function set(uint x) public{
        data = x;
    }

    function get() public view returns (uint){
        return data;
    }
}