import React, { Component } from 'react';
import './Jumbotron.css';

class jumbotron extends Component {

    render() {
        return (
            <div>
                <div className="jumbotron">
                     <h1 className="Welcome">Welcome to Top-Chef </h1>      
                     <p className="Description">Top-Chef gives you the opportunity to eat well and cheap. Thanks to the list of the starred restaurants of Michelin in France <br />
                     and the promotions proposed by La Fourchette, we give you the best deals to find. </p>
                     <p2 className="Copyright">&#169; Cyrine Bouzayene</p2>
                </div>

                <div className="container">
                     <p className="title">Enjoy your meal and Save your money !</p>         
                </div>
            </div>
        )
    }
}

export default jumbotron;