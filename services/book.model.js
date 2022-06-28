const sql = require('../services/db.js')

const Book = function(book) {
    this.name = book.name;
    this.release_date = book.release_date;
};

Book.create = (newBook, result) => {
    sql.query("INSERT INTO book SET ?", newBook, (err, res) => {
        if(err){
            console.log("error: " , err);
            result(err, null);
            return;
        }
        console.log("created book: ");
    })
}