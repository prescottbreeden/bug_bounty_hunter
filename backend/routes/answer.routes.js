const answer = require('./../controllers/answer.controller');

module.exports = function(app) {

  app
    .get('/api/answers/:id', answer.getAnswer)
    .post('/api/answers', answer.addAnswer)
    .put('/api/answers/:answer_id', answer.updateAnswer)
    .patch('/api/answers/:answer_id', answer.acceptAnswer);

}
