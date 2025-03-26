import { useState, useEffect } from 'react';
import { Toast } from 'antd-mobile';
import { observer } from 'mobx-react-lite';
import Balance from '@/components/balance';
import Header from '@/components/header';
import TimePicker from '@/components/TimePicker/indedx';
import Pagination from '@/components/Pagination';
import { formatBalance, reactClassNameJoin } from '@/utils';
import history from '@/utils/history';
import { getGameLogs } from '@/services/api';
import globalStore from '@/store/global.store';
import styles from './index.module.less';
import dayjs from 'dayjs';

const GameLog = () => {
  const { userInfo } = globalStore;
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState({
    page: 0,
    size: 10,
  });
  const [list, setList] = useState([]);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const getGameLogsReq = () => {
    Toast.show({
      icon: 'loading',
    });
    getGameLogs({
      username: userInfo.username,
      page: page.page,
      size: page.size,
      start_date: dayjs(start).format('YYYY-MM-DD'),
      end_date: dayjs(end).format('YYYY-MM-DD'),
    })
      .then((res) => {
        if (res.data.code === 200) {
          setTotal(res.data.data?.total || 0);
          setList(res.data.data?.list || []);
        }
      })
      .finally(() => {
        Toast.clear();
      });
  };

  useEffect(() => {
    if (userInfo.id) {
      getGameLogsReq();
    }
  }, [page, start, end, userInfo.id]);

  const renderList = () => {
    return (
      <div className={styles.listInner}>
        {list.map((item: any, index) => {
          return (
            <div className={styles.listItem} key={index}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.amount}>
                <div className={styles.betAmount}>
                  Bet Amount: {formatBalance(-item.bet_amount)}
                </div>
                <div
                  className={reactClassNameJoin(
                    styles.settelAmount,
                    item.payoff_amount > 0 ? styles.settelAmountWin : '',
                  )}>
                  {item.payoff_amount > 0 ? 'Win Amt: ' : 'Win Amt: '}
                  {formatBalance(item.payoff_amount)}
                </div>
              </div>
              <div className={styles.orderTimer}>
                <div className={styles.order}>
                  <img
                    src={require('./img/icon-bet-id.png')}
                    className={styles.orderIcon}
                  />
                  <span>{item.id}</span>
                </div>
                <div className={styles.time}>
                  <img
                    src={require('./img/icon-time.png')}
                    className={styles.timeIcon}
                  />
                  <span>{item.bet_start}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <Header
        title="Game Logs"
        right={<Balance />}
        onBack={() => {
          history.replace('/');
        }}
      />
      <div className={styles.content}>
        <div className={styles.filterContainer}>
          <div className={styles.timeContainer}>
            <TimePicker
              value={start}
              onChange={(val) => {
                setPage({
                  ...page,
                  page: 0,
                });
                setStart(val);
              }}
            />
            <TimePicker
              value={end}
              onChange={(val) => {
                setPage({
                  ...page,
                  page: 0,
                });
                setEnd(val);
              }}
            />
          </div>
        </div>
        <div className={styles.listContainer}>
          {renderList()}
          {total ? (
            <Pagination
              total={total}
              page={page}
              onChange={(val: any) => setPage(val)}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(GameLog);
