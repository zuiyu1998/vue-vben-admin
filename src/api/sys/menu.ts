import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/api/workshop/vben/VbenMenu/getMenuList',
  GetCurrentMenu='/api/workshop/vben/VbenMenu/getCurrentMenu'
}
/**
 * @description: Get user menu based on id
 */
export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};

export const getCurrentMenu = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetCurrentMenu });
};
