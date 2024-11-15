import { changeActiveTopic } from '../../Utils/Store/stateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';

const TopicContainer = () => {
    // Redux hooks
    const dispatch = useDispatch();
    const CapsuleTopics = useSelector(store => store.state.homeTopics);

    // State and refs
    const [activeItem, setActiveItem] = useState(1);
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Handle item click
    const handleItemClick = (item, name) => {
        dispatch(changeActiveTopic(name))
        setActiveItem(item);
    };

    // Handle mouse events for dragging
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Adjust the sensitivity of dragging
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            ref={containerRef}
            className='px-4 py-3 text-base overflow-x-auto w-full whitespace-nowrap cursor-grab'
            style={{ 'msOverflowStyle': 'none', 'scrollbarWidth': 'none' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* Render capsule topics */}
            {CapsuleTopics.slice(1).map((name, index) => (
                <span
                    key={index}
                    className={`inline-block mr-3 px-5 py-1 bg-[#8b8b8b2c] dark:bg-[#4747478d] dark:hover:bg-[#474747fe] font-normal text-black rounded-xl select-none cursor-pointer hover:bg-[#8b8b8b87] text-sm ${activeItem === index + 1 ? 'dark:bg-[#ffffff] dark:text-black hover:bg-neutral-800 dark:hover:bg-white bg-neutral-800 text-white' : 'dark:text-white'}`}
                    onClick={() => handleItemClick(index + 1, name)}
                >
                    {name}
                </span>
            ))}
        </div>
    );
};

export default TopicContainer;
