class StorageItem {
    constructor(id,prodName,prodId, quant,date) {
        this.id = id;
        this.prodName = prodName;
        this.prodId = prodId;
        this.quantity = quant;
        this.date = date;
    }
}


class Storage {
    constructor (id,name,items) {
        this.id = id;
        this.name = name;
        this.items = items;
    }
}