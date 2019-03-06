interface IStorageEngine
{
    addItem(item: Product): void;
    getItem(index: number): Product;
    getCount(): number;
}

class Product
{    
    private name: string;
    private weigth: number;
    
    constructor(name: string, weigth:number)
	{
        this.name = name;
        this.weigth = weigth;
    }

    public getScale(): number
	{ 
        return this.weigth;
    }

    public getName(): string
	{
        return this.name;
    }
}

class ScalesStorageEngineArray implements IStorageEngine
{

    private atScale: Product[]

    constructor()
	{
        this.atScale = [];
    }

    addItem(item:Product): number
	{
        this.atScale.push(item);

        return this.atScale.length - 1;
    }

    getItem(index: number): Product
	{
        let product: Product = this.atScale[index];

        return product;
    }

	getCount(): number
	{
        return this.atScale.length;
    }
}

class ScalesStorageEngineLocalStorage implements IStorageEngine
{
	private atScale;
       
	constructor()
	{
		this.atScale = window.localStorage;
		this.atScale.setItem('storage', JSON.stringify([]));
	}

	addItem(item:Product): number
	{
		let storage = this.atScale.getItem('storage');
		storage = JSON.parse(storage);
		storage.push(item);
		
		this.atScale.setItem('storage', JSON.stringify(storage));

		return storage.length - 1;
	}

	getItem(index: number): Product
	{
		let storage = this.atScale.getItem('storage');
		storage = JSON.parse(storage);
		
		return new Product(storage[index].name, storage[index].weigth);
	}

	getCount(): number
	{
		let storage = this.atScale.getItem('storage');
		storage = JSON.parse(storage);

		return storage.length;
	}
}

class Scale<StorageEngine extends IStorageEngine>
{
    storage: StorageEngine;
    
	constructor(classRef: {new(): StorageEngine;})
	{
		this.storage = new classRef();	
	}

    add(item: Product)
	{
        this.storage.addItem(item);
    }

    getSumScale(): number
	{
        let length:number = this.storage.getCount();
        let total:number = 0;
        
        for (let i:number = 0; i < length; i++) {
			total += this.storage.getItem(i).getScale();
		}

        return total;
    }

    getNameList(): string[]
	{    
        let length:number = this.storage.getCount();
        let nameList:string[] = [];

        for (let i:number = 0; i < length; i++) {
            nameList.push(this.storage.getItem(i).getName());
		}

        return nameList;
    }

}

let arrStorage = new Scale(ScalesStorageEngineArray);
console.log(arrStorage);
arrStorage.add(new Product ('Apple', 500));
arrStorage.add(new Product ('Tomato', 600));
console.log('Sum = ' + arrStorage.getSumScale());
console.log('Lists = ' + arrStorage.getNameList());

let storageAtLocalStorage = new Scale(ScalesStorageEngineLocalStorage);
console.log(storageAtLocalStorage);
storageAtLocalStorage.add (new Product ('Apple', 1500));
storageAtLocalStorage.add (new Product ('Tomato', 1600));
console.log('Sum = ' + storageAtLocalStorage.getSumScale());
console.log('Lists = ' + storageAtLocalStorage.getNameList());