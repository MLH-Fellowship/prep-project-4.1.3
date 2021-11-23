import React from "react";
import ReactModal from "react-modal";
import BookmarkCard from "../BookmarkCard";

const BookmarkedLocationsModal = ({ isOpen, closeModal, ...rest }) => {
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
      <h2 style={{ color: "black" }}>My Bookmarks</h2>
      <div className="bookmark-container">
        {bookmarkedLocations.map((place) => {
          return <BookmarkCard location={place.name} />;
        })}
      </div>
    </ReactModal>
  );
};

export default BookmarkedLocationsModal;
