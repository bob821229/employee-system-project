
import { useMsgStore } from '@/stores/msg.store';

/** 刪除post多於欄位(針對儲存會存多餘欄位給後端會req錯) */
const fieldsRegular = (data) => {
  // 定義需要過濾的欄位名稱
  const redFields = ['createdDate', 'createdBy', 'lastModifiedDate', 'lastModifiedBy'];
  if (data && typeof data === 'object') {
  // 檢查 data 是否包含所有需要過濾的欄位
  const hasAllFields = redFields.every(field => field in data);
  // 僅在包含所有需要過濾的欄位時才進行刪除
  if (hasAllFields) {
    redFields.forEach(field => {
      delete data[field];
    });
  }
  }
  // 返回刪除不必要欄位後的物件
  return data;
};
// API http 方法
export const apiMethods = (type, url, request, data = null) => {
  switch (type) {
    case 'get':
      return request.get(url, { params: data });
    case 'post':
      return request.post(url, fieldsRegular(data));
    case 'put':
      return request.put(url, data);
    case 'patch':
      return request.patch(url, data);
    case 'del':
      return request.delete(url);
    default:
      throw new Error(`Unsupported request type: ${type}`);
  }
};

// axios錯誤處理及動作
export const handleError = (error) => {
  const msgStore = useMsgStore();
  // ?. 為一組
  // 可選鏈結運算符 白話說: 
  // Check if error.response has a value, and if so, proceed to check the next value (error.response.data). If this value is false or doesn't exist, return undefined. If it have a value, continue checking further down.
  // 好處，確認槽狀物建格式內部資料的簡寫
  if (error.response?.data?.detail) {
      const code = parseInt(error.response.status);
      // console.log(code)
      // console.log(error.response)
      const body = error.response.data;
      // console.log(body)
      let msg = `【CODE:${body.code}】 ${body.message}`;
      let desc = handleDesc(body, error);
      const traceId = error?.response?.headers['x-trace-id'];
      let responseInfo = error?.response;
      switch (code) {
          case 400:
          case 401:
              msgStore.showMsg({ type: 'warning', msg, desc, traceId, responseInfo });
              break;
          default:
              msgStore.showMsg({ type: 'error', msg, desc, traceId, responseInfo });
      }
      if (error.response.trace && error.response.trace.length > 0) {
          console.error(error.response.trace);
      }
  } else if (error.name === 'AxiosError' && !error.response?.data?.detail) {
      msgStore.showMsg({ type: 'error', msg: `【AxiosError:${error.code}】`, desc: error.message });
  } else {
      // console.log(error, typeof error);
      msgStore.showMsg({ type: 'error', msg: error });
  }
};

export const handleDesc = (body, error) => {
  if (body.details) {
    return body.details?.map(d => {
        if (d.code === 'field_error') {
            return `【${error.config?.fieldDef?.[d.field] || d.field}】 ${d.message}`;
        } else if (d.code) {
            return `【${d.code}】 ${d.message}`;
        } else {
            return d.message;
        }
    });
  } else {
      return body.path;
  }
};
