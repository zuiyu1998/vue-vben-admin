import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

enum Api {
  // Login = '/basic-api/login',
  // Logout = '/basic-api/logout',
  // GetUserInfo = '/basic-api/getUserInfo',
  // GetPermCode = '/basic-api/getPermCode',
  TestRetry = '/basic-api/testRetry',
  Login = '/api/workshop/vben/VbenUser/Login',
  GetUserInfo = '/api/workshop/vben/VbenUser/GetUserInfo',
  GetPermCode = '/api/workshop/vben/VbenUser/GetPermCode',
  Logout = '/api/workshop/vben/VbenUser/LoginOut',
}

/**
 * @description: user login api
 */
// export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
//   return defHttp.post<LoginResultModel>(
//     {
//       url: Api.Login,
//       params,
//     },
//     {
//       errorMessageMode: mode,
//     },
//   );
// }
export function loginApi(params: LoginParams) {
  return defHttp.post<LoginResultModel>({ url: Api.Login, params });
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: false,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
