import { defHttp } from '/@/utils/http/axios';

export const tagGetPage = (params?: any) =>
  defHttp.get({ url: '/api/workshop/produce/tag/GetPageList', params });

export const tagDelete = (id: number) =>
  defHttp.delete(
    { url: '/api/workshop/produce/tag/Delete', params: { id } },
    { joinParamsToUrl: true },
  );

export const tagUpdate = (params?: any) =>
  defHttp.put({ url: '/api/workshop/produce/tag/Update', params });

export const tagCreate = (params?: any) =>
  defHttp.post({ url: '/api/workshop/produce/tag/Create', params });

export const tagSetStatus = (params?: any) =>
  defHttp.post({ url: '/api/workshop/produce/tag/setStatus', params });

export const tagSetMonitor = (params?: any) =>
  defHttp.post({ url: '/api/workshop/produce/tag/setMonitor', params });

export const tagTypeGetPage = (params?: any) =>
  defHttp.get({ url: '/api/workshop/produce/tagType/GetPageList', params });

export const tagTypeDelete = (id: number) =>
  defHttp.delete(
    { url: '/api/workshop/produce/tagType/Delete', params: { id } },
    { joinParamsToUrl: true },
  );

export const tagTypeUpdate = (params?: any) =>
  defHttp.put({ url: '/api/workshop/produce/tagType/Update', params });

export const tagTypeCreate = (params?: any) =>
  defHttp.post({ url: '/api/workshop/produce/tagType/Create', params });

export const tagTypeSetStatus = (params?: any) =>
  defHttp.post({ url: '/api/workshop/produce/tagType/setStatus', params });

export const tagDataTypeGetPage = (params?: any) =>
  defHttp.get({ url: '/api/workshop/produce/tagDataType/GetPageList', params });

export const tagDataTypeDelete = (id: number) =>
  defHttp.delete(
    { url: '/api/workshop/produce/tagDataType/Delete', params: { id } },
    { joinParamsToUrl: true },
  );

export const tagDataTypeUpdate = (params?: any) =>
  defHttp.put({ url: '/api/workshop/produce/tagDataType/Update', params });

export const tagDataTypeCreate = (params?: any) =>
  defHttp.post({ url: '/api/workshop/produce/tagDataType/Create', params });

export const tagDataTypeSetStatus = (params?: any) =>
  defHttp.post({ url: '/api/workshop/produce/tagDataType/setStatus', params });
