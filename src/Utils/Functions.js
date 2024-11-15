
// Function to format video duration
export const formatDuration = (duration) => {
    // If video is live, return 'Live'
    if (duration === 'P0D') return 'Live';

    // Parse duration into hours, minutes, and seconds
    const hours = parseInt(duration.match(/(\d+)H/)?.[1]) || 0;
    const minutes = parseInt(duration.match(/(\d+)M/)?.[1]) || 0;
    const seconds = parseInt(duration.match(/(\d+)S/)?.[1]) || 0;

    // Format time components into HH:MM:SS
    const formattedTime = [];
    if (hours > 0) formattedTime.push(String(hours).padStart(1, '0'));
    minutes === 0 ? formattedTime.push(String(minutes).padStart(2, '0')) : formattedTime.push(String(minutes).padStart(1, '0'));
    formattedTime.push(String(seconds).padStart(2, '0'));
    return formattedTime.join(':');
};

// Function to calculate time elapsed since a given date
export const timeAgo = (publishDate) => {
    // Define time intervals in seconds
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
    ];

    // Calculate seconds elapsed since publish date
    const seconds = Math.floor((new Date() - new Date(publishDate)) / 1000);

    // Iterate through intervals to find appropriate label
    for (const interval of intervals) {
        if (seconds >= interval.seconds) {
            const intervalCount = Math.floor(seconds / interval.seconds);
            return `${intervalCount} ${interval.label}${intervalCount === 1 ? '' : 's'} ago`;
        }
    }

    // Return formatted elapsed time
    return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
};

// Function to format view count
export const countFunction = (views) => {
    // If views is undefined, return '0'
    if (views === undefined) {
        return '0';
    }
    // If views are in millions, format as M
    else if (views >= 1000000) {
        return (views % 1000000 === 0 ? views / 1000000 : Math.round((views / 1000000) * 10) / 10) + 'M';
    }
    // If views are in thousands, format as K
    else if (views >= 1000) {
        return (views % 1000 === 0 ? views / 1000 : Math.round((views / 1000) * 10) / 10) + 'K';
    }
    // Otherwise, return views as string
    else {
        return views.toString();
    }
};

// Function to render clickable links in text
export const renderClickableLinks = (text) => {
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Split the text by URLs and replace them with anchor tags
    return text.split(urlRegex).map((part, index) => {
        if (part.match(urlRegex)) {
            return <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-500">{part}</a>;
        } else {
            return part;
        }
    });
};
