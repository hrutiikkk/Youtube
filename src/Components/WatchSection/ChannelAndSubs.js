import React from 'react';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { IoMdDownload } from "react-icons/io";
import { PiShareFatBold } from "react-icons/pi";
import { countFunction } from '../../Utils/Functions';
import { toast } from 'react-toastify';

const ChannelAndSubs = ({ profile, name, likes, subs }) => {
    // Function to show toast notification for unavailable feature
    const toastNotification = () => {
        toast.error('Feature unavailable now!');
    };

    return (
        <div className='py-3'>
            {/* Subscribe and Like container */}
            <div className='flex justify-between items-center lg:flex-col gap-2 lg:items-stretch'>
                {/* Channel logo and subscribe button */}
                <div className='flex gap-5 items-center lg:justify-between'>
                    {/* Channel info */}
                    <div className='flex gap-3 items-center'>
                        <img src={profile} className='w-10 rounded-full' alt="" />
                        <div>
                            <h1 className='text-lg font-medium sm:text-sm truncate'>{name}</h1>
                            <p className='text-sm font-normal text-neutral-500 sm:text-xs truncate'>{countFunction(subs)} subscribers</p>
                        </div>
                    </div>
                    {/* Subscribe button */}
                    <div className='flex items-center gap-1 text-2xl lg:text-lg py-2 px-5 dark:bg-white dark:text-black bg-[#cfcdcd3e] rounded-full font-medium cursor-pointer hover:bg-[#7070703e] dark:hover:bg-[#ffffff8e]' onClick={toastNotification}>
                        <span className='text-base sm:text-xs'>Subscribe</span>
                    </div>
                </div>
                {/* Likes/ Download/ Share */}
                <div className='flex items-center gap-3 text-2xl lg:text-lg flex-wrap sm:text-lg'>
                    {/* Like */}
                    <div className='flex items-center gap-2 bg-[#cfcdcd3e] rounded-full py-1 px-5 sm:px-3 hover:bg-[#7070703e]' onClick={toastNotification}>
                        <div className='flex items-center gap-1 font-medium cursor-pointer'>
                            <AiOutlineLike />
                            <span className='text-base sm:text-sm xsm:text-xs'>{countFunction(likes)}</span>
                        </div>
                        <span>|</span>
                        <div className='cursor-pointer'><AiOutlineDislike /></div>
                    </div>
                    {/* Download */}
                    <div className='flex items-center gap-1 py-2 px-5 bg-[#cfcdcd3e] rounded-full font-medium sm:px-3 cursor-pointer hover:bg-[#7070703e]' onClick={toastNotification}>
                        <IoMdDownload />
                        <span className='text-base sm:text-xs'>Download</span>
                    </div>
                    {/* Share */}
                    <div className='flex items-center gap-1 py-2 px-5 bg-[#cfcdcd3e] rounded-full font-medium sm:px-3 cursor-pointer hover:bg-[#7070703e]' onClick={toastNotification}>
                        <PiShareFatBold />
                        <span className='text-base sm:text-xs'>Share</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChannelAndSubs;
