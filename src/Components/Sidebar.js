import { changeActiveTopic, openSideBar, toggleSideBar } from '../Utils/Store/stateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PiShoppingCartLight } from "react-icons/pi";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { PiCertificateLight } from "react-icons/pi";
import { GiBabyfootPlayers } from "react-icons/gi";
import React, { useEffect, useState } from 'react';
import { MdOutlinePodcasts } from "react-icons/md";
import { PiFilmSlateLight } from "react-icons/pi";
import { Channel_List } from '../Utils/constants';
import { SiYoutubegaming } from "react-icons/si";
import { IoIosTrendingUp } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { CiMusicNote1 } from "react-icons/ci";
import { RiLiveLine } from "react-icons/ri";
import { GiClothes } from "react-icons/gi";

const Sidebar = () => {
    // Hooks
    const navigate = useNavigate();
    const showSideBar = useSelector(store => store.state.showSideBar);
    const dispatch = useDispatch();
    const [activeItem, setActiveItem] = useState('Home');

    // Effect to handle sidebar display based on screen width and location
    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 680 && window.location.pathname !== '/watch' ) {
            dispatch(openSideBar());
        };
    }, [dispatch]);

    // Function to toggle sidebar
    const handleSideBar = () => {
        dispatch(toggleSideBar());
    };

    // Function to handle menu item click
    const handleItemClick = (item , topic=item) => {
        navigate('/')
        dispatch(changeActiveTopic(topic))
        setActiveItem(item);
        const screenWidth = window.innerWidth;
        if (screenWidth < 680) {
            handleSideBar();
        };
    };

    // Function to render individual menu item
    const renderMenuItem = (icon, label, topic=label) => (
        <div className={`flex gap-5 items-center justify-start text-sm font-normal dark:hover:bg-[#4747478d] hover:bg-[#18181815] px-3 py-1 rounded-lg cursor-pointer ${activeItem === topic ? 'dark:bg-[#ffffff] dark:text-black hover:bg-neutral-800 dark:hover:bg-white bg-neutral-800 text-white' : ''}`} onClick={() => handleItemClick(topic)}>
            {icon}
            <h1>{label}</h1>
        </div>
    );

    return (
        <>
            {/* Background overlay */}
            <div className={` ${window.location.pathname === '/watch' && showSideBar ? 'block' : 'hidden'} fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10 ${showSideBar ? 'sm:block' : 'sm:hidden'} transition-all`} onClick={handleSideBar}></div>
            
            {/* Sidebar */}
            <div className={`max-w-[210px] fixed min-h-screen h-[100vh] z-20 sm:fixed ${showSideBar ? 'left-0' : 'left-[-220px]'} transition-all duration-300 bg-white dark:bg-neutral-900 dark:text-[#ffffff] dark:border-[#cfcdcd3e] border-r border-[#1313130c]  overflow-y-auto`}>

                {/* Menu items */}
                <div className='py-3 px-3 font-sans border-b border-[#8c8c8c54] dark:border-[#cfcdcd6b] pt-[75px]'>
                    {renderMenuItem(<IoHomeOutline className='text-xl' />, 'Home')}
                    {renderMenuItem(<IoIosTrendingUp className='text-xl' />, 'Trending' , 'trending videos')}
                    {renderMenuItem(<PiShoppingCartLight className='text-xl' />, 'Shopping', 'Indian Shopping')}
                    {renderMenuItem(<CiMusicNote1 className='text-xl' />, 'Music', 'trending songs in india')}
                    {renderMenuItem(<PiFilmSlateLight className='text-xl' />, 'Films', 'trending movies india')}
                    {renderMenuItem(<RiLiveLine className='text-xl' />, 'Live')}
                    {renderMenuItem(<SiYoutubegaming className='text-xl' />, 'Gaming')}
                    {renderMenuItem(<HiOutlineNewspaper className='text-xl' />, 'News')}
                    {renderMenuItem(<GiBabyfootPlayers className='text-xl' />, 'Sports', 'Indian Sports')}
                    {renderMenuItem(<PiCertificateLight className='text-xl' />, 'Courses')}
                    {renderMenuItem(<GiClothes className='text-xl' />, 'Fashion', 'Fashion & Beauty in India')}
                    {renderMenuItem(<MdOutlinePodcasts className='text-xl' />, 'Podcast', 'podcasts in india')}
                </div>

                {/* Subscriptions */}
                <div className='relative border-b border-[#8c8c8c54] dark:border-[#cfcdcd6b]'>
                    <h1 className='absolute top-0 px-4 bg-white  dark:bg-neutral-900 py-2 pb-0 w-full font-medium'>Subscriptions</h1>
                    <div className='py-2 px-3 font-sans pt-10'>
                        {Channel_List.map((channel) => (
                            <div className={`flex gap-5 items-center justify-start text-sm font-normal dark:hover:bg-[#4747478d] hover:bg-[#18181815] px-3 py-1 rounded-lg cursor-pointer ${activeItem === channel.name ? 'dark:bg-[#ffffff] dark:text-black hover:bg-neutral-800 dark:hover:bg-white bg-neutral-800 text-white' : ''}`} onClick={() => handleItemClick(channel.name, channel.id)}>
                                <img className='w-7 rounded-full' src={channel.link} alt="img_Channel" />
                                <h1 className='w-full truncate'>{channel.name}</h1>
                            </div>
                        ))}
                    </div>
                </div>

                <Link to={'https://github.com/KunalKhandekar'} target='_blank' rel='noopener noreferrer' className='flex items-start flex-col px-4 bg-white dark:bg-neutral-900 py-0 w-full font-medium'>
                        <h1 className='py-1.5'>Developed By</h1>
                        <div className='flex gap-2 items-center pb-2'>
                            <img src="https://avatars.githubusercontent.com/u/134169718?v=4" alt="profile_pic" className='w-8 rounded-full'/>
                            <p className='font-normal'>KunalKhandekar</p>
                        </div>
                </Link>
                

            </div>
        </>
    )
}

export default Sidebar;
