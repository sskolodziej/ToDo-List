// Global variables
var $btnAdd, $ulListOfTasks, $myNodelist, $btnSpanClose, $popupEditContainer, $popupEditBtnClose, $popupEditBtnCancel, $popupEditBtnConfirm;

// Starting initial functions
function main() {
    prepareDOMElements();
    prepareDOMEvents();
    prepareInitialList();
}

// Search for elements in DOM tree
function prepareDOMElements() {
    $btnAdd = document.getElementById("btn-add");

    $ulListOfTasks = document.getElementById("ul-list-of-tasks");
    $myNodelist = document.getElementsByTagName("li");

    $btnSpanClose = document.getElementsByClassName("btn-span-close");

    $popupEditContainer = document.getElementById("popup-edit-container");
    $popupEditBtnClose = document.getElementById("popup-edit-btn-close");
    $popupEditBtnCancel = document.getElementById("popup-edit-btn-cancel");
    $popupEditInput = document.getElementById("popup-edit-input");
    $popupEditBtnConfirm = document.getElementById("popup-edit-btn-confirm");
}

// Prepare DOM listeners
function prepareDOMEvents() {
    $btnAdd.addEventListener("click", addButtonClickHandler);
    $ulListOfTasks.addEventListener("click", listClickManager);

    $popupEditBtnClose.addEventListener("click", closePopup);
    $popupEditBtnCancel.addEventListener("click", closePopup);
    $popupEditBtnConfirm.addEventListener("click", acceptChangeHandler);
}

// Automatically get the list from the server
async function prepareInitialList() {
    var response = await axios.get("http://195.181.210.249:3000/todo/");
    response.data.forEach(element => {
        addNewElementToList(element.title, element.id, element.author);
    })
}

// Obługa kliknięcia przycisku "Add"
function addButtonClickHandler() {
    var $inputMain = document.getElementById("input-main").value;
    var $liText = document.createTextNode($inputMain);
    var $author = "sk";

    addNewElementToList($inputMain);

    if ($inputMain === "") {
        alert("Enter a title of a task to do!");
    } else {
        addElementToServer($inputMain, $author);
    }
}

// Obsługa dodawanie elementów do listy
// $list.appendChild(createElement("nowy", 2))
function addNewElementToList(title, id, author /* Title, author, id */ ) {
    var $newElement = createElement(title, id, author);

    if (title === "") {} else {
        $ulListOfTasks.appendChild($newElement);
        addListBtns(id);
    }
    document.getElementById("input-main").value = "";

    //    removeElement(id);
}

// Tworzyc reprezentacje DOM elementu return newElement
function createElement(title, id /* Title, author, id */ ) {
    var $newLiElement = document.createElement("LI");
    $newLiElement.innerText = title;
    $newLiElement.id = id;

    return $newLiElement;
}

function addElementToServer(title, author) {
    axios.post("http://195.181.210.249:3000/todo/", {
            title: title,
            author: author,
        })
        .then(() => {
            refreshTheList();
        });
}

// Delete the content on a local list and get data from a server
function refreshTheList() {
    $ulListOfTasks.innerHTML = "";
    prepareInitialList();
}

// Rozstrzygnięcie co dokładnie zostało kliknięte i wywołanie odpowiedniej funkcji
// event.target.parentElement.id
// if(event.target.className === "btn-span-edit") { editListElement(id) }
function listClickManager(ev /* event- event.target */ ) {
    markElementAsDone(ev);
    removeElement(ev, ev.target.id);
    clickEditBtn(ev, ev.target.id);
}

// Click on a "btn-span-edit" button to hide the current list item
function clickEditBtn(ev, id) {
    if (ev.target.className === "btn-span-edit node-btns") {
        editListElement(id);
    }
    false;
}

// After clicking a "btn-span-close" button, remove a task element from the list
function removeElement(ev, id /* id */ ) {
    if (ev.target.className === "btn-span-close node-btns") {
        axios.delete("http://195.181.210.249:3000/todo/" + id)
            .then(() => {
                refreshTheList();
            });
    }
    false;
}

// Manage creating "btn-span-edit" and "btn-span-close" buttons
function addListBtns(id) {
    createEditBtn(id);
    createRemoveBtn(id);
}

// Create a "btn-span-edit" button and append it to each list item
function createEditBtn(id) {
    for (var i = 0; i < $myNodelist.length; i++) {
        if ($myNodelist[i].innerHTML.includes("btn-span-edit node-btns")) {} else {
            var $span = document.createElement("SPAN");
            var $txt = document.createTextNode("edit");
            $span.id = id;
            $span.className = "btn-span-edit node-btns";
            $span.appendChild($txt);
            $myNodelist[i].appendChild($span);
        }
    }
}

// Create a "btn-span-close" button and append it to each list item
function createRemoveBtn(id) {
    for (var i = 0; i < $myNodelist.length; i++) {
        if ($myNodelist[i].innerHTML.includes("btn-span-close node-btns")) {} else {
            var $span = document.createElement("SPAN");
            var $txt = document.createTextNode("\u00D7");
            $span.id = id;
            $span.className = "btn-span-close node-btns";
            $span.appendChild($txt);
            $myNodelist[i].appendChild($span);
        }
    }
}

// Pobranie informacji na temat zadania
// Umieść dane w popupie
function editListElement(id /* id */ ) {
    fetch("http://195.181.210.249:3000/todo/" + id, {
            method: "GET",
            body: JSON.stringify()
        })
        .then(res => res.json())
        .then(res => {
            res.forEach(element => {
                addDataToPopup(element.title, element.author, element.id);
            });
        })
        .catch(err => {
            alert("Error!!!")
        })
}

// Umieść informacje w odpowiednim miejscu w popupie
function addDataToPopup(title, author, id /* Title, author, id */ ) {
    $popupEditInput.value = title;
    $popupEditInput.author = author;
    $popupEditInput.id = id;

    openPopup();
}

// pobierz dane na temat zadania z popupu (id, nowyTitle, nowyColor ...)
// Następnie zmodyfikuj element listy wrzucając w niego nowyTitle, nowyColor...
function acceptChangeHandler() {
    var $inputEditTitle = this.parentElement.parentElement.childNodes[5].value;

    if ($inputEditTitle === "") {
        alert("Enter a title of a task to do!");
    } else {
        var $inputEditAuthor = this.parentElement.parentElement.childNodes[5].author;
        var $inputEditId = this.parentElement.parentElement.childNodes[5].id;

        editElementOnServer($inputEditTitle, $inputEditAuthor, $inputEditId);
        closePopup();
    }
}

function editElementOnServer(title, author, id) {
    axios.put("http://195.181.210.249:3000/todo/" + id, {
            title: title,
            author: author,
        })
        .then(() => {
            refreshTheList();
        });
}

function openPopup() {
    $popupEditContainer.style.display = "flex";
}

function closePopup() {
    $popupEditContainer.style.display = "none";
}

// Mark as done a task on list (CSS class changed)
function markElementAsDone(id /* id */ ) {
    if (id.target.tagName === "LI") {
        id.target.classList.toggle("li-checked");
    }
    false;
}

document.addEventListener("DOMContentLoaded", main);
