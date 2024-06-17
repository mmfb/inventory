
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
    fillStorages() {
        const container = document.getElementById(this.storagesId);
        for(let storage of this.storages) {
            let li = document.createElement("li");
            li.textContent = storage.name;
            li.onclick = ()=> { this.openStorage(storage.id);}
            container.appendChild(li);
        }
    }
    createHeader() {
        const container = document.getElementById("userInfo");
        let h1 = document.createElement("h1");
        container.appendChild(h1);
        h1.textContent = `Welcome ${this.user.fullName}`;
    }
    openStorage(id) {
        localStorage.setItem("storageId",id);
        window.location.href = "storage.html";
    }
}