let form = document.querySelector(".book-class");
let tbody = document.querySelector(".tbody");

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
class UI {
  static addBook(book) {
    let tbody = document.querySelector(".tbody");
    let tr = document.createElement("tr");
    tr.innerHTML = `<th>${book.title}</th><th>${book.author}</th><th>${book.isbn}</th><th><a href='#'>X</a></th>`;
    tbody.appendChild(tr);
  }
  static clearinput() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
  static showAlert(message, className) {
    let div = document.createElement("div");
    div.setAttribute("class", className);
    div.appendChild(document.createTextNode(message));
    let container = document.querySelector(".container");
    container.insertBefore(div, form);
    setTimeout(() => {
      container.removeChild(div);
    }, 3000);
  }
  static Delete(e) {
    if (e.target.hasAttribute("href")) {
      let s = e.target.parentElement;
      let m = s.parentElement;
      m.remove();
    }
  }
  static addLocal(e) {
    let task;
    if (localStorage.getItem("task") == null) {
      task = [];
    } else {
      task = JSON.parse(localStorage.getItem("task"));
    }
    task.push(e);
    localStorage.setItem("task", JSON.stringify(task));
  }
  static DeleteLocal(e) {
    let task;
    if (localStorage.getItem("task") == null) {
      task = [];
    } else {
      task = JSON.parse(localStorage.getItem("task"));
    }
    task.forEach((tasks, index) => {
      if (tasks.isbn === e) {
        task.splice(index, 1);
      }
    });
    localStorage.setItem("task", JSON.stringify(task));
  }
  static Display() {
    let task;
    if (localStorage.getItem("task") == null) {
      task = [];
    } else {
      task = JSON.parse(localStorage.getItem("task"));
    }
    task.forEach((task) => {
      UI.addBook(task);
    });
  }
}

form.addEventListener("submit", newBook);
tbody.addEventListener("click", RemoveOne);
document.addEventListener("DOMContentLoaded", display);
function newBook(e) {
  e.preventDefault();
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let isbn = document.querySelector("#isbn").value;

  if (title == "" || author == "" || isbn == "") {
    UI.showAlert("Please Fill All the Field", "error");
  } else {
    let book = new Book(title, author, isbn);

    UI.addBook(book);
    UI.addLocal(book);
    UI.clearinput();
    UI.showAlert("Book Added", "success");
  }
}
function RemoveOne(e) {
  e.preventDefault();

  UI.Delete(e);
  UI.DeleteLocal(
    e.target.parentElement.previousElementSibling.textContent.trim()
  );

  if (e.target.hasAttribute("href")) {
    UI.showAlert("Book Removed", "error");
  }
}
function display() {
  UI.Display();
}
