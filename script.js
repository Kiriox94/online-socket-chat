var socket = io();

var form = document.getElementById('form');
var msgInput = document.getElementById('msgInput');
var userInput = document.getElementById('userInput');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (msgInput.value) {
        socket.emit('chat message', msgInput.value, userInput.value);
        msgInput.value = '';
    }
});

socket.on('chat message', function(msg, user) {
    var item = document.createElement('li');
    item.textContent = `${user} : ${msg}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

if (typeof(Storage) !== "undefined") {
    if (localStorage.username != null) userInput.value = localStorage.username
    userInput.addEventListener("blur", function() {
        localStorage.username = userInput.value
    });
}

const pickerOptions = { onEmojiSelect: emojiSelected}
const picker = new EmojiMart.Picker(pickerOptions)
var emojisButton = document.getElementById('emojis-button');

changeEmojiPickerVisibility(false)

document.body.appendChild(picker)

function emojiSelected(emoji) {
    msgInput.value += emoji.native
}

function changeEmojiPickerVisibility(visible) {
    let boolToDisplay = (bool) => {return bool ? "" : "none"}
    let displayToBool = (display) => {return display == "" }

    picker.style.display = visible == null ? boolToDisplay(!displayToBool(picker.style.display)) : boolToDisplay(visible)
}

function emojisButtonClick() {
    emojisButton.classList.toggle("fa-solid")
    changeEmojiPickerVisibility()
}