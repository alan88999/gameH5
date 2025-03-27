import { useState, useEffect, useRef } from 'react';
import { Toast } from 'antd-mobile';
import Balance from '@/components/balance';
import styles from './index.module.less';
import history from '@/utils/history';
import CustomInput from '@/components/input';
import globalStore from '@/store/global.store';
import { getGameCategoryList, getGameList, gameEnter } from '@/services/api';
import { formatGameId, reactClassNameJoin } from '@/utils';
import { CategoriesMap, Hot } from './constan';

let timer = 0;
const Home = () => {
  const { refreshUserInfo } = globalStore;
  const timerRef = useRef(0);
  const [sortDesc, setSortDesc] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [categoryCurrent, setCategoryCurrent] = useState(Hot);
  const [categoryList, setCategoryList] = useState([Hot]);
  const [gameList, setGameList] = useState<any>([]);
  const gameEnterReq = (game_id: number) => {
    const loadingToast = Toast.show({
      icon: 'loading',
    });
    gameEnter({ game_id })
      .then((res) => {
        if (res.data.code === 200) {
          localStorage.setItem('url', res.data.data);
          history.push(`/gamePage?game_id=${game_id}`);
        }
      })
      .finally(() => {
        loadingToast.close();
      });
  };
  const getCategoryList = () => {
    getGameCategoryList({}).then((res) => {
      if (res.data.code === 200) {
        // @ts-ignore
        setCategoryList(categoryList.concat(res.data.data || []));
      }
    });
  };
  const getGameListReq = () => {
    getGameList({
      category: categoryCurrent.category,
      name: searchValue,
      sort: sortDesc ? 2 : 1,
      hot: categoryCurrent.category === Hot.category,
    }).then((res) => {
      if (res.data.code === 200) {
        setGameList(res.data.data || []);
      }
    });
  };
  useEffect(() => {
    // 10秒内 每2秒钟调用一次用户信息接口
    timer = window.setInterval(() => {
      if (timerRef.current === 10) {
        window.clearInterval(timer);
        return;
      }
      timerRef.current = timerRef.current + 2;
      refreshUserInfo();
    }, 2000);
    localStorage.removeItem('url');
    getCategoryList();
    return () => {
      window.clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    getGameListReq();
  }, [categoryCurrent, sortDesc, searchValue]);
  const renderCategory = () => {
    return (
      <div className={styles.category}>
        {categoryList.map((item: any, index) => {
          return (
            <div
              key={index}
              className={reactClassNameJoin(
                styles.categoryItem,
                categoryCurrent.type === item.type ? styles.active : '',
              )}
              onClick={() => setCategoryCurrent(item)}>
              <img
                src={
                  new URL(
                    `./img/icon_${
                      item.type === 'slot/arcade' ? 'arcade' : item.type
                    }.png`,
                    import.meta.url,
                  ).href
                }
                alt=""
              />
              {CategoriesMap[item.type]}
            </div>
          );
        })}
      </div>
    );
  };
  const renderGameList = () => {
    console.log(categoryCurrent);
    return (
      <div className={styles.gameList}>
        <div className={styles.gameTitle}>
          {CategoriesMap[categoryCurrent.type]} Games
        </div>
        <div className={styles.gameUl}>
          {gameList.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={styles.gameItem}
                onClick={() => {
                  gameEnterReq(item.game_id);
                  // history.push('/gamePage');
                }}>
                <div>
                  <img
                    className={styles.gameLogo}
                    src={
                      new URL(
                        `./gameIcon/JL_300x300_GameID${formatGameId(
                          item.game_id,
                        )}_en-US.png`,
                        import.meta.url,
                      ).href
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <img className={styles.menu} src={require('./img/btn_menu.png')} />
          <img className={styles.logo} src={require('./img/logo.png')} />
        </div>
        <Balance />
      </div>
      <div className={styles.content}>
        <div className={styles.topHeader}>
          <div className={styles.filterContainer}>
            <div className={styles.search}>
              <CustomInput
                value={searchValue}
                onChange={(val) => setSearchValue(val)}
                clsasName={styles.searchInput}
                placeholder="search"
                icon={require('./img/icon_search.png')}
              />
            </div>
            <div className={styles.sort}>
              <img
                className={styles.sortIcon}
                src={require('./img/icon_sort.png')}
              />
              <span>{sortDesc ? 'Z-A' : 'A-Z'}</span>
              <img
                className={reactClassNameJoin(
                  styles.arrowIcon,
                  sortDesc ? styles.desc : '',
                )}
                src={require('./img/arrow_down.png')}
                onClick={() => {
                  setSortDesc(!sortDesc);
                }}
              />
            </div>
          </div>
          {renderCategory()}
        </div>
        <div className={styles.gameListConatiner}>{renderGameList()}</div>
      </div>
    </div>
  );
};
export default Home;
