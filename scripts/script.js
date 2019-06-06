// Zmienne globalne

//const initialList = ['Dzisiaj robię usuwanie', 'Nakarm psa'];

function main() {
    //odpalenie funkcji początkowych
}

function prepareDOMElements() {
    //przygotowanie- wyszukanie elementów w drzewie DOM
}

function prepareDOMEvents() {
    //przygotowanie listenerów
}

function prepareInitialList() {
    //wrzucenie poczatkowych elementów do listy
}

function addButtonClickHandler() {
    //obługa kliknięcia przycisku dodaj
}

function addNewElementToList( /* Title, author, id */ ) {
    //obsługa dodawanie elementów do listy
    // $list.appendChild(createElement('nowy', 2))
}

function createElement( /* Title, author, id */ ) {
    // Tworzyc reprezentacje DOM elementu return newElement
}

function listClickManager( /* event- event.target */ ) {
    // Rozstrzygnięcie co dokładnie zostało kliknięte i wywołanie odpowiedniej funkcji
    // event.target.parentElement.id
    // if(event.target.className === 'edit') { editListElement(id) }
}

function removeListElement( /* id */ ) {
    // Usuwanie elementu z listy
}

function editListElement( /* id */ ) {
    // Pobranie informacji na temat zadania
    // Umieść dane w popupie
}

function addDataToPopup( /* Title, author, id */ ) {
    // umieść informacje w odpowiednim miejscu w popupie
}

function acceptChangeHandler() {
    // pobierz dane na temat zadania z popupu (id, nowyTitle, nowyColor ...)
    // Następnie zmodyfikuj element listy wrzucając w niego nowyTitle, nowyColor...
    // closePopup()
}

function openPopup() {
    // Otwórz popup
}

function closePopup() {
    // Zamknij popup
}

function declineChanges() { //niepotrzebna raczej
    // closePopup()
}

function markElementAsDone( /* id */ ) {
    //zaznacz element jako wykonany (podmień klasę CSS)
}

document.addEventListener('DOMContentLoaded', main);
