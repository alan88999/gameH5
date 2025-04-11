import { FC, memo, useEffect, useState } from 'react';
import { login, getCurrentUserInfo } from '@/services/api';
import history from '@/utils/history';
import Button from '@/components/button';
import CustomInput from '@/components/input';
import globalStore from '@/store/global.store';

import styles from './index.module.less';
import { Toast } from 'antd-mobile';

const Login: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const getUserInfo = async (is_first: boolean) => {
    const res = await getCurrentUserInfo();
    if (res.data.code === 200) {
      globalStore.setUserInfo(res.data.data);
      if (is_first) {
        history.push('/password');
      } else {
        history.push('/');
      }
    }
  };
  const handleLogin = async () => {
    setLoading(true);
    const res = await login({ username, password, source: 1 });
    setLoading(false);
    if (res.data.code === 200) {
      localStorage.setItem('token', `Bearer ${res.data.data.token}`);
      getUserInfo(res.data.data.is_first);
    } else {
      Toast.show({
        content: res?.data?.msg,
      });
    }
  };
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={require('./img/logo.png')} />
      {/* <div className={styles.title}>Login to Boss786</div> */}
      <div className={styles.inputContainer}>
        <CustomInput
          value={username}
          icon={require('./img/icon-username.png')}
          placeholder="Username"
          onChange={(val) => {
            setUsername(val);
          }}
        />
      </div>
      <div className={styles.inputContainer}>
        <CustomInput
          icon={require('./img/icon-password.png')}
          placeholder="password"
          type="Password"
          value={password}
          onChange={(val) => {
            setPassword(val);
          }}
        />
      </div>
      <Button
        loading={loading}
        disabled={!username || !password}
        icon={require('./img/icon-login.png')}
        className={styles.loginButton}
        onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default memo(Login);
