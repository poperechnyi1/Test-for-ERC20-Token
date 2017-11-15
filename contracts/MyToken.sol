pragma solidity ^0.4.15;

contract ERC20 {
     function totalSupply() constant returns (uint totalSupply);
      function balanceOf(address _owner) constant returns (uint balance);
      function transfer(address _to, uint _value) returns (bool success);
      function transferFrom(address _from, address _to, uint _value) returns (bool success);
      function approve(address _spender, uint _value) returns (bool success);
      function allowance(address _owner, address _spender) constant returns (uint remaining);
      event Transfer(address indexed _from, address indexed _to, uint _value);
    event Approval(address indexed _owner, address indexed _spender, uint _value);
 }

contract MyToken is ERC20 {
    string public constant name = "My First Token";
    string public symbol = "MFT";
    uint public constant decimals = 8;
    uint total = 1000000;
    address public owner;
    
    mapping (address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;
    
    function MyToken(){
        owner = msg.sender;
        balances[owner] = total;
    }
    
    
    function totalSupply() constant returns (uint totalSupply){
        totalSupply = total;
    }
    
    function balanceOf(address _owner) constant returns (uint256 balance) {
        return balances[_owner];
    }
    
    function transfer(address _to, uint _value) returns (bool success){
        if(balances[msg.sender]>= _value && balances[_to]+_value >= balances[_to] && _value >0){
             balances[msg.sender] -= _value;
            balances[_to] += _value;
        Transfer(msg.sender, _to, _value);
        return true;
        }
        return false;
       
    }
    
    function transferFrom(address _from, address _to, uint _value) returns(bool success){
        if(balances[_from]>= _value && balances[_to]+_value >= balances[_to] && _value >0){
            balances[_from]-=_value;
            balances[_to]+= _value;
            Transfer(msg.sender, _to, _value);
            return true;
        }
        return false;
    }
    
    function approve(address _spender, uint _value) returns (bool success){
        allowed [msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }
    
    function allowance(address _owner, address _spender) constant returns (uint remaining){
        return allowed[_owner][_spender];
    }
    
}