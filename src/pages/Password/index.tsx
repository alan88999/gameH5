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

const Pssword = () => {
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
      <Header title="Change Pssword" />
      <div className={styles.desc}>
        Please insert your new password and confirm the password.
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
              placeholder="Current Password"
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
            placeholder="New Password"
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
            placeholder="Confirm Password"
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
          Confirm
        </Button>
        <Button
          className={styles.cancelBtn}
          onClick={() => {
            history.go(-1);
          }}>
          Cancel
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
