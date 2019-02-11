pragma solidity ^0.4.2;

contract HelloWorld {

string public message;
    // Constructor
    constructor HelloWorld () public {
        message = "Hello World";
    }

    function setName (string _name) public {
      message = _name;
    }
}
