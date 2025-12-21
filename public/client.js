const socket = io();

// 📅 تغيير الحدث
const eventInput = document.getElementById('event');
eventInput.addEventListener('change', () => {
  socket.emit('event change', eventInput.value);
});
socket.on('event change', (newEvent) => {
  document.getElementById('event').value = newEvent;
});

// 👥 إرسال الحضور
function sendAttendance(status) {
  const name = prompt("اكتب اسمك:");
  if (!name) return;
  socket.emit('attendance', { name, status });
}

// استقبال الحضور
socket.on('attendance', (data) => {
  const list = document.getElementById('attendance-list');
  const item = document.createElement('li');
  item.textContent = `${data.name} - ${data.status}`;
  list.appendChild(item);

  // إذا حضر، أضف موقعه على الخريطة (كمثال موقع طرابلس)
  if (data.status === 'سأحضر') {
    L.marker([32.8872, 13.1913]).addTo(map).bindPopup(data.name).openPopup();
  }
});

// 💬 الدردشة
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
});

// 🗺️ إعداد الخريطة
const map = L.map('map').setView([32.8872, 13.1913], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);