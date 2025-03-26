import history from '@/utils/history';
import styles from './index.module.less';

interface Props {
  title: string;
  right?: any;
  onBack?: () => void;
}
const Header = (props: Props) => {
  const { title, right, onBack } = props;
  return (
    <div className={styles.header}>
      <div
        className={styles.left}
        onClick={() => {
          onBack ? onBack() : history.go(-1);
        }}>
        <img src={require('./img/btn-back.png')} />
      </div>
      <div className={styles.center}>{title}</div>
      <div className={styles.right}>{right ? right : ''}</div>
    </div>
  );
};

export default Header;
