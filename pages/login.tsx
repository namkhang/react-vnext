import { LoginForm } from '@components/index';

import { ILoginPageProps, ILoginPage } from '@interfaces/pages/login';

const LoginPage: ILoginPage<ILoginPageProps> = () => {
    return (
        <div className="pages__login container">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
