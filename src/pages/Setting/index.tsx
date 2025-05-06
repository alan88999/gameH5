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
import { useTranslation } from 'react-i18next';
import LanguagePicker from '@/components/LanguagePicker';
import i18n from '@/i18n';

const Setting = () => {
  const { t } = useTranslation();
  const { refreshUserInfo, userInfo, refreshing } = globalStore;
  const [visible, setVisible] = useState(false);
  const [languageVisible, setLanguageVisible] = useState(false);
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
            content: t('accountloggedOut'),
            contentDesc: t('logoutSuccess'),
          });
          setTimeout(() => {
            setModalProps({
              ...modalProps,
              visible: false,
              content: t('accountloggedOut'),
              contentDesc: t('logoutSuccess'),
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
        title={t('setting')}
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
            <div className={styles.text}>{t('playerID')}</div>
            <div
              className={
                styles.idText
              }>{`${userInfo.username}/${userInfo.nickname}`}</div>
            <div
              className={reactClassNameJoin(
                styles.active,
                userInfo?.status === 2 ? styles.inactive : '',
              )}>
              {userInfo.status === 1 ? t('active') : 'Inactive'}
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
          <div className={styles.text}>{t('agentCreditBalance')}</div>
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
            <div className={styles.listText}>{t('changePassword')}</div>
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
            setLanguageVisible(true);
          }}>
          <div className={styles.left}>
            <div
              className={styles.languageContainer}>
              <img
                src={
                  i18n.language === 'en'
                    ? require('../Login/img/en.png')
                    : require('../Login/img/bd.png')
                }
              />
            </div>
            <div className={styles.listText}>
              {t('language')} - {t(`${i18n.language}`)}
            </div>
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
              content: t('forceLogoutDesc'),
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
            <div className={styles.listText}>{t('logout')}</div>
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
      <LanguagePicker
        visible={languageVisible}
        onCancel={() => setLanguageVisible(false)}
      />
    </div>
  );
};

export default observer(Setting);
