// 將所有的模組都匯入
import * as product from '~/api/v1/product.js'
import * as firGateway from '~/api/v1/fir-gateway.js'
import * as setting from '~/api/v1/setting.js'
import * as claim from '~/api/v1/claim.js'
import * as apiTrigger from '~/api/v1/api-trigger.js'
import * as auth from '~/api/v1/auth.js'
import * as policy from '~/api/v1/policy.js'

// 將所有模組放進一個物件
const modules = {
  ...product,
  ...firGateway,
  ...setting,
  ...claim,
  ...apiTrigger,
  ...auth,
  ...policy,
}

// 預設匯出一個函數，並回傳包含所有模組的物件
export default {
  ...modules,
}
