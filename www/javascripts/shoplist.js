class ShoplistItem {
    constructor(id,prodName,prodId, qNeeded,qBought) {
        this.id = id;
        this.prodName = prodName;
        this.prodId = prodId;
        this.qNeeded = qNeeded;
        this.qBought = qBought;
    }
}

class Shoplist {
    constructor (id,name,items) {
        this.id = id;
        this.name = name;
        this.items = items;
    }
}