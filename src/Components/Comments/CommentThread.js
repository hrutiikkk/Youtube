import { timeAgo, countFunction } from '../../Utils/Functions';
import { AiOutlineDislike } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { IoIosArrowUp } from "react-icons/io";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Reply from './Reply';


const CommentThread = ({ data }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [imageError, setImageError] = useState(false); // State to track image loading errors

    const handleImageError = () => {
        setImageError(true); // Set imageError state to true if there's an error loading the image
    };

    const toastNotification = () => {
        toast.error('Feature unavailable now!')
    }

    if (!data) return null; // Return null if data is not available

    const { authorProfileImageUrl, authorDisplayName, likeCount, publishedAt, textDisplay } = data?.snippet?.topLevelComment?.snippet;
    const { totalReplyCount } = data?.snippet;

    const imageUrl = imageError ? 'https://yt3.ggpht.com/ytc/AIdro_nDaJquE2fHtM0JbOi8j1CxndMouP8vSkhdEgD8I5Y=s48-c-k-c0x00ffffff-no-rj' : authorProfileImageUrl;

    return (
        <div className={`px-3 flex gap-3 pt-5 overflow-hidden`}>
            <div className={`w-10 2xl:w-12 lg:w-14 sm:w-12`}>
                <img src={imageUrl} alt="" className='w-full rounded-full' onError={handleImageError} />
            </div>

            <div className='w-[90%]'>
                <p className='line-clamp-2 text-sm font-medium dark:text-white'>
                    <span>{authorDisplayName}</span>
                    <span className='text-neutral-600 dark:text-neutral-400 text-[13px] pl-1.5'>{timeAgo(publishedAt)}</span>
                </p>
                <p className='text-sm font-normal dark:text-white pt-0.5' dangerouslySetInnerHTML={{ __html: textDisplay }} ></p>

                <div className='flex gap-2 py-2'>
                    <p className='flex gap-0.5'><AiOutlineLike className='text-xl cursor-pointer' onClick={toastNotification} /> <span className='text-xs flex items-center'>{countFunction(likeCount)}</span></p>
                    <AiOutlineDislike className='text-xl cursor-pointer' onClick={toastNotification} />
                    <div className={`${totalReplyCount >= 1 ? 'flex' : 'hidden'} text-sm gap-0.5 items-center text-blue-500 rounded-full cursor-pointer px-3 bg-[#cfcdcd3e] py-1`} onClick={() => setShowReplies(!showReplies)}>{!showReplies ? <IoIosArrowDown className='text-xl' /> : <IoIosArrowUp className='text-xl' />} <span>{!showReplies ? 'Show' : 'Hide'} Replies</span></div>
                </div>


                {/* Replies */}
                {(totalReplyCount >= 1) && (
                    <div>
                        {data?.replies?.comments.map((reply) => (
                            <Reply showReplies={showReplies} toastNotification={toastNotification} data={reply} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentThread;
