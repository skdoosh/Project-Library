const myLibrary = [];

function Book(title, author, pages, haveRead){
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.id = crypto.randomUUID();
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    if(this.haveRead == true){
        this.word = '';
    }else {
        this.word = 'not';
    }
    this.info = function() {
        return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.word} read.`);
    };
}


function addBookToLibrary(Title, Author, Pages, HaveRead){
    myLibrary.push(new Book(Title, Author, Pages, HaveRead));
    renderLibrary();
}

addBookToLibrary("The Thin Executioner", "Darren Shan", 383, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("Brave New World", "Aldous Huxley", 311, false);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 277, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
addBookToLibrary("Fahrenheit 451", "Ray Bradbury", 194, false);
addBookToLibrary("The Name of the Wind", "Patrick Rothfuss", 662, false);
addBookToLibrary("Dune", "Frank Herbert", 412, false);
addBookToLibrary("The Road", "Cormac McCarthy", 287, false);
addBookToLibrary("The Book Thief", "Markus Zusak", 552, false);
addBookToLibrary("Life of Pi", "Yann Martel", 319, false);
addBookToLibrary("The Giver", "Lois Lowry", 240, false);

function renderLibrary(){
    const cardBox = document.querySelector('.card-container');
    cardBox.innerHTML = '';
    myLibrary.forEach((x) => {
        const card = document.createElement('div');
        card.className = "card";
        card.setAttribute("data-id", `${x.id}`)
        const title = document.createElement('h3');
        title.className = "title";
        const author = document.createElement('h4');
        author.className = "author";
        const readToggle = document.createElement('button');
        readToggle.className = "read-toggle";
        const pages = document.createElement('p');
        pages.textContent = `${x.pages} pages`;

        title.textContent = x.title;
        author.textContent = x.author;
        if (x.haveRead == false) {
            readToggle.textContent = "Have Not Read";
        }else {
            readToggle.textContent = "Have Read";
        }

        readToggle.addEventListener('click',(e)=>{
            const no = myLibrary.findIndex(obj => obj.id === e.target.parentElement.dataset.id);
            if(readToggle.textContent == "Have Not Read"){
                readToggle.textContent = "Have Read";
                myLibrary[no].haveRead = true;
            }else{
                readToggle.textContent = 'Have Not Read';
                myLibrary[no].haveRead = false;
            }
            console.log(myLibrary[no]);
            
        });

        const del = document.createElement('button');
        del.textContent = "Delete";
        del.addEventListener('click',(e)=>{
            const delId = e.target.parentElement.dataset.id;
            const index = myLibrary.findIndex(obj => obj.id === delId);
            if (index > -1) { // only splice array when item is found
                myLibrary.splice(index, 1); // 2nd parameter means remove one item only
            }
            console.log(myLibrary);
            e.target.parentElement.remove();
        })

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(readToggle);
        card.appendChild(del);

        const parent = document.querySelector('.card-container');

        parent.appendChild(card);

    })
}



const newBook = document.querySelector('.new-book');
const dialog = document.querySelector('#formDialog');

newBook.addEventListener('click',(e)=>{
    dialog.showModal();
})

const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', (e)=>{
    dialog.close();
});

const form = document.querySelector('.new-book-form');
form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const read = (formData.get('status')==='true');

    addBookToLibrary(title, author, pages, read);
    dialog.close();



})