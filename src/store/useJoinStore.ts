import { defineStore } from 'pinia';
import { JoinValue } from '@/components/Login/types';

interface JoinValueStore {
  JoinForm: JoinValue;
}

const useJoinStore = defineStore({
  id: 'JoinStore',
  state: (): JoinValueStore=> ({
    JoinForm: {
      username:'',
      avatar:''
    },
  }),
  actions: {
    updateJoinValue(newValue: JoinValue) {
      this.$state.JoinForm = {...newValue}
    },
  },
});

export default useJoinStore;
