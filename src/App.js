import MainContainer from './Components/HomeSection/MainContainer';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import WatchPage from './Pages/WatchPage';
import Header from './Components/Header';
import React, { useEffect } from 'react';
import './App.css';
import { toggleDarkMode } from './Utils/Store/stateSlice';

const App = () => {
  const dispatch = useDispatch();
  // Selecting darkMode state from Redux store
  const darkMode = useSelector(store => store.state.darkMode);
  // Selecting activeTopic state from Redux store
  const activeTopic = useSelector(store => store.state.activeTopic);


  let darkMODE = localStorage.getItem('dark');
  if (darkMODE === null || darkMODE === undefined) {
    localStorage.setItem('dark', 1); // Set default value if 'dark' is not set
    darkMODE = 1; // Assume dark mode by default
  } else {
    darkMODE = parseInt(darkMODE); // Convert to number
  };
  dispatch(toggleDarkMode(darkMODE === 1));

  useEffect(() => {
    // Smooth scrolling to top when activeTopic changes
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Smooth scrolling animation
    });
  }, [activeTopic]);

  return (
    // Rendering main application content
    <div className={`max-w-[1600px] m-auto relative ${darkMode ? 'dark' : ''}`}>
      {/* Toast notification container */}
      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme={darkMode ? 'dark' : 'light'}
      />
      {/* Header component */}
      <Header />
      {/* Sidebar component */}
      <Sidebar />
      {/* React Router Outlet for rendering nested routes */}
      <Outlet />
    </div>
  );
};

// Creating router configuration using createBrowserRouter
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Root path element
    children: [
      {
        path: '/', // Nested route for home page
        element: <MainContainer /> // Main content container for home page
      },
      {
        path: 'watch', // Nested route for watch page
        element: <WatchPage /> // Watch page component
      }
    ]
  }
]);

export default appRouter;
