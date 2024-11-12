
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();

const uri = process.env.URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function read() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db("ShoesShop");
    const collection = db.collection("Shoes");

    const cursor = collection.find({}); 
    const results = await cursor.toArray();

    console.log(results);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
