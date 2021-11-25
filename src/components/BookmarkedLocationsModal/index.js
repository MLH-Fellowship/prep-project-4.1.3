import React from "react";
import ReactModal from "react-modal";
import { Scrollbars } from "react-custom-scrollbars";
import BookmarkCard from "../BookmarkCard";

const BookmarkedLocationsModal = ({
  isOpen,
  closeModal,
  useFahrenheit,
  ...rest
}) => {
  ReactModal.setAppElement("#root");

  const bookmarkedLocations = JSON.parse(
    localStorage.getItem("BookmarkedLocations")
  );

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="modal"
      closeTimeoutMS={200}
      onRequestClose={() => closeModal()}
      preventScroll
      {...rest}
    >
      <Scrollbars
        className="custom-scrollbar"
        autoHide
        autoHideTimeout={500}
        autoHideDuration={200}
      >
        <h2 style={{ color: "black" }}>My Bookmarks</h2>
        <div className="bookmark-container">
          {bookmarkedLocations.map((place) => {
            return (
              <BookmarkCard place={place.name} useFahrenheit={useFahrenheit} />
            );
          })}
        </div>
      </Scrollbars>
    </ReactModal>
  );
};

export default BookmarkedLocationsModal;
