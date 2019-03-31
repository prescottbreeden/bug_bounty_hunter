const bug = require('./../controllers/bug.controller');

module.exports = app => {

  app
    .get('/api/bugs', bug.getAllBugs)
    .get('/api/bugs/:bug_id', bug.getBugById)
    .post('/api/bugs', bug.createBug)
    .put('/api/bugs/:bug_id', bug.updateBug)
    .delete('/api/bugs/:bug_id', bug.deleteBug)

}
