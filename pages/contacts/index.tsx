import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import { Button, Input } from "antd";

import { ContactCard } from "../../components/ContactCard/ContactCard";
import { setIsLoading } from "../../store/loaderSlice";
import { useGetUserContactsQuery } from "../../store/UserApi";
import { selectUser } from "../../store/userSlice";
import { emptyContact } from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { ContactsList } from "../../utils/types";
import styles from "./Contacts.module.scss";

const { Search } = Input;

interface ContactsProps {
  commonContacts: ContactsList;
}

export default function Contacts({ commonContacts }: ContactsProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthorized, userId } = useAppSelector(selectUser);

  useEffect(() => {
    if (!isAuthorized || !userId) {
      router.push("/");
    }
  });

  const [searchString, setSearchString] = useState<string>("");

  const {
    data: fetchedContacts,
    isFetching,
    isError,
  } = useGetUserContactsQuery(searchString);

  const [contacts, setContacts] = useState<ContactsList>([]);

  useEffect(() => {
    if (fetchedContacts) {
      setContacts(fetchedContacts);
    }
  }, [fetchedContacts]);

  useEffect(() => {
    if (isFetching) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [isFetching, dispatch]);

  const hasEmptyContact =
    contacts.filter((contact) => contact.id === 0).length > 0;

  const addContactHandler = () => {
    setContacts((prevContacts) => [...prevContacts, emptyContact]);
  };

  const cancelNewContactHandler = () => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== 0)
    );
  };

  const renderContactCards = (contactsData: ContactsList) =>
    contactsData.map((contact) => (
      <ContactCard
        contact={contact}
        key={contact.id}
        isLoading={isFetching}
        cancelNewContact={cancelNewContactHandler}
      />
    ));

  return (
    <div className={styles.container}>
      <h2>Contacts</h2>
      <h3>Total {contacts.length} personal contacts</h3>
      <div className={styles.searchContainer}>
        <h3>Search contacts:</h3>
        <Search
          allowClear
          placeholder="Enter contact name"
          enterButton
          loading={isFetching}
          onSearch={(value) => setSearchString(value)}
        />
      </div>
      <Button
        type="primary"
        size="large"
        onClick={addContactHandler}
        className={styles.button}
        disabled={hasEmptyContact}
      >
        Add new contact
      </Button>
      {isError && <span>Something went wrong...</span>}
      <h2>Common contacts</h2>
      <div className={styles.cardContainer}>
        {renderContactCards(commonContacts)}
      </div>
      {contacts && (
        <>
          <h2>Personal contacts</h2>
          <div className={styles.cardContainer}>
            {renderContactCards(contacts)}
          </div>
        </>
      )}
    </div>
  );
}

export async function getStaticProps() {
  // TODO: find solution to implement fetching with RTK-query
  const res = await fetch(`${process.env.API_URL}/common`);
  if (!res.ok) {
    throw new Error(`Failed to fetch contacts, received status ${res.status}`);
  }
  const commonContacts = await res.json();
  return {
    props: {
      commonContacts,
    },
  };
}
