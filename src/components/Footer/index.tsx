import history from '@/utils/history';
import { useLocation, matchPath } from 'react-router-dom';
import { TabBarList } from '@/routers';
import styles from './index.module.less';
import { Toast } from 'antd-mobile';

const Footer = () => {
  const location = useLocation();
  const isTabBar =
    TabBarList.findIndex((i) => i.path === location.pathname) !== -1 ||
    location.pathname === '/';
  return (
    <div
      className={`${styles.tabBar} flex  justify-center items-center ${
        isTabBar ? styles.in_page : styles.out_page
      }`}>
      {TabBarList.map(({ title, path, icon }) => (
        <div
          className={`flex flex-col justify-center items-center ${
            styles.tabBarItem
          } ${location.pathname === path ? styles.chooseed : ''}`}
          key={title}
          onClick={() => {
            if (path === '/support') {
              Toast.show({ content: 'please wait...' });
              return;
            }
            history.push(path);
          }}>
          <img className={styles.icon} src={icon} />
          <span>{title}</span>
        </div>
      ))}
    </div>
  );
};

export default Footer;
