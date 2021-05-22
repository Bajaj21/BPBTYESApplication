import * as AppUtils from '../utils/AppUtils';

const HeaderConfig = {
    'content-type': 'application/json',
    'authorization': 'Bearer ' + AppUtils.getToken()
}

export default HeaderConfig;