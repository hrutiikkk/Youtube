import React, { useEffect, useState } from 'react';
import { YOUTUBE_API } from '../Utils/constants';
import placeholderImage from '../images/video-placeholder.png';
import { closeSideBar } from '../Utils/Store/stateSlice';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { formatDuration, timeAgo, countFunction } from '../Utils/Functions';

const VideoCard = ({ video, horizontal }) => {
    // State variables to manage video details
    const [profile_pic, setProfile_Pic] = useState(null);
    const [viewCount, setViewCount] = useState('');
    const [duration, setDuration] = useState('');
    const [thumbnailLoaded, setThumbnailLoaded] = useState(false); // State to track whether thumbnail is loaded
    const dispatch = useDispatch();

    // Destructure necessary properties from video snippet
    const { thumbnails, channelId, title, channelTitle, publishedAt } = video?.snippet;

    // Function to fetch profile picture of the channel
    const fetchProfilePic = async (id) => {
        try {
            const data = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=${YOUTUBE_API()}&hl=en`);
            const json = await data.json();
            setProfile_Pic(json.items[0].snippet.thumbnails.default.url || json.items[0].snippet.thumbnails.medium.url);
        } catch (error) {
            console.error('Error fetching profile picture:', error);
        }
    };

    // Function to fetch video details including view count and duration
    useEffect(() => {
        const fetchTopicVideoDetails = async () => {
            try {
                const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${video.id.videoId || video.id}&key=${YOUTUBE_API()}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch video details');
                }
                const data = await response.json();
                if (data.items.length > 0) {
                    setViewCount(data.items[0].statistics.viewCount);
                    setDuration(data.items[0].contentDetails.duration);
                } else {
                    throw new Error('Video details not found');
                }
            } catch (error) {
                console.error('Error fetching video details:', error);
            }
        };

        fetchProfilePic(channelId);
        fetchTopicVideoDetails();
    }, [channelId, video]);

    // Function to handle closing the sidebar
    const closeSideBarFunc = () => {
        dispatch(closeSideBar());
    };

    // Function to handle thumbnail load event
    const handleThumbnailLoad = () => {
        setThumbnailLoaded(true); // Set thumbnailLoaded state to true when thumbnail is loaded
    };

    return (
        <Link to={`/watch?v=${video.id.videoId || video.id}&chnl=${channelId}`} className={`pb-4 sm:pb-3 ${horizontal ? 'flex gap-3 mmd:block' : ''}`} onClick={closeSideBarFunc}>
            <div className={`relative ${horizontal ? 'w-5/12 slg:w-8/12 mmd:w-full' : ''}`}>
                <div className={`px-1.5 py-0.5 ${duration !== 'P0D' ? 'bg-[#1c1c1cd4]' : 'bg-[#fc1d1dd4]'} text-white rounded text-xs font-medium absolute bottom-1.5 right-1.5`}>{formatDuration(duration)}</div>
                <img
                    src={thumbnailLoaded ? (thumbnails && thumbnails.maxres && thumbnails.maxres.url) || (thumbnails && thumbnails.medium && thumbnails.medium.url) : placeholderImage}
                    alt="Video_Card"
                    className='w-full h-full object-cover rounded-lg'
                    onLoad={handleThumbnailLoad} // Trigger handleThumbnailLoad when thumbnail is loaded
                />
            </div>

            {/* Video Info */}
            <div className={`flex gap-2 pt-2 mmd:gap-4 mmd:pt-3 sm:pt-2 sm:gap-2 ${horizontal ? 'w-7/12 mmd:w-full' : ''}`}>
                <div className={`w-10 2xl:w-12 lg:w-14 mmd:w-20 sm:w-12 ${horizontal ? 'hidden mmd:block' : ''} `}>
                    <img src={profile_pic} alt=" " className='w-full rounded-full' />
                </div>

                <div className='w-[90%]'>
                    {/* Title */}
                    <p className='line-clamp-2 text-base font-medium dark:text-white mmd:text-xl sm:text-sm' dangerouslySetInnerHTML={{ __html: title }}></p>

                    {/* Channel Name */}
                    <p className='text-sm text-neutral-600 font-normal dark:text-neutral-400 mmd:text-lg sm:text-xs ssm:hidden'>{channelTitle}</p>
                    <p className='text-sm text-neutral-600 font-normal dark:text-neutral-400 mmd:text-lg sm:text-xs ssm:hidden'>
                        {countFunction(viewCount)} • {timeAgo(publishedAt)}
                    </p>

                    <p className='hidden text-sm text-neutral-600 font-normal dark:text-neutral-400 mmd:text-lg sm:text-xs ssm:block pt-1'>{channelTitle} • {countFunction(viewCount)} • {timeAgo(publishedAt)}</p>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;
