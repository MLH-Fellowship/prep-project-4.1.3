import React, { useEffect, useState } from "react";
import useToggle from "../../helpers/customHooks/useToggle";
import BookmarkedLocationsModal from "../BookmarkedLocationsModal";

const Bookmark = ({ cityRes }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [isOpen, toggleBookmarkModal] = useToggle(false);

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
          <i
            className={`fa-${
              isBookmarked ? "solid" : "regular"
            } fa-bookmark fa-lg`}
          ></i>
        </abbr>
      </button>

      <button onClick={toggleBookmarkModal}>View Bookmarked Locations</button>

      {isOpen ? (
        <BookmarkedLocationsModal
          isOpen={isOpen}
          closeModal={toggleBookmarkModal}
        />
      ) : null}
    </div>
  );
};

export default Bookmark;
