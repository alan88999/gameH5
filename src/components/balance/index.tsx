import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import globalStore from '@/store/global.store';
import styles from './index.module.less';
import { formatBalance, getToken, reactClassNameJoin } from '@/utils';
import Avatar from '../Avatar';
import { getCurrentUserInfo } from '@/services/api';
import { useTranslation } from 'react-i18next';

interface Props {
  isAgent?: boolean;
  showTwo?: boolean;
}

const Balance = (props: Props) => {
  const {t} = useTranslation();
  const { isAgent, showTwo } = props;
  const [currency, setCurrency] = useState<any>({});
  const { userInfo, setUserInfo, currencyList, refreshgCurrencyList } =
    globalStore;
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
  useEffect(() => {
    if (!currencyList.length) {
      refreshgCurrencyList();
    } else {
      if (userInfo.id) {
        const currentCurrency = currencyList.find(
          (i: any) => i.id === userInfo.currency_id,
        );
        setCurrency(currentCurrency || { currency_code: 'THB:' });
      }
    }
  }, [currencyList, userInfo]);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {isAgent || showTwo ? (
          <div className={reactClassNameJoin(styles.balanceItem, styles.balanceItemAgent)}>
            <div className={styles.text}>{t('agentCredit')}</div>
            <div className={styles.balance}>
              {formatBalance(userInfo.agent_balance)}
            </div>
          </div>
        ) : (
          ''
        )}
        {!isAgent ? (
          <div className={styles.balanceItem}>
            <div className={styles.text}>{t('gameCredit')}</div>
            <div className={styles.balance}>
              {formatBalance(userInfo.game_balance)}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={styles.right}>
        <Avatar userinfo={userInfo} className={styles.avatar} />
      </div>
    </div>
  );
};
export default observer(Balance);
