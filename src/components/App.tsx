import React from "react";
import { NavLink, Route, Routes } from "react-router";
import { Home } from "./pages/home";
import { MoviePage } from "./pages/movie-page";

function App() {
  return (
    <div className="mx-auto max-w-[1280px] p-4 rounded-xl shadow-md">
      <div className="mb-5">
        <h1 className="text-3xl font-bold mb-4">Super Movie App </h1>
        <NavLink to="/">Go Home</NavLink>
      </div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/movies/:id" element={<MoviePage />} />
      </Routes>
    </div>
  );
}

export default App;
