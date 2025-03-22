import service from './request';

/** 获取币种列表 GET /currency/list */
export async function getCurrencyList() {
  return service.get('/bo/api/v1/currency/list');
}

/** 获取当前的用户 GET /user/query/info */
export async function getCurrentUserInfo() {
  return service.get('/bo/api/v1/user/query/info');
}

/** 登录接口 POST /user/login */
export async function login(params: any) {
  return service.post('/bo/api/v1/user/login', params);
}

/** 登出接口 POST /user/logout */
export async function logout(params: any) {
  return service.post('/bo/api/v1/user/logout', params);
}

/** 修改密码 POST /user/modify/password */
export async function changePassword(params: any) {
  return service.post('/bo/api/v1/user/modify/password', params);
}

/** 获取transaction列表 POST /transaction/list */
export async function getTransactionList(params: any) {
  return service.post('/bo/api/v1/transaction/list', params);
}

/** 获取log列表 POST /user/list/ */
export async function getLogs(params: any) {
  return service.get('/bo/api/v1/user/list', params);
}

/** 获取游戏分类列表 GET /games/categories/ */
export async function getGameCategoryList(params: any) {
  return service.get('/bo/api/v1/games/categories', params);
}

/** 获取游戏列表 POST /games/search/ */
export async function getGameList(params: any) {
  return service.post('/bo/api/v1/games/search', params);
}

/** 进入游戏 POST /games/enter/ */
export async function gameEnter(params: any) {
  return service.post('/bo/api/v1/games/enter', params);
}

/** 退出游戏 POST /games/exit/ */
export async function gameExit(params: any) {
  return service.post('/bo/api/v1/games/exit', params);
}