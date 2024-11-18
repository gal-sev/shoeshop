import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createShoe, getShoes, updateShoe, deleteShoe, getStocksByTypes, addMultipleShoes } from './controllers/mongoHandler.js';
import { baseShoes } from "./models/baseShoes.js";
const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const port = process.env.PORT || 8080;

const start = async () => {
    try {
        app.listen(port, () =>
        console.log(`Server is listening on port ${port}`)
        );

        app.post('/create', async (req, res) => {
            const bd = await req.body;
            const newShoe = {
                name : bd.name,
                size : bd.size,
                brand : bd.brand,
                shoeType : bd.shoeType,
                laces : bd.laces,
                price : bd.price,
                stock : bd.stock,
                imgsrc : bd.imgsrc,
                description : bd.description
            }
            await createShoe(newShoe);
            res.status(200).send("created new shoe");
        });

        app.get('/getshoes/:_id', async (req, res) => {
            let shoes = await getShoes(req.params._id);
            res.status(200).send(shoes);
        });
        
        app.put('/update', async (req, res) => {
            const bd = await req.body;
            const newShoe = {
                _id : bd._id,
                name : bd.name,
                size : bd.size,
                brand : bd.brand,
                shoeType : bd.shoeType,
                laces : bd.laces,
                price : bd.price,
                stock : bd.stock,
                imgsrc : bd.imgsrc,
                description : bd.description
            }
            await updateShoe(newShoe);
            res.status(200).send("updated shoe " + bd._id);
        });
        
        app.post('/delete', async (req, res) => {
            const id = await req.body._id;
            await deleteShoe(id);
            res.status(200).send("deleted shoe " + id);
        });

        app.get('/getStocks', async (req, res) => {
            let stocks = await getStocksByTypes();
            res.status(200).send(stocks);
        });

        // Add all the base shoes from the array (dont really need it just makes it easier)
        app.post('/addBaseShoes', async (req, res) => {
            await addMultipleShoes(baseShoes);
            res.status(200).send("Added base shoes to db");
        });

    } catch (error) {
        console.log(error);
    }
};

start();