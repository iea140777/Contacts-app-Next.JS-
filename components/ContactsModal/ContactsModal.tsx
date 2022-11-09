import { Modal } from "antd";

import { ModalVariants } from "../../utils/constants";

interface ModalProps {
  variant?: ModalVariants;
  isModalOpen: boolean;
  contactName: string;
  handleModalOk: () => void;
  handleModalCancel: () => void;
}

function ContactsModal({
  variant,
  isModalOpen,
  contactName,
  handleModalOk,
  handleModalCancel,
}: ModalProps) {
  const renderModalVariants = () => {
    switch (variant) {
      case ModalVariants.DELETE_CONTACT:
        return (
          <span>
            Are you sure you want to delete contact &quot;{contactName}&quot;?
          </span>
        );
      case ModalVariants.SAVE_EMPTY_CONTACT:
        return (
          <span>
            New contact with all empty fields can&apos;t be saved. It will be
            deleted. Are you sure you want to proceed?
          </span>
        );
      default: {
        return null;
      }
    }
  };
  // TODO: fix modal styles to show loader in the centre of the screen in focus
  return (
    <Modal
      title=""
      open={isModalOpen}
      onOk={handleModalOk}
      onCancel={handleModalCancel}
      destroyOnClose
      centered
    >
      {renderModalVariants()}
    </Modal>
  );
}

export { ContactsModal };
