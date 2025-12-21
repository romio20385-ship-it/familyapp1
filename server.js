const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// تقديم الملفات الثابتة (HTML, CSS, JS)
app.use(express.static(__dirname + '/public'));

// الدردشة
io.on('connection', (socket) => {
  console.log('🔗 مستخدم متصل');

  // 💬 الدردشة
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // 👥 الحضور
  socket.on('attendance', (data) => {
    io.emit('attendance', data);
  });

  // 📅 الحدث
  socket.on('event change', (newEvent) => {
    io.emit('event change', newEvent);
  });
});

// المنفذ: يقرأ من البيئة أو يستخدم 3000 محليًا
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ السيرفر يعمل على http://localhost:${PORT}`);
});