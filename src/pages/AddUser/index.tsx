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
import { reactClassNameJoin } from '@/utils';

const AddUser = () => {
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
    return nickname && phone && balance && newPassword && confirmPassword;
  }, [nickname, phone, balance, newPassword, confirmPassword]);

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
        content: 'New Password and Confirm Password must be the same',
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
        <div className={styles.desc}>
          Please insert the following details to add a new downline.
        </div>
        <div className={styles.form}>
          <div className={styles.formLabel}>Details</div>
          <div className={styles.inputContainer}>
            <CustomInput
              value={nickname}
              type="text"
              icon={require('../Login/img/icon-username.png')}
              placeholder="Usename"
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
              placeholder="Phone No."
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
              placeholder="Email"
              onChange={(val) => {
                seEmail(val);
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
        <div
          className={reactClassNameJoin(styles.formLabel, styles.formLabel2)}>
          Add Credit For New Downline
        </div>
        <div className={styles.balanceText}>(BDT)</div>
        <div className={styles.form}>
          <div className={styles.inputContainer}>
            <CustomInput
              value={balance}
              type="number"
              icon={require('../DownlineManagement/img/icon-money-input.png')}
              placeholder="Enter Amount (BDT)"
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
          icon={require('./img/modal-add-success.png')}
          closeOnMaskClick
          onClose={() => {
            setVisible(false);
            history.go(-1);
          }}
          content={'You’ve got it!'}
          contentDesc={
            <div>
              New downline{' '}
              <span className={styles.newUser}>{newUserinfo?.username}</span>
              has been created successfully.
            </div>
          }
        />
      </div>
    </div>
  );
};

export default observer(AddUser);
