import { defHttp } from '/@/utils/http/axios';

export const taskGetPage = (params?: any) =>
  defHttp.get({ url: '/api/workshop/basedata/Task/GetPageList', params });

export const taskDelete = (id: number) =>
  defHttp.delete(
    { url: '/api/workshop/basedata/Task/Delete', params: { id } },
    { joinParamsToUrl: true },
  );

export const taskUpdate = (params?: any) =>
  defHttp.put({ url: '/api/workshop/basedata/Task/Update', params });

export const taskCreate = (params?: any) =>
  defHttp.post({ url: '/api/workshop/basedata/Task/Create', params });

export const taskSetStatus = (params?: any) =>
  defHttp.post({ url: '/api/workshop/basedata/Task/setStatus', params });
