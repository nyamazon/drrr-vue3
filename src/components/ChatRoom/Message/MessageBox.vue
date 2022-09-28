<template>
  <div class="chat">
    <div class="msg-box">
      <template v-for="item in dataSource">
        <MessageItem :msg="item"></MessageItem>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import MessageItem from '@/components/ChatRoom/Message/MessageItem.vue';
  import { IMessageItem } from '@/components/ChatRoom/Message/type';
  import { toRefs } from 'vue';
  interface IMessageDataProps {
    dataSource: IMessageItem[];
  }
  const props = withDefaults(defineProps<IMessageDataProps>(), {
    dataSource: () => [],
  });
  const { dataSource } = toRefs(props);
</script>

<style lang="scss" scoped>
  .chat {
    height: calc(100% - 200px);
    background-color: #000;
    overflow-y: scroll;
    .msg-box {
      width: 900px;
      margin: 0 auto;
      display: flex;
      flex-direction: column-reverse;
    }
    @media screen and (max-width: 979px) {
      .msg-box {
        width: 100%;
      }
    }
  }
</style>
