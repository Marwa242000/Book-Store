var bookName = document.getElementById("bName");
var bookPrice = document.getElementById("bPrice");
var bookCategory = document.getElementById("bCategory");
var bookDescription = document.getElementById("bDescription");
var addBook = document.getElementById("addBook");
var inputs = document.getElementsByClassName("form-control");
var bookLists = [];
var currentIndex = 0;

if (JSON.parse(localStorage.getItem("bookList")) != null) {
    bookLists = JSON.parse(localStorage.getItem("bookList"));
    display();
}

function validateInputs() {
    var regexName =/^[A-Z][a-zA-Z]*(\s[a-zA-Z0-9]*)*$/;
    var regexPrice = /^[1-9][0-9]{1,2}$/;
    var regexCategory = /^([A-Z][a-z]*\s)*[A-Za-z]*$/;
    var regexDescription = /^[A-Z][a-zA-Z'’]*(\s[a-zA-Z'’]+)*$/;
    var isNameValid = regexName.test(bookName.value);
    var isPriceValid = regexPrice.test(bookPrice.value);
    var isCategoryValid = regexCategory.test(bookCategory.value);
    var isDescriptionValid = regexDescription.test(bookDescription.value);

    return isNameValid && isPriceValid && isCategoryValid && isDescriptionValid;
}

addBook.onclick = function () {
    if (validateInputs()) {
        if (addBook.innerHTML == "Add Book") {
            add();
        } else {
            updatebook();
            addBook.innerHTML = "Add Book";
        }
        display();
        clear();
    } else {
        addBook.disabled = true;
    }
};

bookName.onkeyup = function () {
    var regexName =/^[A-Z][a-zA-Z]*(\s[a-zA-Z0-9]*)*$/;
    if (!regexName.test(bookName.value)) {
        addBook.disabled = true;
        bookName.classList.add("is-invalid");
        bookName.classList.remove("is-valid");
    } else {
        bookName.classList.add("is-valid");
        bookName.classList.remove("is-invalid");
        addBook.disabled = !validateInputs();
    }
};

bookPrice.onkeyup = function () {
    var regexPrice = /^[1-9][0-9]{1,2}$/;
    if (!regexPrice.test(bookPrice.value)) {
        addBook.disabled = true;
        bookPrice.classList.add("is-invalid");
        bookPrice.classList.remove("is-valid");
    } else {
        bookPrice.classList.add("is-valid");
        bookPrice.classList.remove("is-invalid");
        addBook.disabled = !validateInputs();
    }
};

bookCategory.onkeyup = function () {
    var regexCategory =/^([A-Z][a-z]*\s)*[A-Za-z]*$/;
    if (!regexCategory.test(bookCategory.value)) {
        addBook.disabled = true;
        bookCategory.classList.add("is-invalid");
        bookCategory.classList.remove("is-valid");
    } else {
        bookCategory.classList.add("is-valid");
        bookCategory.classList.remove("is-invalid");
        addBook.disabled = !validateInputs();
    }
};

bookDescription.onkeyup = function () {
    var regexDescription =/^[A-Z][a-zA-Z'’]*(\s[a-zA-Z'’]+)*$/;
    if (!regexDescription.test(bookDescription.value)) {
        addBook.disabled = true;
        bookDescription.classList.add("is-invalid");
        bookDescription.classList.remove("is-valid");
    } else {
        bookDescription.classList.add("is-valid");
        bookDescription.classList.remove("is-invalid");
        addBook.disabled = !validateInputs();
    }
};

function add() {
    var Book = {
        name: bookName.value,
        price: bookPrice.value,
        category: bookCategory.value,
        description: bookDescription.value,
    };
    bookLists.push(Book);
    localStorage.setItem("bookList", JSON.stringify(bookLists));
}

function display() {
    var trs = "";
    for (var i = 0; i < bookLists.length; ++i) {
        trs += `<tr>
        <td class="center">${i + 1}</td>
        <td class="center">${bookLists[i].name}</td>
        <td class="center">${bookLists[i].price}</td>
        <td class="center">${bookLists[i].category}</td>
        <td class="center">${bookLists[i].description}</td>
        <td class="center"><i onclick="getIndx(${i})" class="far fa-pen-to-square"></i></td>
        <td class="center"><i onclick="deletebook(${i})" class="fa-regular fa-trash-can"></i></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = trs;
}

function clear() {
    for (var i = 0; i < inputs.length; ++i) {
        inputs[i].value = "";
        inputs[i].classList.remove("is-valid", "is-invalid");
    }
}
function search(val) {
    var trs = "";

    for (var i = 0; i < bookLists.length; ++i) {
        if (bookLists[i].name.toLowerCase().includes(val.toLowerCase()))
            trs += `<tr>
        <td>${i + 1}</td>
        <td>${bookLists[i].name}</td>
        <td>${bookLists[i].price}</td>
        <td>${bookLists[i].category}</td>
        <td>${bookLists[i].description}</td>
        <td><i onclick="updatebook(${i})" class="far fa-pen-to-square"></i></td>
        <td><i onclick="deletebook(${i})" class="fa-regular fa-trash-can"></i></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = trs;
}
function deletebook(indx) {
    bookLists.splice(indx, 1);
    display();
    localStorage.setItem("bookList", JSON.stringify(bookLists));
}

function getIndx(index) {
    bookName.value = bookLists[index].name;
    bookPrice.value = bookLists[index].price;
    bookCategory.value = bookLists[index].category;
    bookDescription.value = bookLists[index].description;
    addBook.innerHTML = "Update Book";
    currentIndex = index;
}

function updatebook() {
    var Book = {
        name: bookName.value,
        price: bookPrice.value,
        category: bookCategory.value,
        description: bookDescription.value,
    };
    bookLists[currentIndex] = Book;
    localStorage.setItem("bookList", JSON.stringify(bookLists));
}
