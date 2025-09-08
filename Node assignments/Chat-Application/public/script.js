const socket = io();

const form = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (messageInput.value.trim()) {
    socket.emit('chat message', messageInput.value);
    messageInput.value = '';
  }
});

socket.on('load messages', (messages) => {
  messages.forEach(({ username, content }) => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.textContent = `${username}: ${content}`;
    messages.appendChild(div);
  });
  messages.scrollTop = messages.scrollHeight;
});

socket.on('chat message', ({ username, content }) => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.textContent = `${username}: ${content}`;

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});

socket.on('error', ({ message }) => {
  alert(message);
});