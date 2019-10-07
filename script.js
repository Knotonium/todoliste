// Array einrichten, das die ToDo-Listenelemente enthaelt
let todoNotizen = [];
// Jedes ToDo wird ein Objekt mit drei Eigenschaften sein
// 1. Text: User-Eingaben
// 2. Ueberpruefung: Wurde die Aufgabe als erledigt markiert oder nicht
// 3. ID: Eine eindeutige Kennung für das ToDo-Element
function todoHinzufuegen(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };
    // Sobald der Benutzer eine Aufgabe hinzufügt, schieben wir ein neues 
    // ToDo-Objekt in das Array und rendern den Text auf dem Bildschirm. 
    // Wenn der Benutzer einen Todo beendet, indem er ihn deaktiviert, 
    // schalten wir die Eigenschaft checked auf true um, und wenn der Benutzer einen Todo löscht,
    // suchen wir den Todo-Eintrag im Array anhand seiner ID und entfernen ihn.
    // Beginnen wir mit dem Hinzufuegen eines ToDo-Eintrags zu unserer Liste. 
    // Um dies zu tun, muessen wir auf das submit-Ereignis auf .js-Formular warten 
    // und dann eine neue todoHinzufuegen()-Funktion aufrufen, wenn das Formular gesendet wird.
    todoNotizen.push(todo);

    const liste = document.querySelector('.js-todo-liste');
    // https://www.w3schools.com/jsref/met_node_insertadjacenthtml.asp'
    // insertAdjacentHTML fügt Text an der Position beforeend (=als letztes Child-Element) ein. 
    // Das zweite Argument ist der String, der eingefügt werden soll.
    liste.insertAdjacentHTML('beforeend', `
    <li class="todo-notiz" data-key="${todo.id}">
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="haken js-haken"></label>
      <span>${todo.text}</span>
      <button class="todo-loeschen js-todo-loeschen">
        <svg><use href="#loeschen-knopf"></use></svg>
      </button>
    </li>
  `);
}

function umschaltenAufErledigt(key) {
    const index = todoNotizen.findIndex(item => item.id === Number(key));
    todoNotizen[index].checked = !todoNotizen[index].checked;

    const item = document.querySelector(`[data-key='${key}']`);
    if (todoNotizen[index].checked) {
        // Die Benutzung von classList ist eine angenehme Alternative zum
        // Ansprechen der Klassen eines Elements
        // als die leerzeichengetrennte Zeichenfolge via element.className.
        // https://developer.mozilla.org/de/docs/Web/API/Element/classList
        item.classList.add('erledigt');
    } else {
        item.classList.remove('erledigt');
    }
}

function loescheTodoNotiz(key) {
    todoNotizen = todoNotizen.filter(item => item.id !== Number(key));
    const item = document.querySelector(`[data-key='${key}']`);
    item.remove();
}

const formular = document.querySelector('.js-formular');
formular.addEventListener('submit', event => {
    // Wenn ein Formular gesendet wird, will der Browser die Seite zu aktualisieren.
    // Da wir das weder wollen noch moechten,
    // stoppen wir das Standardverhalten mit Hilfe von 
    event.preventDefault();
    //
    const input = document.querySelector('.js-todo-input');
    // Als naechstes waehlen wir die Texteingabe aus und trimmen ihren Wert,
    // um Leerzeichen am Anfang und Ende der Zeichenkette zu entfernen 
    // und speichern sie in einer neuen const namens text.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
    const text = input.value.trim();
    // Wenn text einen leeren String hat, uebergeben wir text
    if (text !== '') {
        todoHinzufuegen(text);
        input.value = '';
        input.focus();
    }
});

const liste = document.querySelector('.js-todo-liste');
liste.addEventListener('click', event => {
    // contains( String ) Ueberprueft, ob der angegebene Klassenwert
    // im Klassenattribut des Elements vorhanden ist.
    if (event.target.classList.contains('js-haken')) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/target
        const itemKey = event.target.parentElement.dataset.key;
        umschaltenAufErledigt(itemKey);
    }

    if (event.target.classList.contains('js-todo-loeschen')) {
        const itemKey = event.target.parentElement.dataset.key;
        loescheTodoNotiz(itemKey);
    }

});