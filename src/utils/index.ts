/*
 * @Descripttion: 工具类
 * @version:
 * @Author: 小白
 * @Date: 2020-10-04 13:11:40
 * @LastEditors: 小白
 * @LastEditTime: 2022-02-16 23:53:34
 */
export const setAuth = (auth: string) => {
  window.localStorage.setItem('auth', auth);
};

export const getAuth = () => {
  const auth = window.localStorage.getItem('auth');
  return auth || '';
};
export const getCode = () => {
  return window.location.search
    ? searchObj(window.location.search).code
    : window.location.pathname.split('/')[2];
};
/**
 * 获取url参数
 * @param search url参数
 */
export const searchObj = (search: string) => {
  const body = JSON.parse(
    '{"'.concat(
      decodeURIComponent(search.substring(1))
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"'),
      '"}',
    ),
  );
  return body;
};

export const treeToList = (list: any[], parents: string | string[]) => {
  let adtaList: any[] = [];
  list.forEach((v) => {
    if (typeof parents === 'string') {
      if (v[parents]) {
        adtaList = [...adtaList, ...treeToList(v[parents], parents)];
      } else {
        adtaList.push(v);
      }
    } else {
      let isHave = false;
      parents.forEach((parent) => {
        if (v[parent]) {
          adtaList = [...adtaList, ...treeToList(v[parent], parents)];
          isHave = true;
        }
      });
      if (!isHave) {
        adtaList.push(v);
      }
    }
  });
  return adtaList;
};

export const setWindowHeight = () => {
  const windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  if (typeof windowWidth !== 'number') {
    if (document.compatMode === 'CSS1Compat') {
      windowHeight = document.documentElement.clientHeight;
    } else {
      // @ts-ignore
      windowHeight = window.body.clientHeight;
    }
  }
  document
    .getElementsByTagName('body')[0]
    .style.setProperty('--height-primary', `${windowHeight}px`);
};
/**
 * 解构react的className数组
 * @param className
 */
export function reactClassNameJoin(...className: any) {
  return className.join(' ');
}

/**
 * 格式化余额
 * @param val
 * @returns
 */
export const formatBalance = (val: any) => {
  return Number(val / 1000).toFixed(2);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const formatGameId = (id: number) => {
  return id < 10 ? `00${id}` : id < 100 ? `0${id}` : id;
};

/**
 * 获取url参数
 * @param {String} paraName
 */
export const getUrlParams = (paraName: string, urlParams?: string) => {
  let url = '';
  try {
    url = urlParams ? urlParams : document.location.toString();
  } catch (error) {
    //
  }
  const arrObj = url.split('?');
  if (arrObj.length > 1) {
    const arrPara = arrObj[1].split('&');
    let arr: any;
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=', 2);
      if (arr != null && arr[0] === paraName) {
        return arr[1];
      }
    }
    return '';
  } else {
    return '';
  }
};
