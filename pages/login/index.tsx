import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import { LoginForm } from "../../components/LoginForm/LoginForm";
import { setIsLoading } from "../../store/loaderSlice";
import {
  useCreateUserMutation,
  useLoginUserMutation,
} from "../../store/UserApi";
import { setIsAuthorized, setUserId, setUserName } from "../../store/userSlice";
import { useAppDispatch } from "../../utils/hooks";
import styles from "./Login.module.scss";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLoginFailed, setIsLoginFailed] = useState<boolean>(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  const [
    loginUserMutation,
    { data: loginResult, isLoading: isLoggingIn, error },
  ] = useLoginUserMutation();

  const [
    createUserMutation,
    {
      data: createUserResult,
      isLoading: isCreatingUser,
      isError: createUserError,
    },
  ] = useCreateUserMutation();

  const loginHandler = (values: { email: string; password: string }) => {
    setIsLoginFailed(false);
    dispatch(setIsAuthorized(false));
    loginUserMutation({ email: values.email, password: values.password });
  };

  const createAccountHandler = (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    createUserMutation({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  const createNewAccount = (): void => {
    setIsNewUser(true);
    setIsLoginFailed(false);
    dispatch(setIsAuthorized(false));
  };

  useEffect(() => {
    if (isLoggingIn || isCreatingUser) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [isLoggingIn, isCreatingUser]);

  useEffect(() => {
    if (error && "status" in error && error.status === 401) {
      setIsLoginFailed(true);
    }
    if (!isLoggingIn && !isCreatingUser && (loginResult || createUserResult)) {
      if (loginResult) {
        dispatch(setIsAuthorized(true));
        dispatch(setUserId(loginResult.id));
        dispatch(setUserName(loginResult.name));
      } else if (createUserResult) {
        dispatch(setIsAuthorized(true));
        dispatch(setUserId(createUserResult.id));
        dispatch(setUserName(createUserResult.name));
      }
      router.push("/");
    }
  }, [
    loginResult,
    createUserResult,
    dispatch,
    router,
    error,
    isLoggingIn,
    isCreatingUser,
  ]);

  return (
    <div className={styles.container}>
      {isLoginFailed && (
        <h3 className={styles.warning}>
          {" "}
          Wrong username/password. Please try again.
        </h3>
      )}

      {error && "status" in error && error.status !== 401 && (
        <h3 className={styles.warning}>
          {" "}
          Something went wrong... Please try again.
        </h3>
      )}
      <h3>Please, enter your email and password to login</h3>
      <h3>
        or{" "}
        <button type="button" onClick={createNewAccount}>
          create new account
        </button>
      </h3>
      <LoginForm
        loginHandler={loginHandler}
        createAccount={createAccountHandler}
        isNewUser={isNewUser}
      />
    </div>
  );
}
