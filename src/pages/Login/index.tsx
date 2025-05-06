import { FC, memo, useState } from 'react';
import { login, getCurrentUserInfo } from '@/services/api';
import history from '@/utils/history';
import Button from '@/components/button';
import CustomInput from '@/components/input';
import globalStore from '@/store/global.store';
import { useTranslation } from 'react-i18next';
import LanguagePicker from '@/components/LanguagePicker';
import i18n from '@/i18n';

import styles from './index.module.less';
import { Toast } from 'antd-mobile';

const Login: FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

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
      <img className={styles.logoTop} src={require('./img/logo-top.png')} />
      <img
        className={styles.logoBottom}
        src={require('./img/logo-bottom.png')}
      />
      <div className={styles.inputContainer}>
        <CustomInput
          value={username}
          icon={require('./img/icon-username.png')}
          placeholder={t('username')}
          onChange={(val) => {
            setUsername(val);
          }}
        />
      </div>
      <div className={styles.inputContainer}>
        <CustomInput
          icon={require('./img/icon-password.png')}
          placeholder={t('password')}
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
        {t('login')}
      </Button>
      <div
        className={styles.languageContainer}
        onClick={() => {
          setVisible(true);
        }}>
        <img
          src={
            i18n.language === 'en'
              ? require('./img/en.png')
              : require('./img/bd.png')
          }
        />
     
      </div>
      <LanguagePicker visible={visible} onCancel={() => setVisible(false)} />
    </div>
  );
};

export default memo(Login);
