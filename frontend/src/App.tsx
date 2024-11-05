import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        <Route
          path="/hotel/:hotelId/booking"
          element={
            isLoggedIn ? (
              <Layout>
                <Booking />
              </Layout>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/add-hotel"
          element={
            isLoggedIn ? (
              <Layout>
                <AddHotel />
              </Layout>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/my-hotels"
          element={
            isLoggedIn ? (
              <Layout>
                <MyHotels />
              </Layout>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/my-bookings"
          element={
            isLoggedIn ? (
              <Layout>
                <MyBookings />
              </Layout>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/edit-hotel/:hotelId"
          element={
            isLoggedIn ? (
              <Layout>
                <EditHotel />
              </Layout>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;