import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Header from '@/components/header';
import Balance from '@/components/balance';
import styles from './index.module.less';
import { formatBalance, reactClassNameJoin } from '@/utils';
import { getDownUsers } from '@/services/api';
import history from '@/utils/history';
import TranferModal from './components/transferModal';

const DownlineManagement = () => {
  const [type, setType] = useState('player');
  const [isTopUp, setIsTopUp] = useState(true);
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState({});
  const [list, setList] = useState([]);

  const getDownUsersReq = () => {
    getDownUsers().then((res) => {
      if (res.data.code === 200) {
        setList(res?.data?.data || []);
      }
    });
  };

  useEffect(() => {
    getDownUsersReq();
  }, []);

  const renderList = () => {
    return list.map((item: any, index) => {
      return (
        <div className={styles.listItem} key={index}>
          <div className={styles.info}>
            <div className={styles.infoText}>
              <img src={require('./img/icon-id.png')} />
              {item.id}
            </div>
            <div className={styles.infoText}>
              <img src={require('./img/icon-money.png')} />
              {formatBalance(
                item[type === 'player' ? 'game_balance' : 'agent_balance'],
              )}
            </div>
          </div>
          <div className={styles.operate}>
            <div
              className={styles.btn}
              onClick={() => {
                setItem(item);
                setIsTopUp(true);
                setVisible(true);
              }}>
              <img src={require('./img/btn-add.png')} />
            </div>
            <div
              className={styles.btn}
              onClick={() => {
                setItem(item);
                setIsTopUp(false);
                setVisible(true);
              }}>
              <img src={require('./img/btn-minus.png')} />
            </div>
            <div
              className={styles.btn}
              onClick={() => {
                history.push(`/downlineDetail?id=${item.id}&type=${type}`);
              }}>
              <img src={require('./img/btn-more.png')} />
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className={styles.container}>
      <Header
        title=""
        onBack={() => {
          history.replace('/');
        }}
        right={<Balance />}
      />
      <div className={styles.content}>
        <div className={styles.filterContainer}>
          <div className={styles.title}>
            <span>Downline Management</span>
            <div
              className={styles.addBtn}
              onClick={() => {
                history.push('/addNewUser');
              }}>
              <img src={require('./img/btn-add-downline.png')} />
            </div>
          </div>
          <div className={styles.typeTab}>
            <div
              className={reactClassNameJoin(
                styles.tabItem,
                type === 'player' ? styles.active : '',
              )}
              onClick={() => {
                setType('player');
              }}>
              Players
            </div>
            <div
              className={reactClassNameJoin(
                styles.tabItem,
                type === 'agent' ? styles.active : '',
              )}
              onClick={() => {
                setType('agent');
              }}>
              Agents
            </div>
          </div>
        </div>
        <div className={styles.listContainer}>{renderList()}</div>
      </div>
      <TranferModal
        type={type}
        item={item}
        isTopUp={isTopUp}
        visible={visible}
        onClose={() => setVisible(false)}
        onSuccess={() => {
          setVisible(false);
          getDownUsersReq();
        }}
      />
    </div>
  );
};

export default observer(DownlineManagement);
