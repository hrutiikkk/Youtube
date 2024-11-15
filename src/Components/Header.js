import { changeActiveTopic, toggleDarkMode, toggleSideBar } from '../Utils/Store/stateSlice';
import React, { useEffect, useRef, useState } from 'react';
import YouTube_logo from '../images/youtubr-light.png';
import { useDispatch, useSelector } from 'react-redux';
import YouTUbe_Dark from '../images/youtube-dark.png';
import { SUGGESTION_API } from '../Utils/constants';
import { Sun, Moon, Search } from 'react-feather';
import { GiHamburgerMenu } from "react-icons/gi";
import profile_Logo from '../images/profile.png';
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const darkMode = useSelector(store => store.state.darkMode);
    const [input, setInput] = useState('');
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [suggestions, setSuggestions] = useState(null);
    const suggestionTimeout = useRef(null);
    const [SBForSmallDevice, setSBForSmallDevice] = useState(false);

    // Function to handle sidebar toggling
    const handleSideBar = () => {
        dispatch(toggleSideBar());
        window.scrollTo(0,0)
    };

    // Function to toggle dark mode
    const handleMode = () => {
        const isDarkMode = localStorage.getItem('dark') === '1'; // Check if 'dark' is set to '1'
        const newMode = !isDarkMode ? 1 : 0; // Toggle the mode
        localStorage.setItem('dark', newMode); // Update the 'dark' value in local storage
        dispatch(toggleDarkMode(newMode === 1)); // Dispatch action based on the new mode
    };;

    // Function to handle search submission
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(changeActiveTopic(input + 'search'));
        navigate('/')
        setShowSuggestion(false);
    };

    // Function to handle suggestion click
    const handleSuggestionClick = (query) => {
        dispatch(changeActiveTopic(query + 'search'));
        navigate('/')
        setInput(query);
        setShowSuggestion(false);
    };

    // Function to fetch suggestions
    const getSuggestions = async (query) => {
        const encodedQuery = encodeURIComponent(query);
        const apiUrl = `${SUGGESTION_API}${encodedQuery}`;
        const response = await fetch(apiUrl, { headers: { 'x-cors-api-key': 'temp_9f697adb7fd3af9af1d3013eb9349654' } });
        const data = await response.json();
        setSuggestions(data[1]);
    };

    useEffect(() => {
        let timer;
        if (input !== '') {
            timer = setTimeout(() => getSuggestions(input), 20);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [input]);

    // Function to handle input blur
    const handleInputBlur = () => {
        suggestionTimeout.current = setTimeout(() => {
            setShowSuggestion(false);
        }, 200);
    };

    // Function to handle input focus
    const handleInputFocus = () => {
        clearTimeout(suggestionTimeout.current);
        setShowSuggestion(true);
    };

    return (
        <div className='w-full fixed top-0 z-30 bg-white dark:bg-neutral-900 dark:text-white'>
            {!SBForSmallDevice ? (<div className="flex justify-between items-center px-3 py-3 shadow border-b dark:border-[#cfcdcd3e]">
                {/* HamBurger and Logo */}
                <div className="flex gap-4 items-center sm:gap-2 justify-between">
                    <button className="cursor-pointer p-2 rounded-full" onClick={handleSideBar}>
                        <GiHamburgerMenu className="text-2xl" />
                    </button>

                    <div>
                        <img src={darkMode ? YouTUbe_Dark : YouTube_logo} alt="Logo" className="w-28 sm:w-24" />
                    </div>
                </div>

                <div className='w-[45%] m-auto relative'>
                    {input !== '' && suggestions && showSuggestion && (
                        <div className='w-[92%] absolute border border-neutral-300 dark:border-neutral-600 top-11 left-0 bg-neutral-100 dark:bg-neutral-900 text-[#000] dark:text-[#fff] py-1 rounded-2xl shadow-xl text-base'>
                            {suggestions.map(s => (
                                <div
                                    className='py-1 px-4 rounded-lg dark:hover:bg-neutral-800 hover:bg-neutral-200 cursor-pointer flex gap-3 items-center'
                                    key={s}
                                    onClick={() => handleSuggestionClick(s)}
                                >
                                    <IoIosSearch className='text-lg' /> {s}
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Search Input */}
                    <form action="" className="w-full flex rounded-full sm:hidden" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search"
                            className="text-[#2d2d2d] dark:bg-[#0007] dark:text-white text-base w-11/12 border border-[#84848473] rounded-l-full py-1.5 pl-4 focus:outline-none"
                            onChange={e => setInput(e.target.value)}
                            value={input}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                        <button className="border border-[#84848457] rounded-r-full py-1.5 pl-3 pr-4 bg-[#6d6d6d1f] hover:bg-[#58585828] dark:bg-[#45454518] dark:hover:bg-[#5858583b] ">
                            <Search className="text-2xl text-[#3f3f3fd2] dark:text-[#fff]" />
                        </button>
                    </form>
                </div>

                {/* Dark Mode and Profile pic */}
                <div className="flex gap-2 items-center sm:gap-1 justify-center">
                    <div className="hidden cursor-pointer p-2 rounded-full dark:hover:bg-[#5858583b] hover:bg-[#58585828] sm:p-1 sm:block"
                        onClick={() => setSBForSmallDevice(true)}
                    >
                        <Search className="text-2xl" />
                    </div>
                    <div className="cursor-pointer p-2 rounded-full hover:bg-[#58585828] sm:p-1" onClick={handleMode}>
                        {darkMode ? <Sun /> : <Moon />}
                    </div>
                    <img src={profile_Logo} alt="Profile Pic" className="w-9 xxxsm:hidden" />
                </div>
            </div>)
            
            :
            
            (
                <div className="flex justify-between items-center px-3 py-3 shadow border-b dark:border-[#cfcdcd3e] gap-3">
                    <div className="hidden cursor-pointer p-2 rounded-full dark:hover:bg-[#5858583b] hover:bg-[#58585828] sm:p-1 sm:block"
                        onClick={() => setSBForSmallDevice(false)}
                    >
                        <IoClose className="text-2xl" />
                    </div>

                    <div className='w-full m-auto relative'>
                    {input !== '' && suggestions && showSuggestion && (
                        <div className='w-full absolute border border-neutral-300 dark:border-neutral-600 top-11 left-0 bg-neutral-100 dark:bg-neutral-900 text-[#000] dark:text-[#fff] py-1 rounded-2xl shadow-xl text-base'>
                            {suggestions.map(s => (
                                <div
                                    className='py-1 px-4 rounded-lg dark:hover:bg-neutral-800 hover:bg-neutral-200 cursor-pointer flex gap-3 items-center'
                                    key={s}
                                    onClick={() => handleSuggestionClick(s)}
                                >
                                    <IoIosSearch className='text-lg' /> {s}
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Search Input */}
                    <form action="" className="w-full flex rounded-full" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search"
                            className="text-[#2d2d2d] dark:bg-[#0007] dark:text-white text-base w-11/12 border border-[#84848473] rounded-l-full py-1.5 pl-4 focus:outline-none"
                            onChange={e => setInput(e.target.value)}
                            value={input}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                        <button className="border border-[#84848457] rounded-r-full py-1.5 pl-3 pr-4 bg-[#6d6d6d1f] hover:bg-[#58585828] dark:bg-[#45454518] dark:hover:bg-[#5858583b] ">
                            <Search className="text-2xl text-[#3f3f3fd2] dark:text-[#fff]" />
                        </button>
                    </form>
                </div>

                
                </div>
            )}
        </div>
    );
};

export default Header;
