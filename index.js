// вызываем проинсталлированную библиотеку express
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const middlewareFunction = express.json()
app.use(middlewareFunction);


let db = null

app.get('/books', async (req, res) => {
    let books = await client.db("library").collection("books").find({}).toArray();
    res.send(books);
})

app.get('/books/:id', async (req, res) => {
    const book = await client.db("library").collection("books").findOne({_id: new ObjectId(req.params.id)});
    res.send(book);
})
app.delete('/books/:id', async (req, res) => {
    await client.db("library").collection("books").deleteOne({_id: new ObjectId(req.params.id)});
    res.send(204);
})
app.post('/books', async (req, res) => {
    const newBook = {
        title: req.body.title,
        author: req.body.author
    }
    await client.db("library").collection("books").insertOne(newBook)
    res.send(newBook);
})


const { MongoClient, ObjectId } = require("mongodb");
// Connection URI
const uri =
    "mongodb+srv://dimych:dimych_@cluster0.ytoz6m8.mongodb.net/?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {

        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Establish and verify connection
        console.log("Connected successfully to server ");
        // после того, как мы подключимся к БД, стартанём наш api-сервер 


        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        })

}
run().catch(console.dir);



