const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'submissions.json');

function readData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE));
}
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/submissions', (req, res) => {
  res.json(readData());
});

app.post('/api/submissions', (req, res) => {
  const data = readData();
  const submission = { ...req.body, created: Date.now() };
  data.push(submission);
  writeData(data);
  io.emit('new-submission', submission);
  res.status(201).json(submission);
});

io.on('connection', (socket) => {
  console.log('Dashboard connected');
});

server.listen(4000, () => {
  console.log('Local API & WebSocket server running on http://localhost:4000');
}); 