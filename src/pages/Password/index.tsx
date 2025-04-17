import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Header from '@/components/header';
import Button from '@/components/button';
import styles from './index.module.less';
import { changePassword } from '@/services/api';
import CustomInput from '@/components/input';
import CustoModal from '@/components/CustomModal';
import history from '@/utils/history';
import globalStore from '@/store/global.store';
import { Toast } from 'antd-mobile';
import { getUrlParams } from '@/utils';
import { useTranslation } from 'react-i18next';

const Pssword = () => {
  const { t } = useTranslation();
  const id = Number(getUrlParams('id'));
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { userInfo } = globalStore;

  const changePasswordReq = () => {
    if (loading) {
      return;
    }
    if (newPassword !== confirmPassword) {
      Toast.show({
        content: 'New Password and Confirm Password must be the same',
      });
      return;
    }
    setLoading(true);
    let params: any = {
      user_id: userInfo.id,
      password: newPassword,
    };
    if (id) {
      params.user_id = id;
    } else {
      params.current_password = currentPassword;
    }
    changePassword(params)
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
          if (res.data.code === 200) {
            setVisible(true);
            setTimeout(() => {
              setVisible(false);
              history.go(-1);
            }, 2000);
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
      <Header title={t('changePassword')} />
      <div className={styles.desc}>
        {t('changePasswordDesc')}
      </div>
      <div className={styles.form}>
        {id ? (
          ''
        ) : (
          <div className={styles.inputContainer}>
            <CustomInput
              type="password"
              value={currentPassword}
              icon={require('../Login/img/icon-password.png')}
              placeholder={t('currentPassword')}
              onChange={(val) => {
                setCurrentPassword(val);
              }}
            />
          </div>
        )}
        <div className={styles.inputContainer}>
          <CustomInput
            value={newPassword}
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
            type="password"
            icon={require('../Login/img/icon-password.png')}
            placeholder={t('confirmPassword')}
            onChange={(val) => {
              setConfirmPassword(val);
            }}
          />
        </div>
      </div>
      <div className={styles.btnContainer}>
        <Button
          loading={loading}
          disabled={
            !confirmPassword || (id ? false : !currentPassword) || !newPassword
          }
          className={styles.confirmBtn}
          onClick={changePasswordReq}>
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
        icon={require('../DownlineDetail/img/modal-password-done.png')}
        closeOnMaskClick
        onClose={() => {
          setVisible(false);
          history.go(-1);
        }}
        content={'It’s done!'}
        contentDesc={
          'Your password has been changed successfully for this player.'
        }
      />
    </div>
  );
};

export default observer(Pssword);
