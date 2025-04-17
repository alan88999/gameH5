import { Picker } from 'antd-mobile';
import i18n from '@/i18n';
import { useTranslation } from 'react-i18next';
import styles from './index.module.less';

interface Props {
  visible: boolean;
  onCancel: () => void;
}

export const LanguageMap: any = {
  en: 'EN',
  bd: 'BD',
};
const LanguagePicker = (props: Props) => {
  const { visible, onCancel } = props;
  const { t} = useTranslation()
  return (
    <Picker
      value={[i18n.language]}
      className={styles.picker}
      visible={visible}
      onCancel={onCancel}
      cancelText={t('cancel')}
      confirmText={t('confirm')}
      onConfirm={(value) => {
        i18n.changeLanguage(value[0] as string);
        localStorage.setItem('lang', value[0] as string);
        window.location.reload();
      }}
      columns={[
        [
          { label: 'English', value: 'en' },
          { label: 'বাংলা', value: 'bd' },
        ],
      ]}></Picker>
  );
};

export default LanguagePicker;
