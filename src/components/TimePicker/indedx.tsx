import { DatePicker } from 'antd-mobile';
import { useState } from 'react';
import dayjs from 'dayjs';
import styles from './index.module.less';
import { useTranslation } from 'react-i18next';
interface Props {
  value: any;
  onChange: (val: any) => void;
}

const TimePicker = (props: Props) => {
  const { t } = useTranslation();
  const { value, onChange } = props;
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className={styles.pickerConatiner} onClick={() => setVisible(true)}>
        <img className={styles.icon} src={require('./img/icon-calendar.png')} />
        <span>{dayjs(value).format('MM/DD,YYYY')}</span>
        <img
          className={styles.arrow}
          src={require('../../pages/Home/img/arrow_down.png')}
        />
      </div>
      <DatePicker
        cancelText={t('cancel')}
        confirmText={t('confirm')}
        className={styles.datePicker}
        value={value}
        visible={visible}
        onCancel={() => setVisible(false)}
        onConfirm={(val) => {
          onChange(val);
          setVisible(false);
        }}
      />
    </>
  );
};

export default TimePicker;
