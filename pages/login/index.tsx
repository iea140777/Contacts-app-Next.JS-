import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import { LoginForm } from "../../components/LoginForm/LoginForm";
import { setIsLoading } from "../../store/loaderSlice";
import { useLazyGetUserQuery } from "../../store/UserApi";
import { setIsAuthorized, setUserId, setUserName } from "../../store/userSlice";
import { useAppDispatch } from "../../utils/hooks";
import styles from "./Login.module.scss";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLoginFailed, setIsLoginFailed] = useState<boolean>(false);

  const [
    loginUser,
    { data: loginResult, isFetching: isUserFetching, isError: isGetUserError },
  ] = useLazyGetUserQuery();

  const loginHandler = (values: { username: string; password: string }) => {
    setIsLoginFailed(false);
    dispatch(setIsAuthorized(false));
    loginUser({ email: values.username, password: values.password });
  };

  const isLoading = isUserFetching;

  useEffect(() => {
    if (isLoading) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isUserFetching && loginResult && loginResult.length === 1) {
      dispatch(setIsAuthorized(true));
      dispatch(setUserId(loginResult[0].id));
      dispatch(setUserName(loginResult[0].name));
      router.push("/contacts");
    } else if (!isUserFetching && loginResult && loginResult.length === 0) {
      setIsLoginFailed(true);
    }
  }, [loginResult, isUserFetching, dispatch, router]);

  return (
    <div className={styles.container}>
      {isLoginFailed && (
        <h3 className={styles.warning}>
          {" "}
          Wrong username/password. Please try again.
        </h3>
      )}
      {isGetUserError && (
        <h3 className={styles.warning}>
          {" "}
          Something went wrong... Please try again.
        </h3>
      )}
      <LoginForm loginHandler={loginHandler} />
    </div>
  );
}
