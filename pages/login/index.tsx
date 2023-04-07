import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import { LoginForm } from "../../components/LoginForm/LoginForm";
import { setIsLoading } from "../../store/loaderSlice";
import { useLoginUserMutation } from "../../store/UserApi";
import { setIsAuthorized, setUserId, setUserName } from "../../store/userSlice";
import { useAppDispatch } from "../../utils/hooks";
import styles from "./Login.module.scss";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLoginFailed, setIsLoginFailed] = useState<boolean>(false);

  const [
    loginUserMutation,
    { data: loginResult, isLoading: isLoggingIn, error },
  ] = useLoginUserMutation();

  const loginHandler = (values: { email: string; password: string }) => {
    setIsLoginFailed(false);
    dispatch(setIsAuthorized(false));
    loginUserMutation({ email: values.email, password: values.password });
  };

  useEffect(() => {
    if (isLoggingIn) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [isLoggingIn]);

  useEffect(() => {
    if (error && "status" in error && error.status === 401) {
      console.log(error);
      setIsLoginFailed(true);
    }
    if (!isLoggingIn && loginResult) {
      dispatch(setIsAuthorized(true));
      dispatch(setUserId(loginResult.id));
      dispatch(setUserName(loginResult.name));
      router.push("/");
    }
  }, [loginResult, dispatch, router, error, isLoggingIn]);

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

      <LoginForm loginHandler={loginHandler} />
    </div>
  );
}
