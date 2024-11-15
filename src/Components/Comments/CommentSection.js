import { YOUTUBE_API } from '../../Utils/constants';
import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import CommentThread from './CommentThread';
import { useDispatch, useSelector } from 'react-redux';
import { setSmallDeviceComments } from '../../Utils/Store/stateSlice';

const CommentSection = ({ videoID }) => {
    const dispatch = useDispatch();
    const smallDeviceComments = useSelector(store => store.state.smallDeviceComments);
    const [comments, setComments] = useState([]);


    const fetchComments = async () => {
        const data = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=${YOUTUBE_API()}&videoId=${videoID}&part=snippet,replies&order=relevance&maxResults=32`);
        const json = await data.json();
        setComments(json.items);
    };


    useEffect(() => {
        fetchComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoID]);

    const CommentToggler = () => {
        window.scrollTo(0,0);
        dispatch(setSmallDeviceComments());
    };


    if (!comments) return;


    return (

        <>
            <div className={`mx-auto py-2 px-4 w-[95%] dark:text-white text-black transition-all relative bg-[#7070703e] rounded-xl hidden ${smallDeviceComments ? 'mmd:hidden' : 'mmd:block'}`} onClick={CommentToggler}>
                <h1 className='font-semibold text-base'>Comments</h1>

                <div className='flex gap-4 items-start py-2 pl-3 w-full'>
                    <div className='w-10'>
                        <img src={comments[0]?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} alt=" " className='w-full rounded-full' />
                    </div>

                    <div className='w-full line-clamp-2 text-sm' dangerouslySetInnerHTML={{ __html: comments[0]?.snippet?.topLevelComment?.snippet?.textDisplay }}></div>
                </div>

            </div>


            <div className={`py-2 w-full dark:text-white text-black transition-all relative mmd:max-h-[100vh] overflow-auto ${smallDeviceComments ? 'mmd:block' : 'mmd:hidden'} mmd:pt-[56.5%]`}>
                <div className='font-semibold text-xl py-2 pl-2 dark:bg-black border-b border-[rgba(69,69,69,0.82)] sticky mmd:-top-4 bg-white flex items-center justify-between'>
                    <p>Comments</p>
                    <IoCloseOutline className='text-4xl mmd:block hidden' onClick={CommentToggler}/>
                </div>
                {comments.map((comment) => (
                    <CommentThread key={comment.id} data={comment} />
                ))}
            </div>
        </>
    )
}

export default CommentSection
