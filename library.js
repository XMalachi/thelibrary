// this code create the container for all objects in the web page
// const make the container to unchangeable.
// document.querySelector chooses a selector in the html called container.

const container = document.querySelector('.container');

// This code is for the buttons  that popsup the form and resets the library
// The same button that popsup the form adds the book to the library.
// document.getElemetsById is useed to select an id element, which in this case is "form" and "resetBooks"
// the addBook and resetCards are the fuunction that tells the javascript to add the books and reset tthe cards
// the submit and click are the events that will ttrigger the functions. So the computer will wait for a submit to addbook
//   and it will wait for a click on resetBooks to reset the library 
// and the functions are wrritten below (check below)
document.getElementById('form').addEventListener('submit', addBook);
document.getElementById('resetBooks').addEventListener('click', resetCards);

// this code adds an event listener called click and performs a function called changeBook that is written below
container.addEventListener("click", changeBook);

// myLibrrary is set to an empty arrray[] so that nothing will show up  at first.
let myLibrary = [];

// This is a function to receive book information from the user 
function getBookFromInput(book) {
  // this will get the book's title value
  let title = document.getElementById('formTitle').value;
  // this will get the book's author value
  let author = document.getElementById('formAuthor').value;

  let pages = document.getElementById('formPages').value;

  let isRead = document.querySelector('input[name="formRead"]:checked').value;
  return new Book(title, author, pages, isRead);
}

// this is the function tthat addds the book to tthe librrary
function addBook(book) {
  let newBook = getBookFromInput(book);
  addBookToLibrary(newBook);
  displayBooks()
  closeForm();
  book.preventDefault();
  document.getElementById("form").reset();
}

// this is the function that resets the cards
function resetCards() {
  while(container.firstChild) {
    container.removeChild(container.lastChild);
  }
  // this makes it all empty by seetting it back to an empty array[]
  myLibrary = [];
}

// this is tthe buttton thatt removes a book
function changeBook(e) {
  if (e.target.classList.contains("removeButton")) {
    let index = e.target.getAttribute('data-index');
    let cardToRemove = document.querySelector(`[data-index="${index}"]`);
    container.removeChild(cardToRemove);
    myLibrary.splice(index,1);
  }
  else if (e.target.classList.contains("readStatusBtn")) {
    let index = e.target.getAttribute('data-index');
    let cardToChange = document.querySelector(`[data-index="${index}"]`);
    let readStatus = cardToChange.querySelector('.isReadStatus');
    if (readStatus.innerHTML === "Read") {
      readStatus.innerHTML = "Not Read";
      myLibrary[index].isRead = "Not Read";
    } else {
      readStatus.innerHTML = "Read";
      myLibrary[index].isRead = "Read";

    }

  }
}

class Book {
    constructor(
      title = "Unknown",
      author = "Unknown",
      pages = "0",
      isRead = "Not Read",
    ) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.isRead = isRead;
    }
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

function displayBooks() {
    makeCard(myLibrary[myLibrary.length -1]);
}

// tthis is javascript code that creates the card.
function makeCard(bookToAdd)
{
    let card = document.createElement('div');
    let title = document.createElement('h4');
    let author = document.createElement('h5');
    let pages = document.createElement('p');
    let isRead = document.createElement('p');
    let readStatusBtn = document.createElement('BUTTON');
    let removeButton = document.createElement('BUTTON');
    
    isRead.className = 'isReadStatus';
    readStatusBtn.className = 'readStatusBtn';
    readStatusBtn.innerText = 'Change Read Status';
    readStatusBtn.setAttribute("data-index", myLibrary.indexOf(bookToAdd));
    removeButton.className = 'removeButton';
    removeButton.innerText = 'Remove Book';
    removeButton.setAttribute("data-index", myLibrary.indexOf(bookToAdd));
    card.classList.add('card');

    title.textContent = bookToAdd.title;
    author.textContent = bookToAdd.author;
    pages.textContent = `${bookToAdd.pages} pages`;
    isRead.textContent = bookToAdd.isRead;

    card.append(title);
    card.append(author);
    card.append(pages);
    card.append(isRead);
    card.append(removeButton);
    card.append(readStatusBtn);
    card.setAttribute("data-index", myLibrary.indexOf(bookToAdd));
    container.append(card);
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

