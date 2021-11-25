import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as Solidbookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as RegularBookmark } from "@fortawesome/free-regular-svg-icons";
import BookmarkedLocationsModal from "../BookmarkedLocationsModal";
import { useBookmarkContext } from "../../helpers/context/bookmark";

const Bookmark = ({ cityRes, useFahrenheit }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [isOpen, toggleBookmarkModal] = useBookmarkContext();

  useEffect(() => {
    if (cityRes?.name) {
      if (isLocationBookmarked(cityRes?.name)) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
    }
  }, [cityRes?.name]);

  const handleBookmarkLocation = (e) => {
    const newLocation = {
      name: cityRes?.name,
    };

    if (isLocationBookmarked(newLocation.name)) {
      removeLocationFromBookmark(newLocation.name);
      setIsBookmarked(false);
    } else {
      addLocationToBookmark(newLocation);
      setIsBookmarked(true);

      toast.success("Location bookmarked successfully.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const isLocationBookmarked = (locationName) => {
    const bookmarkedLocations = JSON.parse(
      localStorage.getItem("BookmarkedLocations")
    );

    return bookmarkedLocations?.find(
      (location) => location.name === locationName
    )
      ? true
      : false;
  };

  const addLocationToBookmark = (location) => {
    const bookmarkedLocations = JSON.parse(
      localStorage.getItem("BookmarkedLocations")
    );

    const result =
      bookmarkedLocations && bookmarkedLocations.length
        ? bookmarkedLocations
        : [];

    localStorage.setItem(
      "BookmarkedLocations",
      JSON.stringify([...result, location])
    );
  };

  const removeLocationFromBookmark = (locationName) => {
    const bookmarkedLocations = JSON.parse(
      localStorage.getItem("BookmarkedLocations")
    );

    const result =
      bookmarkedLocations && bookmarkedLocations.length
        ? bookmarkedLocations
        : [];

    const availableLocations = result.filter(
      (location) => location.name !== locationName
    );

    localStorage.setItem(
      "BookmarkedLocations",
      JSON.stringify([...availableLocations])
    );
  };

  return (
    <div className="bookmark">
      <button className="bookmark-btn" onClick={handleBookmarkLocation}>
        <abbr title={`${isBookmarked ? "Bookmarked" : "Add Bookmark"}`}>
          {isBookmarked ? (
            <FontAwesomeIcon icon={Solidbookmark} />
          ) : (
            <FontAwesomeIcon icon={RegularBookmark} />
          )}
        </abbr>
      </button>

      {isOpen ? (
        <BookmarkedLocationsModal
          isOpen={isOpen}
          closeModal={toggleBookmarkModal}
          useFahrenheit={useFahrenheit}
        />
      ) : null}
    </div>
  );
};

export default Bookmark;
