import { defHttp } from '/@/utils/http/axios';
enum Api {
  HealthyModelPageList = '/api/workshop/equ/HealthyModel/GetTree',
  HealthyModelDelete = '/api/workshop/equ/HealthyModel/Delete',
  HealthyModelUpdate = '/api/workshop/equ/HealthyModel/Update',
  HealthyModelCreate = '/api/workshop/equ/HealthyModel/Create',
}

export const getPageHealthyModel = (params?: any) =>
  defHttp.get({ url: Api.HealthyModelPageList, params });

export const deleteHealthyModel = (id: number) =>
  defHttp.delete({ url: Api.HealthyModelDelete, params: { id } }, { joinParamsToUrl: true });

export const updateHealthyModel = (params?: any) =>
  defHttp.put({ url: Api.HealthyModelUpdate, params });

export const createHealthyModel = (params?: any) =>
  defHttp.post({ url: Api.HealthyModelCreate, params });
