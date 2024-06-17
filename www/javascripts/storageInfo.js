class StorageInfo {
    constructor(itemsId) {
        this.itemsId = itemsId;
        this.storage = null;
    }
    async populate(storageId){
        for(let storage of storages) 
            if (storage.id == storageId)
                this.storage = storage;  
    }
    fillItems() {
        let container = document.getElementById(this.itemsId);
        for (let item of this.storage.items) {
            let li = document.createElement("li");
            container.appendChild(li);
            li.textContent = `${item.prodName} - quantity: ${item.quantity} (${item.date?item.date:"NA"})`;
        }
    }
}