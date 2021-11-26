import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Scrollbars } from "react-custom-scrollbars";
import BookmarkCard from "../BookmarkCard";
import { toast } from "react-toastify";

const BookmarkedLocationsModal = ({
  isOpen,
  closeModal,
  clearBookmarks,
  useFahrenheit,
  ...rest
}) => {
  const [bookmarkedLocations, setBookmarkedLocation] = useState([]);

  ReactModal.setAppElement("#root");

  useEffect(() => {
    const stringedBookmarks = localStorage.getItem("BookmarkedLocations");

    if (stringedBookmarks) {
      setBookmarkedLocation(JSON.parse(stringedBookmarks));
    } else {
      setBookmarkedLocation([]);
    }
  }, []);

  const handleClearBookmarks = () => {
    clearBookmarks();

    setBookmarkedLocation([]);

    toast.info("Bookmarks Cleared Successfully.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

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
        <div className="bookmark-header-wrapper">
          <h2>My Bookmarks</h2>

          {bookmarkedLocations.length > 0 ? (
            <div className="clear-bookmak">
              <button onClick={handleClearBookmarks}>Clear Bookmarks</button>
            </div>
          ) : null}
        </div>

        <div className="bookmark-container">
          {bookmarkedLocations.length > 0 ? (
            bookmarkedLocations.map((place) => {
              return (
                <BookmarkCard
                  place={place.name}
                  useFahrenheit={useFahrenheit}
                />
              );
            })
          ) : (
            <div className="empty-bookmark">
              <h3>You have no bookmarked location.</h3>
            </div>
          )}
        </div>
      </Scrollbars>
    </ReactModal>
  );
};

export default BookmarkedLocationsModal;
