import React from "react";
import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../components/loader/Loader";

const Weather = lazy(() => import("../pages/weather/Weather"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));

function PageRoutes() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="weather" element={<Weather />} />
          </Route>
          <Route path="*" element={<Navigate to="dashboard" />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default PageRoutes;
