const API_URL = 'http://localhost:3000/api';
let currentRoomId = null;

function getToken() {
  return localStorage.getItem('token');
}

function setToken(token) {
  localStorage.setItem('token', token);
}

// For register.html
const registerForm = document.getElementById('registerForm');
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

// For login.html
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

// For chat.html
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
  loadMessages();
  setInterval(loadMessages, 5000); // Poll every 5s
}

async function loadMessages() {
  if (!currentRoomId) return;
  const res = await fetch(`${API_URL}/messages/${currentRoomId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const messages = await res.json();
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
  loadMessages();
}

// Load rooms on chat.html load
if (document.getElementById('rooms')) loadRooms();