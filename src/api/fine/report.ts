import { defHttp } from '/@/utils/http/axios';
enum DynamicApi {
  GetData = '/api/report/DynamicAPI/GetData',
}

export const dynamicApiGetData = (params?: any) => defHttp.get({ url: DynamicApi.GetData, params });
