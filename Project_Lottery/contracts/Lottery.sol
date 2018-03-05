pragma solidity ^0.4.17; 

contract Lottery {
    address public manager;
    address[] public players;
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    function enterLottery() public payable{
        require(msg.value > .001 ether); //if false, rest of function will not be executed
        players.push(msg.sender);
    }
    
    function getAllPlayers() public view returns (address[]){
        return players;
    }
    function pickRandomWinner() public view returns (uint){
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public restricted{
        uint index = pickRandomWinner() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0); //resets the players vaiable to an empty dynamic array
    }
    
    modifier restricted(){
        require(msg.sender == manager);
        _; // compiler puts the function body with the modified at the underscore
        
    }
}