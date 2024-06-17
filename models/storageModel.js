const pool = require("../config/database");

class Storage {
    constructor (id,name) {
        this.id = id;
        this.name = name;
    }
    static fromDBtoStorage(dbStorage)  {
        let s = new Storage();
        s.id = dbStorage.s_id;
        s.name = dbStorage.s_name;
        return s;
    }
    

    static async getByUserId(id) {
        try {
            let [dbStorages] = await pool.query("Select * from storage where s_u_id=?", [id]);
            let storages = dbStorages.map(Storage.fromDBtoStorage);
            return { status: 200, result: storages} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
}

module.exports = Storage;