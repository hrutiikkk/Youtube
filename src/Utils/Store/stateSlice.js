import { createSlice } from "@reduxjs/toolkit";

// Creating a slice of state for managing application state
const stateSlice = createSlice({
    name: 'state', // Name of the slice
    initialState: {
        // Initial state values
        showSideBar: false,
        darkMode: null,
        activeTopic: 'Home',
        sideBarItem: 'Home',
        homeTopics: ['Home', 'All', 'TMKOC', 'Motivation', 'Computer Programming', 'Music', 'Cricket', 'Politics', 'Animated Films', 'Movies', 'Study', 'Gaming', 'Sports'],
        token: '',
        smallDeviceComments: false
    },
    reducers: {
        // Reducer function to toggle the sidebar visibility
        toggleSideBar: (state) => {
            state.showSideBar = !state.showSideBar;
        },
        // Reducer function to open the sidebar
        openSideBar: (state) => {
            state.showSideBar = true;
        },
        // Reducer function to close the sidebar
        closeSideBar: (state) => {
            state.showSideBar = false;
        },
        // Reducer function to toggle dark mode
        toggleDarkMode: (state, action) => {
            state.darkMode = action.payload;
        },
        // Reducer function to change active topic
        changeActiveTopic: (state, action) => {
            state.activeTopic = action.payload;
        },
        // Reducer function to change sidebar item
        changeSideBarItem: (state, action) => {
            state.sideBarItem = action.payload;
        },
        // Reducer function to change token
        changeToken: (state, action) => {
            state.token = action.payload;
        },
        // Reducer function to toggle small device comments
        setSmallDeviceComments: (state) => {
            state.smallDeviceComments = !state.smallDeviceComments;
        },
    }
});

// Exporting action creators and reducer
export const { toggleSideBar, openSideBar, closeSideBar, toggleDarkMode, changeActiveTopic, changeSideBarItem, changeToken, setSmallDeviceComments } = stateSlice.actions;
export default stateSlice.reducer;
