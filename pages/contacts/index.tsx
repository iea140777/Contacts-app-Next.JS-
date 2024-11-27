import { GetServerSidePropsContext } from "next";
import Link from "next/link";

import { useEffect, useState } from "react";

import { Button, Input } from "antd";
import { Tabs } from "antd";

import { ContactCard } from "../../components/ContactCard/ContactCard";
import { authenticateUser } from "../../lib/authenticateUser";
import { setIsLoading } from "../../store/loaderSlice";
import { useGetUserContactsQuery } from "../../store/UserApi";
import { emptyContact } from "../../utils/constants";
import { useAppDispatch } from "../../utils/hooks";
import { UserData } from "../../utils/types";
import { ContactsList } from "../../utils/types";
import styles from "./Contacts.module.scss";

const { Search } = Input;

interface ContactsProps {
  commonContacts: ContactsList;
  user?: UserData;
}

export default function Contacts({ commonContacts, user }: ContactsProps) {
  const dispatch = useAppDispatch();

  const [searchString, setSearchString] = useState<string>("");

  const {
    data: fetchedContacts,
    isFetching,
    error,
  } = useGetUserContactsQuery(searchString, { skip: !user });
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

  const renderContactCards = (
    contactsData: ContactsList,
    isCommonContact: boolean
  ) =>
    contactsData.map((contact) => (
      <ContactCard
        contact={contact}
        isCommon={isCommonContact}
        key={contact.id}
        isLoading={isFetching}
        cancelNewContact={cancelNewContactHandler}
      />
    ));

  const renderPersonalContacts = () => {
    if (!user) {
      return (
        <h3>
          Please <Link href="/login">login</Link> to see your personal contacts.
        </h3>
      );
    } else {
      return (
        <>
          {error && <span>Something went wrong...</span>}
          {contacts && (
            <div className={styles.contactsContainer}>
              <h2>Total {contacts.length} personal contacts</h2>
              <div className={styles.searchContainer}>
                <h3>Search personal contacts:</h3>
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
              {contacts.length > 0 ? (
                <div className={styles.cardContainer}>
                  {renderContactCards(contacts, false)}
                </div>
              ) : (
                <h3>No contacts found...</h3>
              )}
            </div>
          )}
        </>
      );
    }
  };

  const renderCommonContacts = () => {
    return (
      <div className={styles.contactsContainer}>
        <h2>Common contacts</h2>
        <div className={styles.cardContainer}>
          {renderContactCards(commonContacts, true)}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h2>Contacts</h2>
      <Tabs
        tabPosition="left"
        defaultActiveKey="1"
        items={[
          {
            label: "Personal contacts",
            key: "1",
            children: renderPersonalContacts(),
          },
          {
            label: "Common Contacts",
            key: "2",
            children: renderCommonContacts(),
          },
        ]}
      />
    </div>
  );
}

import { getDbCommonContacts } from "../../lib/dataHelpers/getDbCommonContacts";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const commonContacts = getDbCommonContacts();
  const user = await authenticateUser(context.req);
  if (!user) return { props: { commonContacts } };
  return {
    props: { user, commonContacts },
  };
}
