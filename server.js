const express = require("express");
const app = express();

app.use(express.json());

let books = [
    {
        id: 1,
        bookName: "Harry potter",
        bookAuthor: "JK Rowling",
        category: "Novel"
    }
];

// READ
app.get("/books", (req, res) => {
    res.json(books);
});

// CREATE
app.post("/books", (req, res) => {

    const { id, bookName, bookAuthor, category } = req.body;

    const newBook = {
        id,
        bookName,
        bookAuthor,
        category
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book Added",
        book: newBook
    });
});

// UPDATE
app.put("/books/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book Not Found"
        });
    }

    book.bookName = req.body.bookName;
    book.bookAuthor = req.body.bookAuthor;
    book.category = req.body.category;

    res.json({
        message: "Book Updated",
        book
    });
});

// DELETE
app.delete("/books/:id", (req, res) => {

    const id = parseInt(req.params.id);

    books = books.filter(book => book.id !== id);

    res.json({
        message: "Book Deleted"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});