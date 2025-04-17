import { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Header from '@/components/header';
import Button from '@/components/button';
import styles from './index.module.less';
import { addNewUser } from '@/services/api';
import CustomInput from '@/components/input';
import CustoModal from '@/components/CustomModal';
import history from '@/utils/history';
import globalStore from '@/store/global.store';
import { Toast } from 'antd-mobile';
import CopyToClipboard from 'react-copy-to-clipboard';
import { reactClassNameJoin } from '@/utils';
import { useTranslation } from 'react-i18next';

const AddUser = () => {
  const { t } = useTranslation();
  const [newUserinfo, setNewUseinfo] = useState({
    currency_id: 0,
    password: '',
    username: '',
  });
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, seEmail] = useState('');
  const [balance, setMoney] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { userInfo, refreshUserInfo } = globalStore;

  const btnActive = useMemo(() => {
    return nickname && newPassword && confirmPassword;
  }, [nickname, newPassword, confirmPassword]);

  useEffect(() => {
    if (!userInfo?.id) {
      refreshUserInfo();
    }
  }, [userInfo?.id]);

  const addNewUserReq = () => {
    if (loading) {
      return;
    }
    if (newPassword !== confirmPassword) {
      Toast.show({
        content: t('sameDesc'),
      });
      return;
    }
    setLoading(true);
    const params: any = {
      currency_id: userInfo.currency_id,
      prefix: userInfo.prefix,
      password: newPassword,
      nickname,
      email,
      phone,
      balance: Number(balance) * 1000,
    };

    addNewUser(params)
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
          if (res.data.code === 200) {
            setNewUseinfo(res.data.data);
            setVisible(true);
          } else {
            Toast.show({
              content: res.data.msg,
            });
          }
        }, 500);
      })
      .catch((error) => {
        Toast.show({
          content: error.msg,
        });
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };
  return (
    <div className={styles.container}>
      <Header title="Add Downline" />
      <div className={styles.content}>
        <div className={styles.desc}>{t('addDownlineDesc')}</div>
        <div className={styles.form}>
          <div className={styles.formLabel}>{t('details')}</div>
          <div className={styles.inputContainer}>
            <CustomInput
              value={nickname}
              type="text"
              icon={require('../Login/img/icon-username.png')}
              placeholder={t('username')}
              onChange={(val) => {
                setNickname(val);
              }}
            />
          </div>
          <div className={styles.inputContainer}>
            <CustomInput
              value={phone}
              type="phone"
              icon={require('./img/icon-phone.png')}
              placeholder={t('phone')}
              onChange={(val) => {
                setPhone(val);
              }}
            />
          </div>
          <div className={styles.inputContainer}>
            <CustomInput
              value={email}
              type="text"
              icon={require('./img/icon-phone.png')}
              placeholder={t('email')}
              onChange={(val) => {
                seEmail(val);
              }}
            />
          </div>
          <div className={styles.inputContainer}>
            <CustomInput
              value={newPassword}
              autoComplete="new-password"
              type="password"
              icon={require('../Login/img/icon-password.png')}
              placeholder={t('newPassword')}
              onChange={(val) => {
                setNewPassword(val);
              }}
            />
          </div>
          <div className={styles.inputContainer}>
            <CustomInput
              value={confirmPassword}
              autoComplete="new-password"
              type="password"
              icon={require('../Login/img/icon-password.png')}
              placeholder={t('confirmPassword')}
              onChange={(val) => {
                setConfirmPassword(val);
              }}
            />
          </div>
        </div>
        <div
          className={reactClassNameJoin(styles.formLabel, styles.formLabel2)}>
          Add Credit For New Downline
        </div>
        <div className={styles.balanceText}>{t('BDT')}</div>
        <div className={styles.form}>
          <div className={styles.inputContainer}>
            <CustomInput
              value={balance}
              type="number"
              icon={require('../DownlineManagement/img/icon-money-input.png')}
              placeholder={t('amountDesc')}
              onChange={(val) => {
                setMoney(val);
              }}
            />
          </div>
        </div>
        <div className={styles.btnContainer}>
          <Button
            loading={loading}
            disabled={!btnActive}
            className={styles.confirmBtn}
            onClick={addNewUserReq}>
            {t('confirm')}
          </Button>
          <Button
            className={styles.cancelBtn}
            onClick={() => {
              history.go(-1);
            }}>
            {t('cancel')}
          </Button>
        </div>
        <CustoModal
          visible={visible}
          icon={require('./img/modal-add-success.png')}
          closeOnMaskClick
          onClose={() => {
            setVisible(false);
            history.go(-1);
          }}
          content={t('downlineTitle')}
          contentDescClassName={styles.successModalDesc}
          contentDesc={
            <div className={styles.successModal}>
              {t('downlineSuccess')}
              <span className={styles.newUser}>{newUserinfo?.username}</span>
              {t('downlineSuccess2')}
              <div className={styles.newInfo}>
                <div className={styles.newInfoItem}>
                  <img src={require('../Login/img/icon-username.png')} />
                  <span>{newUserinfo?.username}</span>
                </div>
                <div className={styles.newInfoItem}>
                  <img src={require('../Login/img/icon-password.png')} />
                  <span>{newUserinfo?.password}</span>
                </div>
                <CopyToClipboard
                  text={`${newUserinfo?.username}${`\n`}${
                    newUserinfo?.password
                  }`}
                  onCopy={() => {
                    Toast.show({
                      content: t('copySuccess'),
                    });
                  }}>
                  <Button className={styles.copyBtn}>{t('copy')}</Button>
                </CopyToClipboard>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default observer(AddUser);
