var Product = /** @class */ (function () {
    function Product(name, weigth) {
        this.name = name;
        this.weigth = weigth;
    }
    Product.prototype.getScale = function () {
        return this.weigth;
    };
    Product.prototype.getName = function () {
        return this.name;
    };
    return Product;
}());
var ScalesStorageEngineArray = /** @class */ (function () {
    function ScalesStorageEngineArray() {
        this.atScale = [];
    }
    ScalesStorageEngineArray.prototype.addItem = function (item) {
        this.atScale.push(item);
        return this.atScale.length - 1;
    };
    ScalesStorageEngineArray.prototype.getItem = function (index) {
        var product = this.atScale[index];
        return product;
    };
    ScalesStorageEngineArray.prototype.getCount = function () {
        return this.atScale.length;
    };
    return ScalesStorageEngineArray;
}());
var ScalesStorageEngineLocalStorage = /** @class */ (function () {
    function ScalesStorageEngineLocalStorage() {
        this.atScale = window.localStorage;
        this.atScale.setItem('storage', JSON.stringify([]));
    }
    ScalesStorageEngineLocalStorage.prototype.addItem = function (item) {
        var storage = this.atScale.getItem('storage');
        storage = JSON.parse(storage);
        storage.push(item);
        this.atScale.setItem('storage', JSON.stringify(storage));
        return storage.length - 1;
    };
    ScalesStorageEngineLocalStorage.prototype.getItem = function (index) {
        var storage = this.atScale.getItem('storage');
        storage = JSON.parse(storage);
        return new Product(storage[index].name, storage[index].weigth);
    };
    ScalesStorageEngineLocalStorage.prototype.getCount = function () {
        var storage = this.atScale.getItem('storage');
        storage = JSON.parse(storage);
        return storage.length;
    };
    return ScalesStorageEngineLocalStorage;
}());
var Scale = /** @class */ (function () {
    function Scale(classRef) {
        this.storage = new classRef();
    }
    Scale.prototype.add = function (item) {
        this.storage.addItem(item);
    };
    Scale.prototype.getSumScale = function () {
        var length = this.storage.getCount();
        var total = 0;
        for (var i = 0; i < length; i++) {
            total += this.storage.getItem(i).getScale();
        }
        return total;
    };
    Scale.prototype.getNameList = function () {
        var length = this.storage.getCount();
        var nameList = [];
        for (var i = 0; i < length; i++) {
            nameList.push(this.storage.getItem(i).getName());
        }
        return nameList;
    };
    return Scale;
}());
var arrStorage = new Scale(ScalesStorageEngineArray);
console.log(arrStorage);
arrStorage.add(new Product('Apple', 500));
arrStorage.add(new Product('Tomato', 600));
console.log('Sum = ' + arrStorage.getSumScale());
console.log('Lists = ' + arrStorage.getNameList());
var storageAtLocalStorage = new Scale(ScalesStorageEngineLocalStorage);
console.log(storageAtLocalStorage);
storageAtLocalStorage.add(new Product('Apple', 1500));
storageAtLocalStorage.add(new Product('Tomato', 1600));
console.log('Sum = ' + storageAtLocalStorage.getSumScale());
console.log('Lists = ' + storageAtLocalStorage.getNameList());
