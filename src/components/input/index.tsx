import { reactClassNameJoin } from '@/utils';
import { Input } from 'antd-mobile';
import { InputProps } from 'antd-mobile';
import styles from './index.module.less';

interface Props extends InputProps {
  clsasName?: string;
  icon?: string;
  [key: string]: any;
}

const CustomInput = (props: Props) => {
  const { clsasName, icon, ...rest } = props;
  return (
    <div className={reactClassNameJoin(clsasName, styles.input)}>
      {icon ? <img className={styles.icon} src={icon} /> : ''}
      <Input {...rest} />
    </div>
  );
};

export default CustomInput;
