import VideoContainer from './VideoContainer';
import TopicContainer from './TopicContainer';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';

const MainContainer = () => {
  // Selectors
  const CapsuleTopics = useSelector(store => store.state.homeTopics);
  const showSideBar = useSelector(store => store.state.showSideBar);
  const activeTopic = useSelector(store => store.state.activeTopic);

  // Check if activeTopic is included in CapsuleTopics array
  const isTopicActive = CapsuleTopics.includes(activeTopic);

  // Effect to scroll to the top of VideoContainer when activeTopic changes
  useEffect(() => {
    const scrollToTop = () => {
      const videoContainer = document.getElementById('video-container');
      if (videoContainer) {
        videoContainer.scrollIntoView({ behavior: 'smooth' });
      }
    };

    scrollToTop();
  }, [activeTopic]);
  
  return (
    <div className={`${showSideBar ? 'pl-[210px] sm:pl-0 sm:max-h-screen' : ''} pt-[65px] w-full transition-all duration-300 dark:bg-neutral-900 min-h-screen overflow-auto mmd:pb-10`}>

      {/* Conditionally render TopicContainer if activeTopic is included in CapsuleTopics */}
      {isTopicActive && <TopicContainer />}
      <div id={!isTopicActive ? "video-container" : ''}>
        <VideoContainer />
      </div>

    </div>
  )
}

export default MainContainer;
