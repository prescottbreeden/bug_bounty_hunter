
module.exports = {

  validateEmailString: `SELECT * FROM users WHERE email = ?`,
  login: `
       SELECT user_id,
              faction_name,
              first_name,
              last_name,
              email,
              password, 
              admin,
              profile_img,
              konami_unlock,
              user_created,
              user_updated
         FROM users AS u
         JOIN factions AS f
           ON f.faction_id = u.faction_id
        WHERE email = ?`,
}

function validateEmail(res, data) {

}

function login(res, data) {

}