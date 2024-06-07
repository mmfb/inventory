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

    // This will not be used for authentication so no password needed
    static async getById(id) {
        try {
            let [dbUsers] = await pool.query("Select * from user where u_id=?", [id]);
            if (!dbUsers.length) 
                return { status: 404, result:{msg: "No user found for that id."} } ;
            let user = User.fromDBtoUser(dbUsers[0]);
            return { status: 200, result: user} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }  
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

    async register() {
        if (!this.name || !this.pass) {
            return { status: 400, result: { msg: "Please insert a valid name and password" } };
        }
        try {
            let [dbUsers] =
                await pool.query("Select * from user where u_name=?", [this.name]);
            if (dbUsers.length)
                return { status: 400, result: { msg: "That name already exists" } };
            let encpass = await bcrypt.hash(this.pass,saltRounds);   
            let dbResult = await pool.query(`Insert into user (u_name, u_pass, u_full_name)
                       values (?,?,?)`, [this.name, encpass,this.fullName]);
            return { status: 200, result: {msg:"Registered! You can now log in."}} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    
    async login() {
        try {
            let [dbUsers] =
                await pool.query("Select * from user where u_name=?", [this.name]);
            if (!dbUsers.length)
                return { status: 401, result: { msg: "Wrong username or password!"}};
            let dbUser = dbUsers[0]; 
            let isPass = await bcrypt.compare(this.pass,dbUser.u_pass);
            if (!isPass) 
                return { status: 401, result: { msg: "Wrong username or password!"}};
            return { status: 200, result: User.fromDBtoUser(dbUser) } ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }


}
module.exports = User;