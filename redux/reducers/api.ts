import { SET_LOADER } from '@redux/actions/type';

const loaderReducer = (state: boolean = false, action: ILoaderReduxAction) => {
    switch (action.type) {
        case SET_LOADER:
            return action.data;
        default:
            return state;
    }
};


const searchReducer = (state: any = [], action: ILoaderReduxAction) => {
    switch (action.type) {
        case 'SEARCH_DATA':
            console.log('hello');
            return action.data;
        case 'LOAD_MORE_DATA' : 
            let data : any  = action.data
            return [...state , ...data]
        default:
            return state;
    }
};

export { loaderReducer , searchReducer };
