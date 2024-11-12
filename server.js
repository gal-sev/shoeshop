import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { createShoe, getShoes, updateShoe, deleteShoe } from './controllers/mongoHandler.js';

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

    app.get('/', (req, res) => {
        const filePath = path.resolve('public', 'index.html');
        res.sendFile(filePath);
    });

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
            imgsrc : bd.imgsrc
        }
        await createShoe(newShoe);
        res.status(200).send("created new shoe");
        //TODO: ADD TRY CATCH TO STUFF HERE
    });

    app.get('/getshoes', async (req, res) => {
        let shoes = await getShoes();
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
            imgsrc : bd.imgsrc
        }
        await updateShoe(newShoe);
        res.status(200).send("updated shoe " + bd._id);
    });
    
    app.post('/delete', async (req, res) => {
        const id = await req.body._id;
        await deleteShoe(id);
        res.status(200).send("deleted shoe " + id);
    });

  } catch (error) {
    console.log(error);
  }
};

start();