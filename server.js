const express = require('express')
const db = require('./services/db')
const cors = require('cors');
const e = require('express');
const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(cors({
    origin: '*'
}));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my CRUDE application."});
});

app.get("/books", (req, res) => {
    
    db.query('SELECT * FROM book', (err, rows, fields) => {
        if(err) res.status(500).send({ error: true, message: err.code});

        res.send(rows);
    })
})

app.get('/books/:id', (req, res) => {
    db.query('SELECT * FROM book WHERE name = ?', [req.params.id], (err, rows, fields) => {
        
        if(err){
            // console.log("error found")
            res.status(500).send({error: true, message: err.code})
        } 

        
        if(!rows.length){
            res.status(404).send({error: true, message: "Book name not found"});
        }
        else{
            res.send(rows);
        }


        
    });
})

app.post('/books', (req, res) => {
    let verify = req.body.name;
    if(!verify) {
        return res.status(400).send({ error:true, message: 'Please provide book'})
    }
    const newBook = {
        name : req.body.name,
        release_date : req.body.release_date
    };

    db.query('INSERT INTO book SET ? ', newBook , function(error, rows, fields) {
        if(error) throw error;
        return res.send("Insertion Complete");
    })
})

app.put('/books', function (req, res){
    let book_name = req.body.name;
    let uBook = req.body.release_date;

    if(!book_name || !uBook){
        return res.status(400).send({message: 'Please provide user'});
    }

    

    db.query("UPDATE book SET release_date = ? WHERE name = ?", [uBook, book_name], function (error, rows, fields){
        if(error) throw error;

        return res.send("Update Complete");
    })


} )

app.delete('/books/:id', function (req, res){
    let book_name = req.params.id;
    if(!book_name){
        return res.status(400).send({error: true, message: 'Please provide book_name'});
    }
   

    db.query("DELETE FROM book WHERE name = ?", [req.params.id], function(error, rows, fields) {
        if(error) throw error;

        return res.send("Deletion Completed");
    })
})
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port: ' + port + '...'));



module.exports = app;