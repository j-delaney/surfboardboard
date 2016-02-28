var data = require('./../data.json');

module.exports = function (app) {
    app.post('/api/list', function (request, response, next) {
        var newId = data.tents.length;
        data.tents.push({
            "id": newId,
            "owner": 0,
            "title": request.body.title,
            "pictures": [
                "/img/upload/items/sundome1.jpg"
            ],
            "people": request.body.holds,
            "price": request.body.price,
            "brand": "Coleman",
            "reviews": {
                "count": 1,
                "stars": 5
            },
            "location": request.body.address,
            "description": request.body.desc
        });

        response.json({
            id: newId
        });
    });
};