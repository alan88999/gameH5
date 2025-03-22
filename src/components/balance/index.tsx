import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import globalStore from '@/store/global.store';
import styles from './index.module.less';
import { formatBalance, getToken } from '@/utils';
import { getCurrentUserInfo } from '@/services/api';

const Balance = () => {
  const { t } = useTranslation('');
  const { userInfo, setUserInfo } = globalStore;
  const token = getToken();
  const getUserInfo = async () => {
    const res = await getCurrentUserInfo();
    if (res.data.code === 200) {
      setUserInfo(res.data.data);
    }
  };
  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token]);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.text}>Games Credit (BDT)</div>
        <div className={styles.balance}>
          {formatBalance(userInfo.game_balance)}
        </div>
      </div>
      <div className={styles.right}>
        <img className={styles.avatar} />
      </div>
    </div>
  );
};
export default observer(Balance);
