import { createServer } from 'http';
import { Server } from 'socket.io';

const io = new Server(4545, { cors: true });
let userList = new Map();
let messageList = [];
io.on('connection', (socket) => {
  // 用户连接时触发
  console.log('用户链接了聊天室!');

  // 进入后先发送所有信息列表
  if (messageList.length) socket.emit('all chat message', messageList);

  socket.on('join', (e) => {
    userList.set(socket.id, e);
    // 把加入的情况加入到消息列表里
    console.log('Join data ===> ', e);
    messageList.push({ type: 'join', id: socket.id, ...e });
    // 加入成功后返回加入成功的事件
    socket.emit('chat message', { type: 'join', id: socket.id, test: '服务端传回的数据', ...e });
    socket.emit('joined', Object.assign({}, e, { id: socket.id }));
  });

  socket.on('chat message', (message) => {
    messageList.push(message);
    console.log('repsonse chat message');
    socket.emit('chat message', message);
  });

  socket.on('disconnecting', (e) => {
    console.log('用户离开，连接断开');
    messageList.push({ type: 'leave', id: socket.id, ...e });
    socket.emit('chat message', { type: 'leave', id: socket.id, ...e });
  });
});
// let port = 4545;
