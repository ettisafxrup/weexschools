export default function delStorage(index: any, ...args: any) {
  console.log(args);
  args.forEach((storageName) => {
    const getstorage = localStorage.getItem(storageName);
    let modifyStorage;
    if (getstorage === null) {
      modifyStorage = [];
    } else {
      modifyStorage = JSON.parse(getstorage);
    }
    modifyStorage.splice(index, 1);
    localStorage.setItem(storageName, JSON.stringify(modifyStorage));
  });
}
