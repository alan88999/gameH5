import { reactClassNameJoin } from '@/utils';
import styles from './index.module.less';

interface Props {
  userinfo: any;
  className?: string;
}

const Avatar = (props: Props) => {
  const { className } = props;
  return (
    <div className={reactClassNameJoin(styles.avatar, className)}>
      <img src={require('./img/avatar-1.png')} />
    </div>
  );
};

export default Avatar;
