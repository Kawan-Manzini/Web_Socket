const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get('username');
const room = urlSearch.get('select_room');

// emit => emitir alguma informação
//on => escutando alguma informação]
const usernameDiv = document.getElementById('username')
usernameDiv.innerHTML = `Olá ${username} - Você está na sala <strong>${room}</strong>`

socket.emit('select_room', {
  username,
  room,
}, (response) => {
  console.log(response);
  response.forEach(element => createMessageDiv(data));
});

document.getElementById("message_input").addEventListener("keypress", (event) => {
  if (event.key === 'Enter') {
    const message = event.target.value;

    const data = {
      room,
      message,
      username,
    }

    socket.emit('message', data);

    event.target.value = "";
  }
})

socket.on('message', data => {
  console.log("data", data)
  createMessageDiv(data)
})

function createMessageDiv(data) {
  const messageDiv = document.getElementById('messages')
  messageDiv.innerHTML += `
    <div class="new_message">
      <label class="form-label">
        <strong> ${data.username} </strong> <span> ${data.text} - ${dayjs(data.created_at).format('DD/MM HH:mm')}</span>
      </label>
    </div>
  `
}


document.getElementById('logout').addEventListener('click', (event) => {
  window.location.href = 'index.html'
})




