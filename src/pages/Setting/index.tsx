import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Header from '@/components/header';
import Avatar from '@/components/Avatar';
import styles from './index.module.less';
import globalStore from '@/store/global.store';
import { formatBalance, reactClassNameJoin } from '@/utils';
import CustoModal from '@/components/CustomModal';
import history from '@/utils/history';
import { logout } from '@/services/api';
import { Toast } from 'antd-mobile';

const Setting = () => {
  const { refreshUserInfo, userInfo, refreshing } = globalStore;
  const [modalProps, setModalProps] = useState<any>({
    visible: false,
    content: '',
  });
  useEffect(() => {
    refreshUserInfo();
  }, []);
  const logoutReq = () => {
    logout({
      user_id: userInfo.id,
    })
      .then((res) => {
        if (res.data.code === 200) {
          setModalProps({
            ...modalProps,
            icon: require('../DownlineDetail/img/modal-logout-done.png'),
            visible: true,
            content: 'Account Logged Out!',
            contentDesc: 'This account has been successfully force logged out.',
          });
          setTimeout(() => {
            setModalProps({
              ...modalProps,
              visible: false,
              content: 'Account Logged Out!',
              contentDesc:
                'This account has been successfully force logged out.',
            });
            history.replace('/login');
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
  return (
    <div className={styles.container}>
      <Header
        title="Setting"
        onBack={() => {
          history.replace('/');
        }}
      />
      <div className={styles.userInfoContainer}>
        <div className={styles.left}>
          <div className={styles.avatar}>
            <Avatar userinfo={userInfo} />
          </div>
          <div className={styles.idInfo}>
            <div className={styles.text}>Player ID</div>
            <div
              className={
                styles.idText
              }>{`${userInfo.username}/${userInfo.id}`}</div>
            <div
              className={reactClassNameJoin(
                styles.active,
                userInfo?.status === 2 ? styles.inactive : '',
              )}>
              {userInfo.status === 1 ? 'Active' : 'Inactive'}
            </div>
          </div>
        </div>
        <div className={styles.balanceContainer}>
          <img
            src={require('./img/icon-refresh.png')}
            className={reactClassNameJoin(
              styles.refreshIcon,
              refreshing ? styles.refreshing : '',
            )}
            onClick={() => {
              refreshUserInfo();
            }}
          />
          <div className={styles.text}>Agent Credit (BDT)</div>
          <div className={styles.balance}>
            {formatBalance(userInfo.agent_balance)}
          </div>
        </div>
      </div>
      <div className={styles.listContainer}>
        <div
          className={styles.listItem}
          onClick={() => {
            history.push('/password');
          }}>
          <div className={styles.left}>
            <img
              src={require('./img/icon-changePassword.png')}
              className={styles.icon}
            />
            <div className={styles.listText}>Change Password</div>
          </div>
          <div className={styles.arrow}>
            <img
              src={require('../DownlineDetail/img/btn-next.png')}
              className={styles.icon}
            />
          </div>
        </div>
        <div
          className={styles.listItem}
          onClick={() => {
            setModalProps({
              ...modalProps,
              icon: require('../DownlineDetail/img/modal-logout.png'),
              visible: true,
              content: 'Are you sure to force-logout this account?',
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
          }}>
          <div className={styles.left}>
            <img
              src={require('./img/icon-logout.png')}
              className={styles.icon}
            />
            <div className={styles.listText}>Logout</div>
          </div>
          <div className={styles.arrow}>
            <img
              src={require('../DownlineDetail/img/btn-next.png')}
              className={styles.icon}
            />
          </div>
        </div>
      </div>
      <CustoModal {...modalProps} />
    </div>
  );
};

export default observer(Setting);
