const answer = require('./../controllers/answer.controller');

module.exports = app => {

  app
    .get('/api/answers/:answer_id', answer.getAnswer)
    .post('/api/answers', answer.addAnswer)
    .put('/api/answers/:answer_id', answer.updateAnswer)
    .patch('/api/answers/:answer_id', answer.acceptAnswer);

};
