import React from "react";
import ReactModal from "react-modal";

const BookmarkedLocationsModal = ({ isOpen, closeModal, ...rest }) => {
  ReactModal.setAppElement("#root");

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="modal"
      closeTimeoutMS={200}
      onRequestClose={() => closeModal()}
      preventScroll
      {...rest}
    >
      <p>Modal Content</p>
    </ReactModal>
  );
};

export default BookmarkedLocationsModal;
