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
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// تشغيل السيرفر
server.listen(3000, () => {
  console.log('✅ السيرفر يعمل على http://localhost:3000');
});