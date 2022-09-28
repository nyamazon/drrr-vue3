<template>
  <div class="chat-room">
    <!-- 发送消息区域 -->
    <div class="post">
      <div class="post-box">
        <textarea class="post-area" wrap="hard" v-model="msg" />
        <button class="post-button" @click="sendMessage">POST!</button>
      </div>
    </div>

    <!-- 聊天信息区域 -->
    <MessageBox :data-source="msgData"></MessageBox>
  </div>
</template>

<script lang="ts" setup>
  import MessageBox from '@/components/ChatRoom/Message/MessageBox.vue';
  import { IMessageItem } from '@/components/ChatRoom/Message/type';
  import { onMounted, ref } from 'vue';
  import { io } from 'socket.io-client';
  import useJoinStore from '@/store/useJoinStore';

  const socket = io('ws://10.11.84.113:4545');
  socket.on('chat message', (msg) => {
    console.log('服务端返回消息', msg);
  });

  const msg = ref<string>('');
  const msgData = ref<IMessageItem[]>([]);
  const useJoin = useJoinStore();
  onMounted(() => {
    if (msgData.value.length === 0) {
      socket.on('all chat message', (msgList) => {
        console.log('enter all chat masssgea');
        msgData.value = msgList;
      });
    }
  });
  const fakeItem = (message: string): IMessageItem => {
    return {
      message,
      ...useJoin.$state.JoinForm,
    };
  };
  const sendMessage = () => {
    let fakeData = fakeItem(msg.value);
    socket.emit('chat message', { loop: '前端项目', ...fakeData });
    console.log('fakeData:', fakeData);
    msgData.value.push(fakeData as IMessageItem);
  };
</script>

<style lang="scss" scoped>
  .chat-room {
    height: 100vh;
    display: flex;
    flex-direction: column;
    .post {
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      .post-box {
        height: 100%;
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .post-area {
          resize: none;
          width: 80%;
          height: 60%;
          border-radius: 10px;
          font-size: 16px;
          padding: 5px;
        }
        .post-button {
          font-weight: bold;
          cursor: pointer;
          width: 30%;
          border-radius: 12px;
          background-color: rgb(252, 252, 204);
          //box-shadow: 10px 10px #000;
          border: 2px solid #000;
          padding: 4px 0;
          //position: relative;
          ::after {
            //opacity: 0;
            box-shadow: 0 0 0 50px blue;
            transition: 0.3s;
          }

          &:active::after {
            box-shadow: none;
            opacity: 0.4;
            transition: 0s; /*勾销过渡*/
          }
          //&::after {
          //  content: 'POST SUCCESS~';
          //  color: #fff;
          //  text-align: center;
          //  vertical-align: middle;
          //  position: absolute;
          //  border-radius: inherit;
          //  z-index: 2;
          //  top: 0;
          //  left: 0;
          //  right: 0;
          //  bottom: 0;
          //  background: #2098d1;
          //  transform: scaleX(0);
          //  transform-origin: 0 50%;
          //  transition-property: transform;
          //  transition-duration: 0.3s;
          //  transition-timing-function: ease-out;
          //}
          //&:active::after {
          //  transform: scaleX(1);
          //  box-shadow: none;
          //}
        }
      }
      @media screen and (max-width: 979px) {
        .post-box {
          width: 100%;
        }
      }
    }
  }
  /* 窗口宽度<960,设计宽度=768 */
</style>
