import React, { Component } from 'react';
import './InfoRestau.css';


class InfoRestau extends Component {
  
        render() {

            
           const name = this.props.restaurant.name;
           const chef = this.props.restaurant.chef; 
           const address = this.props.restaurant.address;
            let image = this.props.restaurant.picture;
            const michelinUrl = this.props.restaurant.url;
            const laFUrl = this.props.restaurant.urlOnLaF;
            const sales = this.props.restaurant.sales;
            const phoneNumber=this.props.restaurant.phoneNumber;
          
    
            let salesList = [];
            if (sales !==[]) {
                sales.forEach((deal, index) => {
                    if (deal.is_special_offer) {
                        salesList.push(<li className="list-group-item bg-success" key={index}>{deal.title}</li>)
                        
                    }
                   
                });
            }

            if (!image) {
                image = 'http://via.placeholder.com/700x400';
            }
    
            return (
                
              <center> <div className="col-sm-10 col-md-8">
                    <div className="card mb-4 box-shadow">
                    <center />  <div className="card-header">
                            <h3 className="card-title">{name} </h3> <br/>
                            <h6 className="card-chef"> {chef}</h6>  
                        </div>
                        <img className="card-img-top img-fluid" src={image} alt={name} />
                        <div className="card-body">
                            <h6 className="infos">Address: </h6>
                            <p1 className="card-address">{address}</p1><br/>
                            <h6 className="infos"> Phone Number: </h6>
                            <p2 className="card-number">{phoneNumber}</p2><br/>
                            <a href={michelinUrl} className="card-link">Michelin's card</a>
                            <a href={laFUrl} className="card-link">laFourchette's card</a> <br/> 
                        </div>
                        <h5 className="card-promo">Promotions: </h5>
                        <ul className="list-group list-group-flush">{salesList}</ul>
                    </div>
              </div></center>
              
            )
        }
    }
    
    export default InfoRestau;