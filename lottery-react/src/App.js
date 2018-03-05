import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
   state = {
    manager: '',
    players: [],
    balance: '', //initialized as a string because balance is returned as an object
    value: '',
    message: '',
    manager_message: ''
   };

   async componentDidMount() {
      const manager = await lottery.methods.manager().call();
      //from does not need to be specified because Metamask is giving a default account
      const players = await lottery.methods.getAllPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);

       this.setState({manager,players,balance});


    }


    //using arrow function automatically sets the context of this to the current component
    onSubmit = async (event) => {
      event.preventDefault();

      const accounts = await web3.eth.getAccounts();

      this.setState({message: 'Waiting on transaction success...'});

      await lottery.methods.enterLottery().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value,'ether')
      });

      this.setState({message: 'You have been entered in the Lottery!'})

      const players = await lottery.methods.getAllPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);

       this.setState({players,balance});
    };


    onClick = async (event) => {
      const accounts = await web3.eth.getAccounts();

      this.setState({manager_message:'Waiting on transaction success...'})

      await lottery.methods.pickWinner().send({
        from: accounts[0]
      })

      this.setState({manager_message: 'A winner has been selected!'})
    };




  render() {

    // web3.eth.getAccounts()
    //   .then(console.log);

    // console.log(web3.version);

    return (
      <div>
        <h2>Lottery Contract</h2>
          <p>This contract is managed by {this.state.manager}</p>
          <p>There are currently {this.state.players.length} people competing to win {web3.utils.fromWei(this.state.balance,'ether')} ether!</p>
          <hr></hr>
          <form onSubmit = {this.onSubmit}>
            <h4>Try your luck!</h4>
            <div>
                <label>Amount of ether to enter</label>
                <input
                  value = {this.state.value}
                  onChange={event => this.setState({value: event.target.value })}/>      
            </div>
            <button>Enter</button>
          </form>
          <hr></hr>
          <h2>{this.state.message}</h2>
          <hr></hr>
          <h4>Ready to pick a winner?</h4>
            <button onClick = {this.onClick}>Pick a winner!</button>
          <h2>{this.state.manager_message}</h2>
      </div>
    );
  }
}

export default App;
