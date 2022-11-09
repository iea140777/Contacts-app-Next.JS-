import Link from "next/link";

import { useEffect, useState } from "react";

import { Button } from "antd";

import { LoginForm } from "../../components/LoginForm/LoginForm";
import { MainLayout } from "../../components/MainLayout/MainLayout";
import { setIsLoading } from "../../store/loaderSlice";
import { useLazyGetUserQuery } from "../../store/UserApi";
import { useGetUserContactsQuery } from "../../store/UserApi";
import {
  logout,
  selectUser,
  setIsAuthorized,
  setUserId,
  setUserName,
} from "../../store/userSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import styles from "./Home.module.scss";

export default function Home() {
  const dispatch = useAppDispatch();

  const { isAuthorized, userName } = useAppSelector(selectUser);

  const [isLoginFailed, setIsLoginFailed] = useState<boolean>(false);

  const {
    data: userContacts = [],
    isFetching: isGetContactsFetching,
    isError: isGetContactsrError,
  } = useGetUserContactsQuery("", { skip: !isAuthorized });

  const [
    loginUser,
    { data: loginResult, isFetching: isUserFetching, isError: isGetUserError },
  ] = useLazyGetUserQuery();

  const loginHandler = (values: { username: string; password: string }) => {
    setIsLoginFailed(false);
    dispatch(setIsAuthorized(false));
    loginUser({ email: values.username, password: values.password });
  };

  const logoutUserHandler = () => {
    dispatch(logout());
  };

  const isLoading = isUserFetching || isGetContactsFetching;

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
    } else if (!isUserFetching && loginResult && loginResult.length === 0) {
      setIsLoginFailed(true);
    }
  }, [loginResult, isUserFetching, dispatch]);

  return (
    <MainLayout>
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
        {!isAuthorized ? (
          <LoginForm loginHandler={loginHandler} />
        ) : (
          <div className={styles.container}>
            <h2> Hello, {userName}!</h2>
            <h3>
              {" "}
              Now you can manage your contacts at{" "}
              <Link href="/contacts">Contacts</Link> page
            </h3>
            {userContacts && !isGetContactsrError && (
              <h3> You have {userContacts.length} contacts at the moment</h3>
            )}
            <Button
              htmlType="button"
              onClick={logoutUserHandler}
              className={styles.button}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
