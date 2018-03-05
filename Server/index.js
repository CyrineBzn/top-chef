const laFourchette = require('./LaFourchette');
const express = require('express');
const path = require('path');

const restaurants = laFourchette.getAllRestaurants();

const app = express();

// handle / routes

app.get('/api', (req, res) => {
    res.send('/api/restaurant for getting restaurant data <br /> /api/offer/id for getting the  promotions for each restaurant');
});

app.get('/api/restaurant', (req, res) => {
    let onLaF = req.query.isOnLaF;
    let size = req.query.size;

    if (size == 1) {
        res.send({ 'size': restaurants.length });
    }
    else {
        if (onLaF == 1) {
            let refRestaurants = [];
            restaurants.find((restaurant) => {
                if (restaurant.isOnLaF) {
                    refRestaurants.push(restaurant);
                }
            });
            res.send(refRestaurants);
        }
        else {
            res.send(restaurants);
        }
    }
});

app.get('/api/restaurant/:id', (req, res) => {
    res.send(restaurants[req.params.id]);
});


app.get('/api/offer/:id', (req, res) => {
    laFourchette.get(restaurants[req.params.id], res);
});

app.get('/api/offer', (req, res) => {
    laFourchette.getAllOffers(res);
});

// Creating server on the port 3001 

if (restaurants) {
    app.listen(3001, () => {
        console.log('You can check http://localhost:3001 for the server');
    });
}