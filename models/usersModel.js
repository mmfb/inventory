const bcrypt = require('bcrypt');
const pool = require("../config/database");
const saltRounds = require("../config/settings.json").auth.saltRounds; 

class User {
    constructor(id, name, fullName, pass) {
        this.id = id;
        this.name = name;
        this.pass = pass;
        this.fullName = fullName;
    }

    // Gets everything except password (pass only used for login)
    static fromDBtoUser(dbUser)  {
        let user = new User();
        user.id = dbUser.u_id;
        user.name = dbUser.u_name;
        user.fullName = dbUser.u_full_name;
        return user;
    }

    
    static async getAll() {
        try {
            let [dbUsers] = await pool.query("Select * from user");
            let users = dbUsers.map(User.fromDBtoUser);
            return { status: 200, result: users} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }  
    }

}
module.exports = User;