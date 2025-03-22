import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Header from '@/components/header';
import Balance from '@/components/balance';
import styles from './index.module.less';
import { reactClassNameJoin } from '@/utils';

const DownlineDetail = () => {
  return (
    <div className={styles.container}>
      <Header title={''} right={<Balance />} />

    </div>
  );
};

export default observer(DownlineDetail);
