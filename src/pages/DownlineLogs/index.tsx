import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Header from '@/components/header';
import styles from './index.module.less';
import { formatBalance, getUrlParams, reactClassNameJoin } from '@/utils';
import {
  queryUserinfo,
  queryGameByUsername,
  transactionList,
  queryIPLog,
} from '@/services/api';
import { Toast } from 'antd-mobile';
import dayjs from 'dayjs';
import Pagination from '@/components/Pagination';
import Avatar from '@/components/Avatar';

const DownlineLogs = () => {
  const id = Number(getUrlParams('id'));
  const typeUrl = getUrlParams('type');

  const [type, setType] = useState(Number(typeUrl) || 1);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState({
    page: 0,
    size: 10,
  });
  const [list, setList] = useState([]);
  const [start] = useState(dayjs().subtract(30, 'd'));
  const [end] = useState(new Date());
  const [userinfo, setUserinfo] = useState({
    bet_start: '',
    user_info: {
      id: 0,
      username: '',
      nickname: '',
      status: 1,
      game_balance: 0,
      agent_balance: 0,
      updated_at: 0,
    },
    log: {
      ip: '',
      user_id: 0,
      created_at: '',
    },
    transaction: {
      created_at: '',
      amount: 0,
    },
  });

  const getListReq = () => {
    setList([]);
    setTotal(0);
    const api =
      type === 1
        ? transactionList
        : type === 2
        ? queryGameByUsername
        : queryIPLog;
    Toast.show({
      icon: 'loading',
    });
    api({
      username: userinfo?.user_info?.username,
      user_id: userinfo?.user_info?.id,
      page: page.page,
      size: page.size,
      start: dayjs(start).startOf('day').valueOf(),
      end: dayjs(end).endOf('day').valueOf(),
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
    if (userinfo?.user_info?.id) {
      getListReq();
    }
  }, [page, start, end, userinfo?.user_info?.id, type]);

  // 请求用户信息
  const queryUserinfoReq = () => {
    queryUserinfo({ id }).then((res) => {
      if (res.data.code === 200) {
        setUserinfo(res.data.data);
      } else {
        Toast.show({
          content: res?.data?.msg,
        });
      }
    });
  };

  useEffect(() => {
    queryUserinfoReq();
  }, [id]);

  const renderList = () => {
    return (
      <div className={styles.listInner}>
        {list.map((item: any, index) => {
          const text1 =
            type === 1
              ? item.transfer_type === 1
                ? 'Top Up'
                : 'Withdraw'
              : type === 2
              ? item.name
              : 'IP';
          const text3 =
            type === 1
              ? `${item.transfer_type === 1 ? '+' : ''}${formatBalance(
                  item.amount || 0,
                )}`
              : type === 2
              ? formatBalance(item.payoff_amount)
              : item.ip;
          return (
            <div className={styles.listItem} key={index}>
              <div className={styles.left}>
                <div className={styles.title}>{text1}</div>
                <div className={styles.time}>
                  Date: {dayjs(item.created_at).format('HH:mm:ss MM/DD/YYYY')}
                </div>
              </div>
              <div
                className={reactClassNameJoin(
                  styles.right,
                  type === 1 || type === 2
                    ? item.transfer_type === 1 || item.payoff_amount >= 0
                      ? styles.add
                      : styles.minus
                    : '',
                )}>
                {text3}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <Header title="Downline Logs" />
      <div className={styles.content}>
        <div className={styles.infoContainer}>
          <div className={styles.userinfo}>
            <div className={styles.avatar}>
              <Avatar userinfo={userinfo} />
            </div>
            <div className={styles.info}>
              <span className={styles.text}>Player ID</span>
              <span className={styles.id}>{id}</span>
              <span
                className={reactClassNameJoin(
                  styles.active,
                  userinfo?.user_info?.status === 2 ? styles.inactive : '',
                )}>
                {userinfo?.user_info?.status === 2 ? 'Inactive' : 'Active'}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.typeTab}>
          <div
            className={reactClassNameJoin(
              styles.tabItem,
              type === 1 ? styles.active : '',
            )}
            onClick={() => {
              setType(1);
            }}>
            Transactions
          </div>
          <div
            className={reactClassNameJoin(
              styles.tabItem,
              type === 2 ? styles.active : '',
            )}
            onClick={() => {
              setType(2);
            }}>
            Game Log
          </div>
          <div
            className={reactClassNameJoin(
              styles.tabItem,
              type === 3 ? styles.active : '',
            )}
            onClick={() => {
              setType(3);
            }}>
            IP Log
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

export default observer(DownlineLogs);
