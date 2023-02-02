import {
  AccountParams,
  AccountListItem,
  AccountListGetResultModel,
  DeptListItem,
  DeptListGetResultModel,
  MenuParams,
  MenuListItem,
  MenuListGetResultModel,
  RoleParams,
  RoleListItem,
  RolePageParams,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  // AccountList = '/basic-api/system/getAccountList',
  // IsAccountExist = '/basic-api/system/accountExist',
  // DeptList = '/basic-api/system/getDeptList',
  // setRoleStatus = '/basic-api/system/setRoleStatus',
  // MenuList = '/basic-api/system/getMenuList',
  // RolePageList = '/basic-api/system/getRoleListByPage',
  // GetAllRoleList = '/basic-api/system/getAllRoleList',

  // Dept
  DeptList = '/api/workshop/sys/Dept/GetTree',
  DeptDelete = '/api/workshop/sys/Dept/Delete',
  DeptUpdate = '/api/workshop/sys/Dept/Update',
  DeptCreate = '/api/workshop/sys/Dept/Create',
  //menu
  MenuList = '/api/workshop/sys/Menu/GetTree',
  MenuDelete = '/api/workshop/sys/Menu/Delete',
  MenuUpdate = '/api/workshop/sys/Menu/Update',
  MenuCreate = '/api/workshop/sys/Menu/Create',
  // role
  RolePageList = '/api/workshop/sys/Role/GetPageList',
  RoleDelete = '/api/workshop/sys/Role/Delete',
  RoleUpdate = '/api/workshop/sys/Role/Update',
  RoleCreate = '/api/workshop/sys/Role/Create',
  setRoleStatus = '/api/workshop/sys/Role/setRoleStatus',
  GetAllRoleList = '/api/workshop/sys/Role/GetList',
  // user
  UserPageList = '/api/workshop/sys/User/GetPageList',
  UserList = '/api/workshop/sys/User/GetList',
  UserDelete = '/api/workshop/sys/User/Delete',
  UserUpdate = '/api/workshop/sys/User/Update',
  UserCreate = '/api/workshop/sys/User/Create',
  IsAccountExist = '/api/workshop/sys/User/accountExist',
  ChangePassword = '/api/workshop/sys/User/ChangePassword',
  ResetPassword = '/api/workshop/sys/User/ResetPassword',
}

// user
export const getUserPageList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.UserPageList, params });

export const getUserList = (params?: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.UserList, params });

export const deleteUser = (id: number) =>
  defHttp.delete({ url: Api.UserDelete, params: { id } }, { joinParamsToUrl: true });

export const updateUser = (params?: AccountListItem) =>
  defHttp.put({ url: Api.UserUpdate, params });

export const createUser = (params?: AccountListItem) =>
  defHttp.post({ url: Api.UserCreate, params });

export const isAccountExist = (id: string, account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { id, account } }, { errorMessageMode: 'none' });

export const changePassword = (password: string, newPassword: string) =>
  defHttp.post({ url: Api.ChangePassword, params: { password, newPassword } });

export const resetPassword = (id: number) =>
  defHttp.post({ url: Api.ResetPassword, params: { id } });

// dept
export const getDeptList = (params?: DeptListItem) => {
  return defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });
};
export const deleteDept = (id: number) =>
  defHttp.delete({ url: Api.DeptDelete, params: { id } }, { joinParamsToUrl: true });

export const updateDept = (params?: DeptListItem) => defHttp.put({ url: Api.DeptUpdate, params });

export const createDept = (params?: DeptListItem) => defHttp.post({ url: Api.DeptCreate, params });

// menu
export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

export const deleteMenu = (id: number) =>
  defHttp.delete({ url: Api.MenuDelete, params: { id } }, { joinParamsToUrl: true });

export const updateMenu = (params?: MenuListItem) => defHttp.put({ url: Api.MenuUpdate, params });

export const createMenu = (params?: MenuListItem) => defHttp.post({ url: Api.MenuCreate, params });

// role
export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const deleteRole = (id: number) =>
  defHttp.delete({ url: Api.RoleDelete, params: { id } }, { joinParamsToUrl: true });

export const updateRole = (params?: RoleListItem) => defHttp.put({ url: Api.RoleUpdate, params });

export const createRole = (params?: RoleListItem) => defHttp.post({ url: Api.RoleCreate, params });

export const setRoleStatus = (id: number, status: boolean) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });
