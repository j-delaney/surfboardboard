var data = require('./../data.json');

var Item = require('../models/item');

module.exports = function (app) {
    app.post('/api/create/tent', function (request, response, next) {
        if (!request.user) {
            return response.sendStatus(401);
        }

        var error;

        var item = Item({
            picture: '/img/upload/items/sundome1.jpg',
            price: request.body.price,
            description: request.body.description,
            city: request.body.city,
            zip: request.body.zip,
            title: request.body.title,
            custom: {
                people: request.body.people
            },
            owner: request.user.id,
            type: 'tent'
        });

        error = item.baseValidate();
        if (error) {
            return response.status(400).json({
                error: error
            });
        }

        error = item.tentValidate();
        if (error) {
            return response.status(400).json({
                error: error
            });
        }

        item.save(function (err, item) {
            if (err) {
                console.error(err);
                return response.status(500).json({
                    error: err
                });
            }

            return response.status(200).json({
                id: item.id
            });
        });

        //data.tents.push({
        //    "id": newId,
        //    "owner": 0,
        //    "title": request.body.title,
        //    "pictures": [
        //        "/img/upload/items/sundome1.jpg"
        //    ],
        //    "people": request.body.holds,
        //    "price": request.body.price,
        //    "brand": "Coleman",
        //    "reviews": {
        //        "count": 1,
        //        "stars": 5
        //    },
        //    "location": request.body.address,
        //    "description": request.body.desc
        //});
    });
};