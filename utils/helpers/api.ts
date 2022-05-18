import { routes } from '@utils/constants';
import { axios } from '@utils/plugins';
import { appConfig } from '@utils/configs';

export const login = async (data: ILoginDataAPI) => {
    try {
        return await axios.post<ILoginAPIRes>(`${routes.API.LOGIN.href}`, data);
    } catch (err) {
        throw err;
    }
};

export const searchData = async (params: string) => {
    const url = `search/tv?query="${params}"`;
    try {
        return await axios.get(`${appConfig.API_URL}${url}`);
    } catch (err) {
        throw err;
    }
};
