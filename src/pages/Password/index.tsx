import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Header from '@/components/header';
import Button from '@/components/button';
import styles from './index.module.less';
import { changePassword } from '@/services/api';
import CustomInput from '@/components/input';
import history from '@/utils/history';
import globalStore from '@/store/global.store';
import { Toast } from 'antd-mobile';

const Pssword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
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
    changePassword({
      user_id: userInfo.id,
      current_password: currentPassword,
      password: newPassword,
    })
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
          if (res.data.code === 200) {
            Toast.show({
              content: 'Change Successfully',
              afterClose: () => {
                history.go(-1);
              },
            });
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
          disabled={!confirmPassword || !currentPassword || !newPassword}
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
    </div>
  );
};

export default observer(Pssword);
