import React, { Component } from 'react';
import InfoRestau from './InfoRestau';

class ContainerRestau extends Component {

        constructor(props) {
            super(props);
            this.state = { restaurants: [] };
        }
    
        componentDidMount() {
            fetch('/api/offer/')
                .then((response) => response.json())
                .then(data => this.setState({ restaurants: data }));
        }
    
        render() {
          
            let cards = [];
            this.state.restaurants.forEach((restaurant, index) => {
                cards.push(
                    <InfoRestau
                        restaurant={restaurant}
                        key={index} />
                );
            });
    
            return cards;
    
        }
    }

export default ContainerRestau;