import { defHttp } from '/@/utils/http/axios';

export const workOrderGetPage = (params?: any) =>
  defHttp.get({ url: '/api/workshop/produce/WorkOrder/GetPageList', params });

export const workOrderDelete = (id: number) =>
  defHttp.delete(
    { url: '/api/workshop/produce/WorkOrder/Delete', params: { id } },
    { joinParamsToUrl: true },
  );

export const workOrderUpdate = (params?: any) =>
  defHttp.put({ url: '/api/workshop/produce/WorkOrder/Update', params });

export const workOrderCreate = (params?: any) =>
  defHttp.post({ url: '/api/workshop/produce/WorkOrder/Create', params });

export const workOrderSetStatus = (params?: any) =>
  defHttp.post({ url: '/api/workshop/produce/WorkOrder/setStatus', params });
