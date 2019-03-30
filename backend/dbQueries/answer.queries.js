module.exports = {

  queryNewAnswer:
      `INSERT INTO answers SET ?`,

  queryGetAnswer:
      `SELECT * 
         FROM answers 
        WHERE answer_id = ?`,

  queryUpdateAnswer:
      `UPDATE answers
          SET answer_content = ?
        WHERE answer_id = ?`,

  queryAcceptAnswer:
      `UPDATE answers
          SET accepted = ?
        WHERE answer_id = ?`,

  queryDeleteAnswer: 
      // implement me
      'route not created'
}