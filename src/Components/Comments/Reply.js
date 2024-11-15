import { timeAgo, countFunction } from '../../Utils/Functions';
import { AiOutlineDislike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import React from 'react';

const Reply = ({ showReplies, toastNotification, data }) => {

    const { authorProfileImageUrl, authorDisplayName, likeCount, publishedAt, textDisplay } = data?.snippet;

    return (
        <div className={`${showReplies ? 'block' : 'hidden'} pl-2 transition-all mmd:pl-0`}>

            <div className={`px-3 flex gap-3 pt-3`}>
                <div className={`w-10 mmd:w-8`}>
                    <img src={authorProfileImageUrl} alt="Channel_Logo" className='w-full rounded-full' />
                </div>

                <div className='w-[90%]'>
                    <p className='line-clamp-2 text-sm font-medium dark:text-white'>
                        <span>{authorDisplayName}</span>
                        <span className='text-neutral-600 dark:text-neutral-400 text-[13px] pl-1.5'>{timeAgo(publishedAt)}</span>
                    </p>
                    <p className='text-sm font-normal dark:text-white pt-0.5' dangerouslySetInnerHTML={{ __html: textDisplay }} ></p>

                    <div className='flex gap-2 py-2'>
                        <p className='flex gap-0.5'><AiOutlineLike className='text-xl cursor-pointer' onClick={toastNotification} /> <span className='text-xs flex items-end'>{countFunction(likeCount)}</span></p>
                        <AiOutlineDislike className='text-xl cursor-pointer' onClick={toastNotification} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reply
