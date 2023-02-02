import { defHttp } from '/@/utils/http/axios';
enum Api {
  MachineTypeList = '/api/workshop/basedata/MachineType/GetList',
}

export const machineTypeList = (params?: any) =>  defHttp.get({ url: Api.MachineTypeList, params });


