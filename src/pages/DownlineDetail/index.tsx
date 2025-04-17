import { useEffect, useState } from 'react';
import { Toast } from 'antd-mobile';
import { observer } from 'mobx-react-lite';
import Header from '@/components/header';
import Balance from '@/components/balance';
import { logout, queryUserinfo, modifyStatus } from '@/services/api';
import TranferModal from '../DownlineManagement/components/transferModal';
import { formatBalance, getUrlParams, reactClassNameJoin } from '@/utils';
import CustoModal from '@/components/CustomModal';
import history from '@/utils/history';
import styles from './index.module.less';
import Avatar from '@/components/Avatar';
import { useTranslation } from 'react-i18next';

const DownlineDetail = () => {
  const { t } = useTranslation();
  const id = Number(getUrlParams('id'));
  const type = getUrlParams('type');
  const [modalProps, setModalProps] = useState({
    visible: false,
    content: '',
    contentDesc: '',
    icon: '',
    footer: {},
  });
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
      prefix: '',
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
  const [loading, setLoading] = useState(false);
  const [isTopUp, setIsTopUp] = useState(true);
  const [visible, setVisible] = useState(false);
  // 请求用户信息
  const queryUserinfoReq = () => {
    setLoading(true);
    queryUserinfo({ id })
      .then((res) => {
        if (res.data.code === 200) {
          setUserinfo(res.data.data);
        } else {
          Toast.show({
            content: res?.data?.msg,
          });
        }
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      });
  };

  useEffect(() => {
    queryUserinfoReq();
  }, [id]);

  // 修改用户状态
  const modifyStatusReq = (status: Number) => {
    Toast.show({
      icon: 'loading',
    });
    modifyStatus({ user_id: id, status })
      .then((res) => {
        if (res.data.code === 200) {
          queryUserinfoReq();
          setModalProps({
            ...modalProps,
            icon:
              status === 1
                ? require('./img/modal-reset-done.png')
                : require('./img/modal-freeze-done.png'),
            visible: true,
            content: status === 1 ? '' : '',
            contentDesc: status === 1 ? t('resetSuccess') : t('freezeSuccess'),
            footer: undefined as any,
          });
          // 两秒后自动关闭
          setTimeout(() => {
            setModalProps({
              ...modalProps,
              visible: false,
            });
          }, 2000);
        } else {
          Toast.show({
            content: res?.data?.msg,
          });
        }
      })
      .finally(() => {
        Toast.clear();
      });
  };

  // 修改用户状态弹窗操作 1 重置 2 冻结
  const handleModifyStatus = (status: Number) => {
    setModalProps({
      ...modalProps,
      icon:
        status === 1
          ? require('./img/modal-reset.png')
          : require('./img/modal-freeze.png'),
      visible: true,
      contentDesc:
        status === 1 ? t('resetAccountDesc') : t('freezeAccountDesc'),
      footer: {
        onOk: () => {
          modifyStatusReq(status);
        },
        onCancel: () => {
          setModalProps({
            ...modalProps,
            visible: false,
          });
        },
      },
    });
  };
  // 退出登录
  const logoutReq = () => {
    logout({
      user_id: id,
    })
      .then((res) => {
        if (res.data.code === 200) {
          setModalProps({
            ...modalProps,

            icon: require('./img/modal-logout-done.png'),
            visible: true,
            content: t('accountloggedOut'),
            contentDesc: t('logoutSuccess'),
            footer: undefined as any,
          });
          // 两秒后自动关闭
          setTimeout(() => {
            setModalProps({
              ...modalProps,
              visible: false,
            });
          }, 2000);
        } else {
          Toast.show({
            content: res.data.msg,
          });
        }
      })
      .catch((err) => {
        Toast.show({
          content: err.msg,
        });
      });
  };

  // 退出登录
  const handleLogout = () => {
    setModalProps({
      ...modalProps,
      icon: require('./img/modal-logout.png'),
      visible: true,
      contentDesc: t('forceLogoutDesc'),
      footer: {
        onOk: logoutReq,
        onCancel: () => {
          setModalProps({
            ...modalProps,
            visible: false,
          });
        },
      },
    });
  };

  return (
    <div className={styles.container}>
      <Header title={''} right={<Balance isAgent />} />
      <div className={styles.content}>
        <div className={styles.infoContainer}>
          <div className={styles.userinfo}>
            <div className={styles.avatar}>
              <Avatar userinfo={userinfo?.user_info} />
            </div>
            <div className={styles.info}>
              <span className={styles.text}>{t('playerID')}</span>
              <span className={styles.id}>{`${
                userinfo?.user_info?.prefix || ''
              }${userinfo?.user_info?.id.toString().slice(0, 8)}/${
                userinfo?.user_info?.username
              }`}</span>
              <span
                className={reactClassNameJoin(
                  styles.active,
                  userinfo?.user_info?.status === 2 ? styles.inactive : '',
                )}>
                {userinfo?.user_info?.status === 2 ? 'Inactive' : t('active')}
              </span>
            </div>
          </div>

          <img
            onClick={queryUserinfoReq}
            src={require('../Setting/img/icon-refresh.png')}
            className={reactClassNameJoin(
              styles.loadingIcon,
              loading ? styles.loading : '',
            )}
          />
          <div className={styles.balanceContainer}>
            <div className={styles.balanceItem}>
              <span className={styles.text}>{t('agentCreditBalance')}</span>
              <span className={styles.balance}>
                {formatBalance(userinfo?.user_info?.agent_balance || 0)}
              </span>
            </div>
            <div className={styles.balanceItem}>
              <span className={styles.text}>{t('gameCreditBalance')}</span>
              <span className={styles.balance}>
                {formatBalance(userinfo?.user_info?.game_balance || 0)}
              </span>
            </div>
          </div>
          <div className={styles.operate}>
            <div
              className={styles.topup}
              onClick={() => {
                setIsTopUp(true);
                setVisible(true);
              }}>
              <img src={require('./img/icon-topup.png')} />
              {t('topUp')}
            </div>
            <div
              className={styles.withdraw}
              onClick={() => {
                setIsTopUp(false);
                setVisible(true);
              }}>
              {t('withdraw')}
            </div>
          </div>
        </div>
        <div className={styles.accountOperate}>
          <div
            className={styles.operateItem}
            onClick={() => handleModifyStatus(1)}>
            <img src={require('./img/icon-reset.png')} />
            <span>{t('resetAccount')}</span>
          </div>
          <div
            className={styles.operateItem}
            onClick={() => handleModifyStatus(2)}>
            <img src={require('./img/icon-freeze.png')} />
            <span>{t('freezeAccount')}</span>
          </div>
          <div className={styles.operateItem} onClick={handleLogout}>
            <img src={require('../Setting/img/icon-logout.png')} />
            <span>{t('forceLogout')}</span>
          </div>
          <div
            className={styles.operateItem}
            onClick={() => {
              history.push(`/password?id=${id}`);
            }}>
            <img src={require('../Setting/img/icon-changePassword.png')} />
            <span>{t('changePassword')}</span>
          </div>
        </div>
        <div className={styles.logConatiner}>
          <div
            className={styles.logItem}
            onClick={() => {
              history.push(`/downlineLogs?id=${id}&type=1`);
            }}>
            <div className={styles.left}>
              <span>{t('transactionLog')}</span>
              <span>
                {t('lastTransaction')}:{' '}
                {formatBalance(userinfo?.transaction?.amount || 0)}
              </span>
            </div>
            <div className={styles.arrow}>
              <img src={require('./img/btn-next.png')} />
            </div>
          </div>
          <div
            className={styles.logItem}
            onClick={() => {
              history.push(`/downlineLogs?id=${id}&type=2`);
            }}>
            <div className={styles.left}>
              <span>{t('gameLog')}</span>
              <span>
                {t('lastPlayed')}: {userinfo?.bet_start}
              </span>
            </div>
            <div className={styles.arrow}>
              <img src={require('./img/btn-next.png')} />
            </div>
          </div>
          <div
            className={styles.logItem}
            onClick={() => {
              history.push(`/downlineLogs?id=${id}&type=3`);
            }}>
            <div className={styles.left}>
              <span>{t('IPLog')}</span>
              <span>
                {t('lastIP')}: {userinfo?.log?.ip}
              </span>
            </div>
            <div className={styles.arrow}>
              <img src={require('./img/btn-next.png')} />
            </div>
          </div>
        </div>
      </div>
      <TranferModal
        type={type}
        item={userinfo?.user_info}
        isTopUp={isTopUp}
        visible={visible}
        onClose={() => setVisible(false)}
        onSuccess={() => {
          queryUserinfoReq();
          setVisible(false);
        }}
      />
      <CustoModal
        {...modalProps}
        closeOnMaskClick={true}
        onClose={() => {
          setModalProps({
            ...modalProps,
            visible: false,
          });
        }}
      />
    </div>
  );
};

export default observer(DownlineDetail);
