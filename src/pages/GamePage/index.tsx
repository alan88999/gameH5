import { useEffect } from 'react';
import { getUrlParams } from '@/utils';
import { gameExit } from '@/services/api';
import styles from './index.module.less';
0;

const GamePage = () => {
  const url = localStorage.getItem('url') || '';
  const game_id = getUrlParams('game_id');
  console.log(url);
  useEffect(() => {
   return()=>{
    gameExit({ game_id: Number(game_id) });
   }
  }, []);
  return (
    <div className={styles.container}>
      <iframe id="target" className={styles.iframeBox} src={url} />
    </div>
  );
};
export default GamePage;
