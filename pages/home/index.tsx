import Link from "next/link";

import { useEffect, useState } from "react";

import { setIsLoading } from "../../store/loaderSlice";
import { useLazyGetUserQuery } from "../../store/UserApi";
import { useGetUserContactsQuery } from "../../store/UserApi";
import { selectUser, setIsAuthorized } from "../../store/userSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import styles from "./Home.module.scss";

export default function Home() {
  const dispatch = useAppDispatch();

  const { isAuthorized, userName } = useAppSelector(selectUser);

  const {
    data: userContacts,
    isFetching: isGetContactsFetching,
    isError: isGetContactsrError,
  } = useGetUserContactsQuery("", { skip: !isAuthorized });

  useEffect(() => {
    if (isGetContactsFetching) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [isGetContactsFetching]);

  return (
    <div className={styles.container}>
      <h1>Welcome to best contacts manager!</h1>
      <h3>
        Here you can manage all your contacts to keep them in order:
        <ul>
          <li>create contacts</li>
          <li>edit contacts</li>
          <li>delete contacts</li>
          <li>search through contacts</li>
        </ul>
      </h3>
      {!isAuthorized ? (
        <h2>
          Please, <Link href="/login">login</Link> to get access to your
          contacts
        </h2>
      ) : (
        <div className={styles.container}>
          <h2> Hello, {userName}!</h2>
          <h3>
            {" "}
            You can manage your contacts at{" "}
            <Link href="/contacts">Contacts</Link> page
          </h3>
          {userContacts && !isGetContactsrError && (
            <h3> You have {userContacts.length} contacts at the moment</h3>
          )}
        </div>
      )}
    </div>
  );
}
