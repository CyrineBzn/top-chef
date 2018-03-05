import React, { Component } from 'react';
import './App.css';
import Jumbotron from './components/Jumbotron';
import ContainerRestau from './components/ContainerRestau';


class App extends Component {

  render() {
    return (
      <div className="App">
         <center><div className="App-head">
           <Jumbotron />  
         </div>  </center>
        <div className="app-body">
           <ContainerRestau /> 
       </div> 
      </div>
    );
  }
}
export default App;