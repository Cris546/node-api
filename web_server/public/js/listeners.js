





const mid = document.querySelector(".center");
const url = 'http://localhost:8080/books/';
async function getInfo() {
    const field = document.getElementById("bookName");

    const response = await fetch(url + field.value)
    .then(res => {
        return res.json();
    })
    .then(data => {
        displayBooks(data);
    })
    .catch(error => console.error(error));

    
    
}

async function postBook(){
    const bookName = document.getElementById("bookName");
    console.log(bookName.value);
    const bookRelease = document.getElementById("bookRelease");
    console.log(bookRelease.value);

    let newBook = {
        name : bookName.value,
        release_date: bookRelease.value
    }

    if(!verifyBook(newBook)) {
        console.log("invalid book");
        return;
    }
    else{
        console.log("running POST")
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(newBook),
            headers: { 'Content-Type': 'application/json'}
        }).then(res => {
            console.log(res.text);
            return res.text;
        }).then(data => {
            console.log(data);
        })
        .catch(error => console.error(error));
    }

    

}

async function removeBook(){
    const bookName = document.getElementById("bookName");
    console.log(bookName.value);
    // const bookRelease = document.getElementById("bookRelease");
    // console.log(bookRelease.value);

    fetch(url + bookName.value, {
        method: 'DELETE'
    }).catch(error => console.error(error));
}

async function updateBook(){
    const bookName = document.getElementById("bookName");
    console.log(bookName.value);
    const bookRelease = document.getElementById("bookRelease");
    console.log(bookRelease.value);

    let uBook = {
        name: bookName.value,
        release_date: bookRelease.value
    }

    if(!verifyBook(uBook)){
        return;
    }
    else{
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(uBook),
            headers: { 'Content-Type': 'application/json'}
        }).catch(error => console.error(error));
    }


    
}

function displayBooks(data){
    clearCanvas();
    const bookDiv = document.getElementById("book");
    if(Object.keys(data).length == 0){
        console.log("reached");
        const body = document.createElement("p");
        body.innerHTML = "Sorry, couldn't find book";
        bookDiv.appendChild(body);
    }
    else{
        console.log("full");
        for(let index in data){
            let bookP = data[index];
            
            const heading = document.createElement("h1");
            const body = document.createElement("p");
            const bookN = bookP.name;
            const bookR = bookP.release_date;
            heading.innerHTML = bookN;
            body.innerHTML = bookR;
            bookDiv.appendChild(heading);
            bookDiv.appendChild(body);
        }
    }
}

function verifyBook(newBook){
    console.log("verifying...")
    const dateCheck = new Date(newBook.release_date);
    console.log(dateCheck)
    return typeof newBook.name == 'string' && dateCheck >= 0
}

function clearCanvas(){
    const bookDiv = document.getElementById("book");
    bookDiv.innerHTML = "";
}