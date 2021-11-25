import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TripPlannerPage from "./Views/TripPlannerPage";
import HomePage from "./Views/HomePage";
import { BookmarkProvider } from "./helpers/context/bookmark";

const App = () => {
  return (
    <BookmarkProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trip-planner" element={<TripPlannerPage />} />
        </Routes>
      </Router>
    </BookmarkProvider>
  );
};

export default App;
