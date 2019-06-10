// Global variables
var $inputMain, $btnAdd, $ulListOfTasks, $myNodelist, $liText, $newListElement, $btnSpanEdit, $btnSpanClose, $popupEditContainer, $popupEditBtnClose, $popupEditBtnCancel, $popupEditBtnConfirm, $popupEditInput, $liTextContent;

//const initialList = ["Dzisiaj robię usuwanie", "Nakarm psa"];

// Starting initial functions
function main() {
    prepareDOMElements();
    prepareDOMEvents();
    addListBtns();

    //    prepareInitialList();
}

// Search for elements in DOM tree
function prepareDOMElements() {
    $inputMain = document.getElementById("inputMain");
    $btnAdd = document.getElementById("btnAdd");

    $ulListOfTasks = document.getElementById("ulListOfTasks");
    $myNodelist = document.getElementsByTagName("li");
    $btnSpanEdit = document.getElementsByClassName("btnSpanEdit");
    $btnSpanClose = document.getElementsByClassName("btnSpanClose");

    $popupEditContainer = document.getElementById("popupEditContainer");
    $popupEditBtnClose = document.getElementById("popupEditBtnClose");
    $popupEditInput = document.getElementById("popupEditInput");
    $popupEditBtnCancel = document.getElementById("popupEditBtnCancel");
    $popupEditBtnConfirm = document.getElementById("popupEditBtnConfirm");
}

// Prepare DOM listeners
function prepareDOMEvents() {
    $inputMain.addEventListener("keydown", addWithEnter);
    $btnAdd.addEventListener("click", addButtonClickHandler);

    $ulListOfTasks.addEventListener("click", listClickManager);

    $popupEditBtnClose.addEventListener("click", closePopup);
    $popupEditBtnCancel.addEventListener("click", closePopup);

    //    $popupEditBtnConfirm.addEventListener("click", acceptChangeHandler(openPopup));
    //    $popupEditInput.addEventListener("keydown", editWithEnter);
}

function addWithEnter(enter) {
    if (enter.keyCode == 13) {
        addButtonClickHandler();
    }
}

// Obługa kliknięcia przycisku "Add"
function addButtonClickHandler() {
    createElement();
}

// Tworzyc reprezentacje DOM elementu return newElement
function createElement(e /* Title, author, id */ ) {
    $newListElement = document.createElement("LI");
    // z jakiegoś powodu nie mogłam zmiennej $inputMain przygotować w prepareDOMElements(), gdyż wyskakiwał błąd
    $inputMain = document.getElementById("inputMain").value;
    $liText = document.createTextNode($inputMain);

    addNewElementToList();
}

// Obsługa dodawanie elementów do listy
// $list.appendChild(createElement("nowy", 2))
function addNewElementToList( /* Title, author, id */ ) {
    $newListElement.appendChild($liText);

    ifTextValueEmpty();
    addListBtns();
}

function ifTextValueEmpty() {
    if ($inputMain === "") {
        alert("Enter a title of a task to do!");
    } else {
        $ulListOfTasks.appendChild($newListElement);
    }
    document.getElementById("inputMain").value = "";
}

// Rozstrzygnięcie co dokładnie zostało kliknięte i wywołanie odpowiedniej funkcji
// event.target.parentElement.id
// if(event.target.className === "btnSpanEdit") { editListElement(id) }
function listClickManager(e /* event- event.target */ ) {
    markElementAsDone(event);
    clickEditBtn();
    removeListElement();
}

// Mark as done a task on list (CSS class changed)
function markElementAsDone(event /* id */ ) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checkedTask");
    }
    false;
}

// Create a "btnSpanEdit" button and append it to each list item
function createEditBtn() {
    for (var i = 0; i < $myNodelist.length; i++) {
        if ($myNodelist[i].innerHTML.includes("btnSpanEdit nodeBtns")) {} else {
            var $span = document.createElement("SPAN");
            var $txt = document.createTextNode("edit");
            $span.className = "btnSpanEdit nodeBtns";
            $span.appendChild($txt);
            $myNodelist[i].appendChild($span);
        }
    }
}

// Create a "btnSpanClose" button and append it to each list item
function createRemoveBtn() {
    for (var i = 0; i < $myNodelist.length; i++) {
        if ($myNodelist[i].innerHTML.includes("btnSpanClose nodeBtns")) {} else {
            var $span = document.createElement("SPAN");
            var $txt = document.createTextNode("\u00D7");
            $span.className = "btnSpanClose nodeBtns";
            $span.appendChild($txt);
            $myNodelist[i].appendChild($span);
        }
    }
}

// Manage creating "btnSpanEdit" and "btnSpanClose" buttons
function addListBtns() {
    createEditBtn();
    createRemoveBtn();
}

// After clicking a "btnSpanClose" button, remove a task element from the list
function removeListElement( /* id */ ) {
    var $btnSpanClose = document.getElementsByClassName("btnSpanClose");
    for (var i = 0; i < $btnSpanClose.length; i++) {
        $btnSpanClose[i].onclick = function () {
            var $parentElement = this.parentElement;
            $parentElement.style.display = "none";
        }
    }
}

// Click on a "btnSpanEdit" button to hide the current list item
function clickEditBtn() {
    openPopup();
}

function openPopup() {
    for (var i = 0; i < $btnSpanEdit.length; i++) {
        $btnSpanEdit[i].onclick = function () {
            $liTextContent = this.parentElement.textContent;

            editListElement($liTextContent);

            $popupEditContainer.style.display = "flex";

            popupEditInputSelect();

            //            debugger;

            // mam problem z użycia zewnętrznie funkcji dla przycisku "confirm"
            // tu powinna być funkcja acceptChangeHandler() ale tam "this" jest buttonem i musze się zastanowić jak mieć dostęp do właściwego elementu listy
            if ($popupEditBtnConfirm.onclick = () => {
                    // funkcja ifTextValueEmpty2 do poprawy gdyż nie działa poprawnie
                    ifTextValueEmpty2();
                    this.parentElement.textContent = $popupEditInput.value;

                    closePopup();
                    addListBtns();
                });
            else {}
        }
    }
}

// Text in popup is automatically selected
function popupEditInputSelect() {
    $popupEditInput.focus();
    $popupEditInput.select();
}

// Pobranie informacji na temat zadania
// Umieść dane w popupie
function editListElement(dataToEdit /* id */ ) {
    var $fullLiValue = dataToEdit;
    var $getLiValue = $fullLiValue.replace(/edit×/g, "");

    addDataToPopup($getLiValue);
}

// Umieść informacje w odpowiednim miejscu w popupie
function addDataToPopup(dataToAdd /* Title, author, id */ ) {
    $popupEditInput.value = dataToAdd;
}

function closePopup() {
    $popupEditContainer.style.display = "none";
}






// Funkcja prepareInitialList() do późniejszego zrobienia
//
//function prepareInitialList() {
//    //wrzucenie poczatkowych elementów do listy
//}




// ===========================================================

// PONIŻEJ FUNKCJE DO POPRAWY! proszę o komentarz

// Funkcja ifTextValueEmpty2 do poprawy gdyż nie działa poprawnie
function ifTextValueEmpty2() {
    if ($popupEditInput.value === "") {
        alert("Enter a title of a task to do!");
    } else {}
}




// mam problem z użycia zewnętrznie funkcji dla przycisku "confirm"
// dla funkcji acceptChangeHandler() potrzebuję mieć dostęp do właściwego elementu listy ale w niej "this" jest buttonem i muszę się zastanowić jak to rozwiązać
//
//function acceptChangeHandler($liTextContent) {
//    // pobierz dane na temat zadania z popupu (id, nowyTitle, nowyColor ...)
//    // Następnie zmodyfikuj element listy wrzucając w niego nowyTitle, nowyColor...
//    // closePopup()
//
//    debugger;
//
//    ifTextValueEmpty2();
//    //    this.parentElement.textContent = $popupEditInput.value;
//    this.parentElement.textContent = $popupEditInput.value;
//    closePopup();
//    addListBtns();
//
//}





// Zaakceptowanie zmian w popupie za pomocą entera - do zrobienia, bo nie działa poprawnie
//
//function editWithEnter(enter) {
//    if (enter.keyCode == 13) {
//        this.parentElement.textContent = $popupEditInput.value;
//        closePopup();
//        addListBtns();
//    }
//}

document.addEventListener("DOMContentLoaded", main);
