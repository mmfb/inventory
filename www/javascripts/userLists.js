window.onload = async function() {
    var info = new UserListsInfo("storages","shoplists");
    window.info = info;
    await info.populate();
    await info.fillStorages();
}