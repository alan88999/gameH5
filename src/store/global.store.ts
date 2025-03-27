import { getCurrentUserInfo } from '@/services/api';
import { makeAutoObservable, runInAction } from 'mobx';

const globalStore = makeAutoObservable({
  userInfo: {
    id:0,
    status: 1,
    currency_id: 0,
    nickname:'nickname',
    username:'username',
    game_balance: 0,
    agent_balance: 0,
    master_count: 0,
    wechat: '',
    whats_app:'',
    prefix: '',
  } ,
  refreshing: false,
  setUserInfo: (val: any) => {
    runInAction(() => {
      globalStore.userInfo = val;
    });
  },
  refreshUserInfo: async () => {
    runInAction(() => {
      globalStore.refreshing = true;
    });
    const res = await getCurrentUserInfo();
    runInAction(() => {
      // 默认最少请求0.5秒，为了显示loading动画
      setTimeout(() => {
        globalStore.refreshing = false;  
        if (res.data.code === 200) {
          globalStore.setUserInfo(res.data.data);
        }  
      }, 500);
    });
   
  },
});

export default globalStore;
