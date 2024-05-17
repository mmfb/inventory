window.onload = async function() {
    let info = new StorageInfo("items");
    let storageId = localStorage.getItem("storageId");
    window.info = info;
    await info.populate(storageId);
    info.fillItems();
}