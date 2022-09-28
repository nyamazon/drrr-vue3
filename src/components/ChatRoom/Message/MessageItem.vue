<template>
  <div class="msg-item" v-if="msg.type !== 'join'">
    <div class="msg-avatar">
      <div class="avatar">
        <img :src="importAvatar(msg.avatar)" alt="" />
        <span class="username">{{ msg.username }}</span>
      </div>
    </div>
    <div class="msg-text">
      <div class="text-box">
        <p class="content">
          {{ msg.message }}
        </p>
      </div>
    </div>
  </div>
  <div class="msg-item" v-else>
    <div class="join-text">
      <span class="">————</span>
      <span>{{ `${msg.username}桑加入了房间` }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { IMessageItem } from '@/components/ChatRoom/Message/type';
  import { toRefs } from 'vue';
  interface MessageProps {
    msg: IMessageItem;
  }
  const props = withDefaults(defineProps<MessageProps>(), {
    msg: () => {
      return {
        message: 'hello world~',
        avatar: 'a',
        userId: 123,
        username: '甘乐',
      };
    },
  });
  const { msg } = toRefs(props);
  const importAvatar = (avatar: string = 'a') => {
    return new URL(`../../../assets/avatar/${avatar}.png`, import.meta.url).href;
  };
</script>
<style lang="scss" scoped>
  .msg-item {
    padding: 10px 10px;
    display: flex;
    align-items: center;
    & > .join-text {
      color: white;
      letter-spacing: 5px;
    }
    .msg-avatar {
      width: 55px;
      color: rgba(255, 255, 255, 0.9);
      padding: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .avatar {
        height: 55px;
        width: 55px;
        border: 2px solid #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        & > img {
          width: 90%;
          height: 90%;
        }
        .username {
          font-family: '微软雅黑', serif;
          width: fit-content;
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translate(-50%, 120%);
        }
      }
    }
    .msg-text {
      width: fit-content;
      height: fit-content;
      word-break: break-all;
      background-image: -webkit-linear-gradient(
        top,
        #abdcff 0,
        #9bd5ff 50%,
        #75c6ff 51%,
        #8ccfff 100%
      );
      margin: 10px 0 10px 32px;
      padding: 13px;
      color: #fff;
      border: 4px solid #fff;
      font-size: 16px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      position: relative;
      animation: appear 0.2s;

      &::before {
        position: absolute;
        border-style: solid;
        border-width: 4px 15px 4px 0;
        border-color: transparent rgb(122, 200, 255) transparent transparent;
        content: '';
        height: 0;
        width: 0;
        display: block;
        left: -15px;
        z-index: 3;
      }
      &::after {
        content: '';
        height: 0;
        width: 0;
        border-style: solid;
        border-width: 7px 28px 7px 0;
        border-color: transparent #ffffff transparent transparent;
        position: absolute;
        display: block;
        left: -32px;
      }
      & > .text-box {
        .content {
          margin: 0;
        }
      }
    }
    @media screen and (max-width: 979px) {
    }
  }
  @media screen and (max-width: 979px) {
    .msg-item {
      width: 100%;
    }
  }

  @keyframes appear {
    0% {
      transform: scale(0.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
