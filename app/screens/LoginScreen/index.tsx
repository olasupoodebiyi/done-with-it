import React, { useState } from 'react';
import { Image } from 'react-native';
import { ApiResponse } from 'apisauce';

import {
    AppForm,
    ErrorMessage,
    FormField,
    SubmitButton
} from '../../shared/forms';
import Screen from '../../shared/Screen';
import validationSchema from './validationSchema';
import auth from './api';
import { useAuthContext } from '../../auth/context';
import UserCredentials from './model';
import styles from './styles';

export default function LoginScreen() {
    const { login } = useAuthContext();
    const [loginFailed, setLoginFailed] = useState(false);

    const handleSubmit = async ({ email, password }: UserCredentials) => {
        const result: ApiResponse<any> = await auth.login(email, password);
        if (!result.ok) {
            setLoginFailed(true);
            return;
        }
        setLoginFailed(false);
        login(result.data);
    };

    return (
        <Screen style={styles.container}>
            <Image
                source={require('../assets/logo-red.png')}
                style={styles.logo}
            />
            <AppForm
                initialValues={{ email: '', password: '' }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}>
                <ErrorMessage
                    error="Invalid email and/or password"
                    visible={loginFailed}
                />
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="email"
                    placeholder="Email"
                    textContentType="emailAddress"
                />
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="password"
                    placeholder="password"
                    secureTextEntry
                    textContentType="password"
                />
                <SubmitButton title="Login" />
            </AppForm>
        </Screen>
    );
}
