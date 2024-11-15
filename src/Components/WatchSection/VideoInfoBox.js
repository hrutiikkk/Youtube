import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { YOUTUBE_API } from '../../Utils/constants';
import ChannelAndSubs from './ChannelAndSubs';
import { countFunction, timeAgo, renderClickableLinks } from '../../Utils/Functions';
import { useSelector } from 'react-redux';

const VideoInfoBox = ({ Id }) => {
    const [channelDetails, setChannelDetails] = useState(null);
    const [videoDetails, setVideoDetails] = useState(null);
    const [showDescription, setShowDescription] = useState(false);
    const smallDeviceComments = useSelector(store => store.state.smallDeviceComments);

    useEffect(() => {
        const fetchTopicVideoDetails = async (videoID) => {
            try {
                const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoID}&key=${YOUTUBE_API()}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch video details');
                }
                const data = await response.json();
                if (data.items.length > 0) {
                    setVideoDetails(data.items[0]);
                } else {
                    throw new Error('Video details not found');
                }
            } catch (error) {
                console.error('Error fetching video details:', error);
            }
        };

        fetchTopicVideoDetails(Id);
    }, [Id]);

    useEffect(() => {
        if (videoDetails) {
            const fetchChannelDetails = async () => {
                try {
                    const data = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${videoDetails.snippet.channelId}&key=${YOUTUBE_API()}&hl=en`);
                    if (!data.ok) {
                        throw new Error('Failed to fetch channel details');
                    }
                    const json = await data.json();
                    setChannelDetails(json.items[0]);
                } catch (error) {
                    console.error('Error fetching channel details:', error);
                }
            };
            fetchChannelDetails();
        }
    }, [videoDetails]);

    if (!videoDetails || !channelDetails) {
        return <div>Loading...</div>; // Provide loading indication
    }

    const { title, description, publishedAt, channelTitle } = videoDetails.snippet;
    const { likeCount, viewCount } = videoDetails.statistics;
    const { subscriberCount } = channelDetails.statistics;
    const { thumbnails } = channelDetails.snippet;

    const handleDesc = () => {
        setShowDescription(!showDescription);
    };

    return (
        !smallDeviceComments && (
            <div className='py-2 px-2 w-full dark:text-white text-black transition-all mmd:pt-[56.5%]'>
                <h1 className='font-bold text-xl sm:text-sm line-clamp-2'>{title}</h1>
                {!showDescription ? (
                    <div className='flex gap-2 text-base sm:text-sm text-[#434343] dark:text-[#919191] pt-1'>
                        <h1>{countFunction(viewCount)} views</h1>
                        <h1> • </h1>
                        <h1>{timeAgo(publishedAt)}</h1>
                        <div className='text-black dark:text-white font-semibold cursor-pointer' onClick={handleDesc}>...more</div>
                    </div>
                ) : (
                    <div className='w-full bg-[#7070703e] px-3 rounded-xl py-2 mt-2 sm:text-sm'>
                        <div className='flex gap-2 text-base sm:text-sm text-[#000] dark:text-[#fff] font-normal'>
                            <p>{countFunction(viewCount)} views</p>
                            <p> • </p>
                            <p>{timeAgo(publishedAt)}</p>
                        </div>
                        <div>
                            <h1 className='border-b border-black dark:border-white pb-1 text-xl font-medium pt-1'>Description</h1>
                            <p className='py-2' style={{ whiteSpace: 'pre-line', overflow: 'hidden' }}>{renderClickableLinks(description)}</p>
                        </div>
                        <div className='text-black dark:text-white font-semibold cursor-pointer' onClick={handleDesc}>Show Less</div>
                    </div>
                )}
                <ChannelAndSubs
                    profile={thumbnails.high.url}
                    name={channelTitle}
                    likes={likeCount}
                    subs={subscriberCount}
                />
            </div>
        )
    );
};

VideoInfoBox.propTypes = {
    Id: PropTypes.string.isRequired,
};

export default VideoInfoBox;
