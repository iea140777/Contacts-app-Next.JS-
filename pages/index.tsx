import { GetServerSidePropsContext } from "next";
import Link from "next/link";

import React from "react";
import { useEffect } from "react";

import { authenticateUser } from "../lib/authenticateUser";
import { setIsLoading } from "../store/loaderSlice";
import { useGetUserContactsQuery } from "../store/UserApi";
import { useAppDispatch } from "../utils/hooks";
import { UserData } from "../utils/types";
import styles from "./index.module.scss";

interface Props {
  user: UserData;
}

export default function Home({ user }: Props) {
  const dispatch = useAppDispatch();

  const {
    data: userContacts,
    isFetching: isGetContactsFetching,
    isError: isGetContactsrError,
  } = useGetUserContactsQuery("", { skip: !user });

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
      {!user ? (
        <h2>
          Please, <Link href="/login">login</Link> to get access to your
          contacts
        </h2>
      ) : (
        <div className={styles.container}>
          <h2> Hello, {user.name}!</h2>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await authenticateUser(context.req);
  if (!user) return { props: {} };
  return {
    props: { user },
  };
}
