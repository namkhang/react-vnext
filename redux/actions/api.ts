import { Dispatch } from 'redux';
import { AxiosError, AxiosResponse } from 'axios';

import { authHelper, apiHelper } from '@utils/helpers';

import { SET_LOADER } from '@redux/actions/type';

export const setLoader = (data: boolean = false) => {
    return {
        type: SET_LOADER,
        data,
    };
};

export const fetchLogin = async (
    data: ILoginDataAPI,
    callBack?: (result: ILoginAPIRes | IErrorAPIRes | null) => void,
    isLoad: boolean = false,
) => {
    return async (dispatch: Dispatch) => {
        if (isLoad) {
            dispatch(setLoader(true));
        }

        try {
            const res = await apiHelper.login(data);
            authHelper.setAccessToken(res.data.access_token ?? '');
            if (callBack) {
                callBack(res?.data);
            }
        } catch (err) {
            if (!(err instanceof Error)) {
                const res = err as AxiosResponse<IErrorAPIRes, AxiosError>;
                if (callBack) {
                    callBack(res?.data);
                }
            }
        }

        if (isLoad) {
            dispatch(setLoader(false));
        }
    };
};


export const actionSearchData = (value : string) => (dispatch : Dispatch) => {
        apiHelper
        .searchData(value)
        .then((res) => {
            console.log(res.data);
            dispatch({
                type : 'SEARCH_DATA',
                data : res?.data?.results.slice( 0 , 12)
            })
        
        })
        .catch((err) => {
            return err;
        }); 

}


export const actionLoadMoreData = (value : any , step : number) => (dispatch : Dispatch) => {
    apiHelper
    .searchData(value)
    .then((res) => {
        dispatch({
            type : 'LOAD_MORE_DATA',
            data : res?.data?.results.slice(step * 12  ,(step * 12) + 12)
    
    }) })
    .catch((err) => {
        return err;
    }); 

}
