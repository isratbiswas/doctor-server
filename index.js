const express = require('express')
const app = express();
const cors = require('cors')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mr8bp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('uptown_drive_moto');
        const productCollection = database.collection('products')
        const userCollection = database.collection('users')
        const reviewCollection = database.collection('review')
        // const orderCollection = database.collection('order')
        //    products
        app.post('/addProducts', async (req, res) => {
            const result = await productCollection.insertOne(req.body)
            res.send(result);
        })
        // user details
        app.post('/conformOrder', async (req, res) => {
            const result = await userCollection.insertOne(req.body);
            res.send(result);

        })

        // order 
        app.get('/myOrders/:email', async (req, res) => {
            const result = await userCollection.find({ email: req.params.email }).toArray()
            // console.log(result)
            res.send(result)
        })

        //  user review
        app.post('/review', async (req, res) => {
            const result = await reviewCollection.insertOne(req.body);
            res.send(result)
        })

        //  user review get
        app.get('/review', async (req, res) => {
            const result = await reviewCollection.find({}).toArray()
            res.send(result)
            console.log(result)
        })
        app.get('/services', async (req, res) => {
            const result = await productCollection.find({}).toArray();
            res.send(result)


        })

        // app.get('/singleProduct/:id', async (req, res) => {
        //     const result = await productCollection.findOne({ _id: ObjectId(req.params.id) }).toArray();
        //     res.send(result[0]);
        // })
    }
    finally {
        // await client.close()
    }

}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send("database connect to server")
    console.log('database connect to server');
})
app.listen(port, (req, res) => {
    console.log("runing to server", port);
})




// DB_USER=bikedrivedb
// DB_PASS=4TfI7U1G8OiR7ujy