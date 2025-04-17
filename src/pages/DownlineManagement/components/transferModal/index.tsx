import { useEffect, useState } from 'react';
import { transfer } from '@/services/api';
import CustomInput from '@/components/input';
import CustoModal from '@/components/CustomModal';
import styles from './index.module.less';
import { Toast } from 'antd-mobile';
import { useTranslation } from 'react-i18next';

interface Props {
  item: any;
  type: string;
  isTopUp: boolean;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
const TranferModal = (props: Props) => {
  const { isTopUp, visible, item, type, onClose, onSuccess } = props;
  const [money, setMoney] = useState('');
  const [insufficientVisible, setInsufficientVisible] = useState(false);
  const {t}  =useTranslation();
  useEffect(()=>{
    if(!visible) {
        setMoney('')
    }
  },[visible])
  const tranferReq = () => {
    if(!money) {
      return;
    }
    Toast.show({
      icon: 'loading',
    });
    transfer({
      user_id: item.id, // 转账的对象用户Id， transfer trage of user id.
      amount: Number(money) * 1000, // transfer real amount * 1000
      transfer_type: isTopUp ? 1 : 2, // 1 fund in 2 fund out
      type: type === 'player' ? 1 : 2, // 1 agent to player  2. agent to agent
    })
      .then((res) => {
        if (res.data.code === 200) {
          onSuccess();
        } else {
          if (res.data.code === 201) {
            setInsufficientVisible(true);
          } else {
            Toast.show({
              content: res.data.msg,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        Toast.clear();
      });
  };

  const renderContent = (item: any) => {
    return (
      <div className={styles.modalContent}>
        <div className={styles.title}>{isTopUp ? t('topUp') : t('withdraw')}</div>
        <div className={styles.desc}>
          Please enter the amount that you wish to {isTopUp?'top up':'withdraw'} for downline below:
        </div>
        <div className={styles.idText}>ID: {item.id}</div>
        <div className={styles.inputContainer}>
          <div className={styles.text}>{t('BDT')}</div>
          <CustomInput
            clsasName={styles.input}
            value={money}
            onChange={(val) => setMoney(val)}
            type="number"
            icon={require('../../img/icon-money-input.png')}
            placeholder={t('amountDesc')}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <CustoModal
        visible={visible}
        onClose={onClose}
        closeOnMaskClick
        contentInnerClassName={styles.contentInner}
        icon={
          isTopUp
            ? require('../../img/icon-topup.png')
            : require('../../img/icon-withdraw.png')
        }
        content={renderContent(item)}
        footer={{
          onOk: tranferReq,
          onCancel: onClose,
        }}
      />
      <CustoModal
        visible={insufficientVisible}
        onClose={() => {
          setInsufficientVisible(false);
        }}
        closeOnMaskClick
        icon={require('../../img/icon-insufficient.png')}
        content={'Insufficient Fund'}
        contentDesc="We are sorry, the amount that you have entered is exceeded the balance you currently posses."
      />
    </>
  );
};

export default TranferModal;
