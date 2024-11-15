import React, { useEffect, useState } from 'react';
import VideoCard from '../VideoCard';
import { YOUTUBE_API } from '../../Utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import ShimmerUI from '../ShimmerUI/ShimmerUI';
import { changeToken } from '../../Utils/Store/stateSlice';

const VideoContainer = () => {
    // Redux hooks
    const dispatch = useDispatch();
    const activeTopic = useSelector(store => store.state.activeTopic);
    const token = useSelector(store => store.state.token);

    // Local state
    const [videos, setVideos] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Calculate start and end dates for filtering by month
    const currentDate = new Date();
    const [startDateStr, endDateStr] = [
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString(),
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString()
    ];

    // Function to fetch videos
    const fetchVideo = async (token = '') => {
        try {
            setIsLoading(true); // Set loading to true before fetching videos
            let apiUrl = '';

            // Determine API URL based on active topic
            if (activeTopic.includes('search')) {
                const reconstructTopic = activeTopic.replace('search', '');
                apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${reconstructTopic}&type=video&maxResults=20&key=${YOUTUBE_API()}&pageToken=${token}&regionCode=IN&relevanceLanguage=en`;
            } else if (activeTopic.length === 24) {
                apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API()}&order=date&part=snippet&channelId=${activeTopic}&type=video&maxResults=20&pageToken=${token}&regionCode=IN&relevanceLanguage=en`;
            } else if (activeTopic === 'Home' || activeTopic === 'All') {
                apiUrl = `https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&part=snippet,contentDetails,statistics&regionCode=IN&maxResults=20&key=${YOUTUBE_API()}&hl=en&pageToken=${token}&regionCode=IN&relevanceLanguage=en`;
            } else if (activeTopic === 'Live') {
                apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API()}&part=snippet&q=${activeTopic}&type=video&maxResults=20&eventType=live&pageToken=${token}&regionCode=IN&relevanceLanguage=en`;
            } else {
                apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(activeTopic)}&publishedAfter=${startDateStr}&publishedBefore=${endDateStr}&type=video&maxResults=20&key=${YOUTUBE_API()}&pageToken=${token}&regionCode=IN&relevanceLanguage=en`;
            }

            // Fetch data from API
            const data = await fetch(apiUrl);
            if (!data.ok) {
                throw new Error('Failed to fetch videos');
            }
            const json = await data.json();
            setVideos(json?.items);
            dispatch(changeToken(json?.nextPageToken));
        } catch (error) {
            console.error('Error fetching videos:', error);
        } finally {
            setIsLoading(false); // Set loading to false after fetching videos
        }
    };

    // Fetch videos when activeTopic changes
    useEffect(() => {
        fetchVideo();
    }, [activeTopic]);

    // Function to handle "Show More" button click
    const handleShowMore = async () => {
        // Scroll to top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Delay fetching videos to ensure scrolling completes first
        setTimeout(() => {
            fetchVideo(token);
        }, 500); // Adjust the delay time as needed
    };

    // Render shimmer UI while loading or if videos are not yet fetched
    if (isLoading || !videos) return <ShimmerUI />;

    return (
        <>
            <div className='grid grid-cols-4 gap-3 justify-center items-start p-3 2xl:grid-cols-3 lg:grid-cols-2 mmd:grid-cols-1 sm:grid-cols-2 ssm:grid-cols-1'>
                {/* Render VideoCard components */}
                {videos.map((video, index) => (
                    <VideoCard video={video} key={index} />
                ))}
            </div>
            {/* "Show More" button */}
            <div className='flex justify-center mb-8'>
                <button className='w-[50%] px-auto rounded-full bg-[#cfcdcd3e] font-medium text-blue-500 py-2 text-lg sm:text-sm' onClick={handleShowMore}>Show More</button>
            </div>
        </>
    );
};

export default VideoContainer;
