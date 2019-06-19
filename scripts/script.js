// Global variables
var $btnAdd, $ulListOfTasks, $btnSpanClose, $popupEditContainer, $popupEditBtnClose, $popupEditBtnCancel, $popupEditBtnConfirm;

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

// What happens after clicking the "Add" button
function addButtonClickHandler() {
    var $inputMain = document.getElementById("input-main").value;
    var $liText = document.createTextNode($inputMain);
    var $author = "sk";

    if ($inputMain === "") {
        alert("Enter a title of a task to do!");
    } else {
        addElementToServer($inputMain, $author);
    }
}

// $list.appendChild(createElement("new", 2))
function addNewElementToList(title, id, author /* Title, author, id */ ) {
    var $newElement = createElement(title, id, author);

    $ulListOfTasks.appendChild($newElement);

    // Create a "btn-span-edit" button and append it to each list item
    var $spanEdit = document.createElement("SPAN");
    var $txtEdit = document.createTextNode("edit");
    $spanEdit.id = id;
    $spanEdit.className = "btn-span-edit node-btns";
    $spanEdit.appendChild($txtEdit);
    $newElement.appendChild($spanEdit);

    // Create a "btn-span-close" button and append it to each list item
    var $spanRemove = document.createElement("SPAN");
    var $txtRemove = document.createTextNode("\u00D7");
    $spanRemove.id = id;
    $spanRemove.className = "btn-span-close node-btns";
    $spanRemove.appendChild($txtRemove);
    $newElement.appendChild($spanRemove);

    document.getElementById("input-main").value = "";
}

// Create a DOM representation of an element and return newElement
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

// Delete the whole content on a local list and get new data from a server
function refreshTheList() {
    $ulListOfTasks.innerHTML = "";
    prepareInitialList();
}

// Decide what was clicked and call a proper function
// event.target.parentElement.id
// if(event.target.className === "btn-span-edit") { editListElement(id) }
function listClickManager(ev /* event- event.target */ ) {
    markElementAsDone(ev);
    removeElement(ev, ev.target.id);
    clickEditBtn(ev, ev.target.id);
}

// Click a "btn-span-edit" button to hide the current list item
function clickEditBtn(ev, id) {
    if (ev.target.className === "btn-span-edit node-btns") {
        editListElement(id);
    }
}

// After clicking a "btn-span-close" button, remove a task element from the list
function removeElement(ev, id /* id */ ) {
    if (ev.target.className === "btn-span-close node-btns") {
        axios.delete("http://195.181.210.249:3000/todo/" + id)
            .then(() => {
                refreshTheList();
            });
    }
}

// Get information about a task 
// Place the data in a popup
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

// Put information in a correct place in a popup
function addDataToPopup(title, author, id /* Title, author, id */ ) {
    $popupEditInput.value = title;
    $popupEditInput.author = author;
    $popupEditInput.id = id;

    openPopup();
}

// Get data of a task from a popup (id, newTitle, newColour, etc...)
// Then, modify an element of a list by giving it the data (newTitle, newColour, etc...)
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
}

document.addEventListener("DOMContentLoaded", main);
