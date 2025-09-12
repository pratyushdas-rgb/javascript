const socket = io();

const chatBox = document.getElementById("chat-box");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

let senderId = parseInt(prompt("Enter your user ID (1 or 2):"));
let receiverId = senderId === 1 ? 2 : 1;


sendBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text) {
    socket.emit("chatMessage", { senderId, receiverId, text });
    input.value = "";
  }
});

socket.on("chatMessage", (msg) => {
  const p = document.createElement("p");
  const senderName = msg.sender ? msg.sender.username : msg.sender_id;
  p.textContent = `${senderName}: ${msg.messageText}`;
  chatBox.appendChild(p);
});