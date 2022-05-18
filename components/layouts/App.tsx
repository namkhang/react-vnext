import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Modal from '@components/layouts/Modal';

import { useDispatch } from 'react-redux';
import { setLocale, setModal } from '@redux/actions';

const App: IAppComponent<IAppComponentProps> = (props) => {
    const { children } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    const [state, setState] = useState<IAppComponentState>({
        reloadKey: 0,
        historyPathname: router.pathname,
    });
    const { reloadKey } = state;
    const { locale, pathname } = router;

    useEffect(() => {
        window.addEventListener('popstate', onBackButtonEvent);

        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);
        };
    }, []);

    useEffect(() => {
        handleScrollToTop();
        setState((prevState) => ({
            ...prevState,
            historyPathname: pathname,
        }));
    }, [pathname]);

    useEffect(() => {
        dispatch(setLocale(locale));
    }, [locale]);

    const onBackButtonEvent = () => {
        dispatch(setModal({ isShow: false }));
        handleScrollToTop();
    };

    const handleScrollToTop = () => {
        document.documentElement.style.scrollBehavior = 'auto';
        setTimeout(() => window.scrollTo(0, 0), 5);
    };

    return (
        <div key={reloadKey} className="components__app">
            <Modal />
            {children}
        </div>
    );
};

export default App;
