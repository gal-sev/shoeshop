import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.URI;

// Create a MongoClient
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Reference to the db
const db = client.db("ShoesShop");

//TODO: check how much shoes are there and add to the stock instead of adding a new one
//TODO: check the shoe object to make sure its ok?
//TODO: remove the catches here and handle it in the server api file?
export async function createShoe(shoe) {
    try {
        await client.connect();
        const collection = db.collection("Shoes");
    
        const result = await collection.insertOne(shoe);
        return result;
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

export async function addMultipleShoes(shoes) {
    try {
        await client.connect();
        const collection = db.collection("Shoes");
    
        const result = await collection.insertMany(shoes);
        return result;
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

export async function getShoes(id) {
    try {
        await client.connect();
        const collection = db.collection("Shoes");

        // Get all shoes or one by id
        const cursor = collection.find(id != 'all' ? { _id: ObjectId.createFromHexString(id)} : {}); 
        const results = await cursor.toArray();

        return results;
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

export async function updateShoe(shoe) {
    try {
        await client.connect();
        const collection = db.collection("Shoes");
        // data to update:
        const shoeUpdates = {
            $set: {
                name: shoe.name,
                size: shoe.size,
                brand: shoe.brand,
                shoeType: shoe.shoeType,
                laces: shoe.laces,
                price: shoe.price,
                stock: shoe.stock,
                imgsrc: shoe.imgsrc,
                description: shoe.description

            },
        };
        const result = await collection.updateOne({ _id: ObjectId.createFromHexString(shoe._id)}, shoeUpdates);
        return result;
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

export async function deleteShoe(id) {
    try {
        await client.connect();
        const collection = db.collection("Shoes");
        const result = await collection.deleteOne({ _id: ObjectId.createFromHexString(id)});
        return result;
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

export async function getStocksByTypes() {
    try {
        await client.connect();
        const collection = db.collection("Shoes");
        const cursor = collection.aggregate([
            {
                $group: {
                    _id: "$shoeType", // Group by shoeType
                    totalStock: { $sum: "$stock"}, // Sum of total stock
                    shoes: { $push: "$name" } // Push into array all the names
                }
            },
            {
                // Sort by totalStock, decending
                $sort: { totalStock: -1 }
            },
            {
                // Format the result, 1 is include, 0 don't include
                $project: {
                    shoeType: "$_id", // Rename
                    _id: 0,
                    totalStock: 1,
                    shoes: 1
                }
            }
        ]);
        const results = await cursor.toArray();
        
        return results;
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}