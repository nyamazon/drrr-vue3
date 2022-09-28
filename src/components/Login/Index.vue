<template>
  <div class="login-bg">
    <div class="login">
      <div class="logo">
        <img src="../../assets/drrr.png" alt="" />
      </div>
      <div class="login-form">
        <div class="form">
          <label for="username">username</label>
          <input type="text" id="username" class="username" v-model="userForm.username" />
        </div>
        <a-radio-group v-model:value="toggleAvatarSetting" name="radioGroup">
          <a-radio value="random">随机</a-radio>
          <a-radio value="choose" disabled>选择</a-radio>
        </a-radio-group>
        <a-button class="login-btn" @click="enterRoom">ENTER</a-button>
      </div>
    </div>
    <div class="avatar-list" v-if="toggleAvatarSetting === 'choose'"></div>
  </div>
</template>

<script lang="ts" setup>
  import { JoinValue } from '@/components/Login/types';
  import { Button, RadioGroup, Radio } from 'ant-design-vue';
  import { reactive, ref } from 'vue';
  import character from '@/data/character.json';
  import { getRandomnNum } from '@/util/random';
  import useJoinStore from '@/store/useJoinStore';
  import { useRouter } from 'vue-router';

  import { io } from 'socket.io-client';

  const socket = io('ws://10.11.84.113:4545');
  const toggleAvatarSetting = ref<string>('random');
  const userForm = reactive<JoinValue>({
    avatar: '',
    username: '',
  });
  const router = useRouter();

  const enterRoom = () => {
    const characterList = Object.keys(character);
    const random = getRandomnNum(0, characterList.length);
    userForm.avatar = characterList[random];
    useJoinStore().updateJoinValue({ ...userForm });
    socket.emit('join', { ...userForm });
    router.push('/chatroom');
  };
</script>

<style lang="scss" scoped>
  .ant-radio-wrapper {
    padding: 10px 0 0 0;
    color: #fff;
  }
  .login-bg {
    width: 100%;
    height: 100%;
    background-color: #000;
    position: relative;
    .login {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -70%);
      .logo {
        & > img {
          width: 100%;
          height: 100%;
        }
      }
      .login-form {
        margin-top: 100px;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        & > .form {
          display: flex;
          justify-content: center;
          align-items: center;
          & > label {
          }
          .username {
            margin-left: 10px;
            border-radius: 10px;
            padding: 3px;
            color: black;
          }
        }
        .login-btn {
          margin-top: 10px;
          width: fit-content;
          padding: 5px;
        }
      }
    }
  }
</style>
