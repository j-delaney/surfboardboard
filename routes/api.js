var Feedback = require('./../models/feedback');

module.exports = function (app) {
    app.post('/api/feedback', function (request, response, next) {
        if (!request.isAuthenticated()) {
            return response.status(401);
        }

        var feedback = Feedback({
            user: request.user.id,
            rating: request.body.rating || '',
            comment: request.body.comment || '',
            path: request.body.path || ''
        });

        feedback.save(function (err, feedback) {
            if (err) {
                throw err;
            }

            return response.status(200);
        });
    })
};