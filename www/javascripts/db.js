
const user = new User(1,"Manuel Silva", "msilva",undefined); 
const storages = [new Storage(1,"Dispensa",
                         [new StorageItem(2,"Pão",3,3,null),
                          new StorageItem(1,"Leite",1,5,new Date("2024-05-23"))]),
                 new Storage(2,"Frigorifico",[new StorageItem(3,"Ovos",2,6,new Date("2024-06-01"))])];
const shoplists = [ new Shoplist(1,"Compras 16/05")];
