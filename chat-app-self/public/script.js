const API_URL = 'http://localhost:3000/api';
const socket = io('http://localhost:3000');
let currentRoomId = null;

function getToken() {
  return localStorage.getItem('token');
}

function setToken(token) {
  localStorage.setItem('token', token);
}


const registerForm = document.getElementById('registerForm');
console.log(registerForm);

if (registerForm) {

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.token) {

      setToken(data.token);
      window.location.href = '/chat.html';
    } else {
      alert(data.error);
    }
  });
}


const loginForm = document.getElementById('loginForm');
if (loginForm) {


  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      window.location.href = '/chat.html';
    } else {
      alert(data.error);
    }
  });
}


async function loadRooms() {
  if (!getToken()) return window.location.href = '/login.html';
  const res = await fetch(`${API_URL}/rooms`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });


  const rooms = await res.json();
  const roomsDiv = document.getElementById('rooms');
  roomsDiv.innerHTML = '';
  rooms.forEach(room => {

    const btn = document.createElement('button');
    btn.textContent = room.name;
    btn.onclick = () => joinRoom(room.id, room.name);
    roomsDiv.appendChild(btn);
  });
}

async function createRoom() {
  const name = document.getElementById('newRoom').value;
  if (!name) return;
  await fetch(`${API_URL}/rooms`, {

    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ name }),
  });
  loadRooms();
}

function joinRoom(roomId, roomName) {
  currentRoomId = roomId;


  document.getElementById('chat').style.display = 'block';
  document.getElementById('roomName').textContent = roomName;
  socket.emit('joinRoom', roomId.toString()); 
  loadMessages(); 
}

async function loadMessages() {
  if (!currentRoomId) return;


  const res = await fetch(`${API_URL}/messages/${currentRoomId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const messages = await res.json();
    console.log('Messages response:', messages);

  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = '';
  messages.forEach(msg => {
    const p = document.createElement('p');
    p.textContent = `${msg.username}: ${msg.content} (${msg.createdAt})`;
    messagesDiv.appendChild(p);
  });
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function sendMessage() {


  const content = document.getElementById('message').value;
  if (!content || !currentRoomId) return;
  await fetch(`${API_URL}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ roomId: currentRoomId, content }),
  });
  document.getElementById('message').value = '';
}

socket.on('newMessage', (msg) => {


  if (currentRoomId && msg.roomId === currentRoomId.toString()) {
    const messagesDiv = document.getElementById('messages');

    const p = document.createElement('p');
    p.textContent = `${msg.username}: ${msg.content} (${msg.createdAt})`;
    messagesDiv.appendChild(p);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
});

if (document.getElementById('rooms')) loadRooms();