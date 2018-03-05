const request = require('request');
const fs = require('fs');
const similarity = require('similarity');

const apiSearch = 'https://m.lafourchette.com/api/restaurant/search?&offer=0&origin_code_list[]=THEFORKMANAGER&limit=400';
const apiRestaurant = 'https://m.lafourchette.com/api/restaurant/';

function get_sales(restaurant) {
    restaurant.sales = [];
    return new Promise((resolve, reject) => {
        if (restaurant.isOnLaF) {
            request(apiRestaurant + `${restaurant.id}/sale-type`, (err, resp, body) => {
                if (err) {
                    return reject(err);
                }
                restaurant.sales = JSON.parse(body).filter((deal) => {
                    return deal.is_special_offer === true;
                });
                return resolve(restaurant);
            });
        }
        else {
            return resolve(restaurant);
        }
    });
}

function search_restaurant_on_json(restaurant) {
    restaurant.isOnLaF = false;
    const matchPerc = 0.65;
    const options = {

        'uri': apiSearch + `&search_text=${encodeURIComponent(restaurant.name)}`,
        'json': true
    };
    return new Promise((resolve, reject) => {
        request(options, (err, resp, body) => {
            if (err) {
                return reject(err);
            }
            for (let i = 0; i < body.items.length; i++) {
                resultRestaurant = body.items[i];
                if (restaurant.postalcode === resultRestaurant.address.postal_code) {
                    if (similarity(restaurant.street, resultRestaurant.address.street_address) > matchPerc) {
                        restaurant.nameOnLaF = resultRestaurant.name;
                        restaurant.id = resultRestaurant.id;
                        restaurant.urlOnLaF = `https://www.lafourchette.com/restaurant/${encodeURIComponent(restaurant.laFName)}/${restaurant.id}`;
                        restaurant.geo = resultRestaurant.geo;
                        restaurant.phoneNumber = resultRestaurant.phone;
                        restaurant.isOnLaF = true;
                        restaurant.picture = resultRestaurant.images.main[6].url;
                        break;
                    }
                }
            }
            return resolve(restaurant);
        });
    });
}

function write_json_Bis(jsonResult) {
    return new Promise((resolve, reject) => {
        fs.writeFile('restaurants2.json', JSON.stringify(jsonResult), 'utf8', (err) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
}

function find_restaurant() {

   restaurants = JSON.parse(fs.readFileSync('./restaurants.json', 'utf-8')).restaurants;
    if (restaurants) {
        requests = restaurants.map((restaurant) => search_restaurant_on_json(restaurant));
        Promise.all(requests)
            .then(((result) => {
                write_json_Bis(result);
            }))
            .then(() => console.log("Restaurants has been updated! Check the directory for restaurants2.json!"))
            .catch((err) => console.log(err));
    }
    else {
        console.log('Please wait...');
    }
}

function get_all_restaurants() {
    if (!fs.existsSync('./restaurants2.json')) {
        console.log('Scrapping of La Fourchette is in progress ...');
        find_restaurant();
        return 0;
    }
    else {
        let content = fs.readFileSync('./restaurants2.json', 'utf-8');
        return JSON.parse(content);
    }
}

function get_all_offers(response) {
    restaurants = get_all_restaurants();
    requests = restaurants.map((restaurant) => get_sales(restaurant));
    Promise.all(requests)
        .then((res) => response.send(res))
        .catch((err) => console.log(err));
}

function get(restaurant, response) {
    content = get_all_restaurants();
    if (content) {
        let result = content.find((rest) => {
            return rest.name == restaurant.name;
        });
        get_sales(result)
            .then((res) => response.send(res))
            .catch((err) => console.log(err));
    }
}

exports.getAllRestaurants = get_all_restaurants;
exports.getAllOffers = get_all_offers;
exports.get = get;