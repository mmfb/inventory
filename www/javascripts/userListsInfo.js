
const user = new User(1,"Manuel Silva", "msilva",undefined); 
const storages = [new Storage(1,"Dispensa"),
                 new Storage(2,"Frigorifico")];
const shoplists = [ new Shoplist(1,"Compras 16/05")];

class UserListsInfo {
    constructor(storagesId,shoplistsId) {
        this.storagesId = storagesId;
        this.shoplistsId = shoplistsId;
        this.storages = [];
        this.shoplists = [];
        this.user = user;
    }
    async populate() {
        this.storages = storages;
        this.shoplists = shoplists;      
    } 
    async fillStorages() {
        const container = document.getElementById(this.storagesId);
        for(let storage of this.storages) {
            let li = document.createElement("li");
            li.textContent = storage.name;
            container.appendChild(li);
        }
    }

}