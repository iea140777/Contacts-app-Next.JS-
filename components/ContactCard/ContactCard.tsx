import { useEffect, useState } from "react";

import {
  faEdit,
  faSave,
  faTrashAlt,
  faXmarkCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Input } from "antd";

import { setIsLoading } from "../../store/loaderSlice";
import {
  useAddUserContactMutation,
  useDeleteUserContactMutation,
  useUpdateUserContactMutation,
} from "../../store/UserApi";
import { ModalVariants } from "../../utils/constants";
import { useAppDispatch } from "../../utils/hooks";
import { Contact } from "../../utils/types";
import { ContactsModal } from "../ContactsModal/ContactsModal";
import styles from "./ContactCard.module.scss";

interface ContactCardProps {
  contact: Contact;
  isLoading: boolean;
  cancelNewContact: () => void;
}

function ContactCard({
  contact,
  cancelNewContact,
  isLoading,
}: ContactCardProps) {
  const { id, name, phone, email, address } = contact;

  const dispatch = useAppDispatch();

  const isNewContact: boolean = id === 0;

  const [editMode, setEditMode] = useState<boolean>(
    isNewContact ? true : false
  );

  const [contactData, setContactData] = useState<Contact>(contact);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [modalVariant, setModalVariant] = useState<ModalVariants | undefined>(
    undefined
  );

  const [addUserContactMutation, { isLoading: addingUser }] =
    useAddUserContactMutation();

  const [updateUserContactMutation, { isLoading: updatingUser }] =
    useUpdateUserContactMutation();

  const [deleteUserContactMutation, { isLoading: deletingUser }] =
    useDeleteUserContactMutation();

  const isProcessingChanges = addingUser || updatingUser || deletingUser;

  useEffect(() => {
    if (isProcessingChanges) {
      dispatch(setIsLoading(true));
    }
  }, [isProcessingChanges, dispatch]);

  const editContactHandler = () => {
    setContactData(contact);
    setEditMode(true);
  };

  const deleteContactHandler = () => {
    setModalVariant(ModalVariants.DELETE_CONTACT);
    setIsModalOpen(true);
  };

  const saveChangesHandler = async () => {
    if (isNewContact) {
      // TODO: fix saving new contact
      /* Checking whether new contact has no filled fields except "id" 
      to prevent saving new empty contacts */
      const isEmptyContact =
        Object.values(contactData).filter((item) => item !== "").length === 1;
      if (isEmptyContact) {
        setModalVariant(ModalVariants.SAVE_EMPTY_CONTACT);
        setIsModalOpen(true);
      } else {
        try {
          await addUserContactMutation(contactData);
        } catch (error) {
          // TODO: create modal for showing error
          console.error("rejected", error);
        }
        setEditMode(false);
      }
    } else {
      await updateUserContactMutation(contactData);
      setEditMode(false);
    }
  };

  const cancelChangesHandler = () => {
    if (isNewContact) {
      cancelNewContact();
    } else {
      setContactData(contact);
      setEditMode(false);
    }
  };

  const handleModalOk = async () => {
    switch (modalVariant) {
      case ModalVariants.DELETE_CONTACT: {
        await deleteUserContactMutation(id);
        setIsModalOpen(false);
        setModalVariant(undefined);
        break;
      }
      case ModalVariants.SAVE_EMPTY_CONTACT: {
        cancelNewContact();
        setIsModalOpen(false);
        setModalVariant(undefined);
        break;
      }
      default: {
        return null;
      }
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setModalVariant(undefined);
  };

  const cardActionsDefault = [
    <FontAwesomeIcon
      className={styles.icon}
      icon={faEdit}
      onClick={editContactHandler}
      key="editDefault"
    />,
    <FontAwesomeIcon
      className={styles.icon}
      icon={faTrashAlt}
      onClick={deleteContactHandler}
      key="deleteDefault"
    />,
  ];

  const cardActionsEditMode = [
    <FontAwesomeIcon
      className={styles.icon}
      icon={faSave}
      onClick={saveChangesHandler}
      key="saveEdit"
    />,
    <FontAwesomeIcon
      className={styles.icon}
      icon={faXmarkCircle}
      onClick={cancelChangesHandler}
      key="cancelEdit"
    />,
  ];

  const renderEditInput = (field: keyof Contact) => {
    const changeHandler = (newValue: Contact[keyof Contact]) => {
      setContactData({
        ...contactData,
        [field]: newValue,
      });
    };
    return (
      <Input
        type="text"
        onChange={(e) => changeHandler(e.target.value)}
        required
        value={contactData[field]}
        maxLength={20}
        className={styles.input}
      />
    );
  };

  return (
    <form id={id.toString()}>
      <Card
        title={
          editMode ? (
            <div className={styles.inputContainer}>
              Name: {renderEditInput("name")}
            </div>
          ) : (
            name || " No name"
          )
        }
        actions={editMode ? cardActionsEditMode : cardActionsDefault}
        loading={isLoading || addingUser || updatingUser}
        className={styles.card}
      >
        <div className={styles.inputContainer}>
          Phone: {editMode ? renderEditInput("phone") : phone}
        </div>
        <div className={styles.inputContainer}>
          Email: {editMode ? renderEditInput("email") : email}
        </div>
        <div className={styles.inputContainer}>
          Address: {editMode ? renderEditInput("address") : address}
        </div>
        <ContactsModal
          variant={modalVariant}
          isModalOpen={isModalOpen}
          contactName={name}
          handleModalOk={handleModalOk}
          handleModalCancel={handleModalCancel}
        />
      </Card>
    </form>
  );
}

export { ContactCard };
