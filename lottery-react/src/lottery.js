import  web3 from './web3';

const address = '0xDe2C4451583F2C6c1B75dB4622195405fA9A48Af';

const abi = [
	{
		"constant":true,
		"inputs":[],
		"name":"manager",
		"outputs":[{"name":"","type":"address"}],
		"payable":false,
		"stateMutability":"view",
		"type":"function"
	},
	{
		"constant":false,
		"inputs":[],
		"name":"pickWinner",
		"outputs":[],
		"payable":false,
		"stateMutability":"nonpayable",
		"type":"function"
	},
	{
		"constant":true,
		"inputs":[],
		"name":"pickRandomWinner",
		"outputs":[{"name":"","type":"uint256"}],
		"payable":false,
		"stateMutability":"view",
		"type":"function"
	},
	{
		"constant":false,
		"inputs": [],
		"name":"enterLottery",
		"outputs":[],
		"payable":true,
		"stateMutability":"payable",
		"type":"function"
	},
	{
		"constant":true,
		"inputs":[],
		"name":"getAllPlayers",
		"outputs":[{"name":"","type":"address[]"}],
		"payable":false,
		"stateMutability":"view",
		"type":"function"
	},
	{
		"constant":true,
		"inputs":[{"name":"","type":"uint256"}],
		"name":"players",
		"outputs":[{"name":"","type":"address"}],
		"payable":false,
		"stateMutability":"view",
		"type":"function"
	},
	{
		"inputs":[],
		"payable":false,
		"stateMutability":"nonpayable",
		"type":"constructor"}];

export default new web3.eth.Contract(abi, address); //exports a complete copy of our contract that we can work with from the React side of our code base