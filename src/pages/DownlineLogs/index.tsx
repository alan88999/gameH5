import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Header from '@/components/header';
import styles from './index.module.less';
import { reactClassNameJoin } from '@/utils';

const DownlineLogs = () => {
  return (
    <div className={styles.container}>
      <Header title="Downline Logs" />

    </div>
  );
};

export default observer(DownlineLogs);
