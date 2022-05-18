import { createRef, useState } from 'react';

import Validator from '@components/commons/Validator';
import Input from '@components/commons/Input';
import Select from '@components/commons/Select';
import Button from '@components/commons/Button';

import { useDispatch } from 'react-redux';
import { setModal } from '@redux/actions';

import { useTrans } from '@utils/hooks';
import { validateHelper } from '@utils/helpers';
import { enums } from '@utils/constants';

const LoginForm: ILoginComponent<ILoginComponentProps> = () => {
    const trans = useTrans();
    const dispatch = useDispatch();
    const [state, setState] = useState<ILoginComponentState>({
        email: '',
        password: '',
    });
    const { email, password } = state;
    const emailValidatorRef = createRef<IValidatorComponentHandle>();
    const passwordValidatorRef = createRef<IValidatorComponentHandle>();

    const submitForm = () => {
        let isValidate = true;

        emailValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(email ?? '')) {
            emailValidatorRef?.current?.onValidateMessage('Empty');
            isValidate = false;
        } else if (!validateHelper.isEmail(email ?? '')) {
            emailValidatorRef?.current?.onValidateMessage('Email Invalid');
            isValidate = false;
        }

        passwordValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(password ?? '')) {
            passwordValidatorRef?.current?.onValidateMessage('Empty');
            isValidate = false;
        } else if ((password ?? '').length < 8) {
            passwordValidatorRef?.current?.onValidateMessage('Password Invalid');
            isValidate = false;
        }

        if (isValidate) {
            dispatch(
                setModal({
                    isShow: true,
                    title: 'Login Success',
                    content: (
                        <div>
                            Email: {email} Password: {password}
                        </div>
                    ),
                    buttonText: trans.common.ok,
                }),
            );
        }
    };

    const handleOnChange = (field: string, value: string | number | null) => {
        setState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    return (
        <div>
            <div className="mb-3">
                <Validator ref={emailValidatorRef}>
                    <Input
                        name="email"
                        type="text"
                        value={email}
                        placeholder="Enter email"
                        onChange={(value: string) => handleOnChange('email', value)}
                    />
                </Validator>
            </div>
            <div className="mb-3">
                <Validator ref={passwordValidatorRef}>
                    <Input
                        name="email"
                        type="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={(value: string) => handleOnChange('password', value)}
                    />
                </Validator>
            </div>
            <div className="mb-3">
                <Select
                    options={[
                        {
                            value: enums.ROLE.ADMIN.toString(),
                            label: 'Admin',
                        },
                        {
                            value: enums.ROLE.MOD.toString(),
                            label: 'Mod',
                        },
                    ]}
                />
            </div>
            <Button onClick={() => submitForm()} buttonText="Login" />
        </div>
    );
};

export default LoginForm;
