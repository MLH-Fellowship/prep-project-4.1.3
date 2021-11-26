import React, { createContext, useContext } from "react";
import useToggle from "../customHooks/useToggle";

const BookmarkContext = createContext();

const BookmarkProvider = ({ children }) => {
  const [isOpen, toggleBookmarkModal] = useToggle(false);

  return (
    <BookmarkContext.Provider value={[isOpen, toggleBookmarkModal]}>
      {children}
    </BookmarkContext.Provider>
  );
};

const useBookmarkContext = () => {
  const context = useContext(BookmarkContext);

  if (context === undefined) {
    throw new Error(
      "useBookmarkContext must be used within a BookmarkProvider"
    );
  }
  return context;
};

export { BookmarkProvider, useBookmarkContext };
