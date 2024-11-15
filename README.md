
# YouTube Clone

[![youtube-dark-7cf3282c2d794054d9b1.png](https://i.postimg.cc/B6SsWpQ5/youtube-dark-7cf3282c2d794054d9b1.png)](https://postimg.cc/HJhFXQMj)

This project is a YouTube clone developed using React, Redux, and the YouTube Data API. It aims to replicate some of the core functionalities of the popular video-sharing platform YouTube.

## Features


### 1. Video Viewing
![Screenshot 1](https://i.postimg.cc/Y0RXmN13/Screenshot-2024-05-14-214228.png)

- Users can watch videos from various channels.
- Video details such as title, channel name, view count, and publish date are displayed.
- Video duration is shown on the thumbnail.
- Thumbnail images are fetched from the YouTube API.


### 2. Topic Navigation
![Screenshot 2](https://i.postimg.cc/MZ4ktqRm/Screenshot2024-05-1421450.jpg)

- Users can navigate through different topics to explore related videos.
- Topic containers dynamically load videos based on the selected topic.
- Topics include popular videos, live videos, and user-defined topics.

### 3. Video Search
![Screenshot 3](https://i.postimg.cc/L4JwJw7Y/Screenshot2024-05-1421463.jpg)

- Users can search for videos using the search bar.
- Search results are displayed dynamically as the user types.
- Relevant videos are fetched from the YouTube API based on the search query

### 4. Like, Dislike, Download, and Share. (Not Functional)
![Screenshot 4](https://i.postimg.cc/PNGmJP74/Screenshot2024-05-1421431.jpg)

- Subscribed channels are displayed with their subscriber count.
- Like and dislike counts are displayed for each video.


### 5. Video Suggestions
![Screenshot 5](https://i.postimg.cc/6pyHyvTr/Screenshot-2024-05-14-214725.png)

- Suggested videos are displayed based on the currently watched video.
- Random popular videos are fetched to fill the suggestion list.
- Suggestions are refreshed upon changing the video.



### 6. Comment Threads
![Screenshot 6](https://i.postimg.cc/SNQ1b5ht/Screenshot-2024-05-14-214354.png)

- Users can view and engage in comment threads associated with videos.
- Comments are fetched from the YouTube API and displayed in a threaded format.

### 7. Responsive Design

![Screenshot 6](https://i.postimg.cc/8zHQDWJT/Be-Funky-collage.jpg)

- The application is responsive and adjusts layout based on screen size.
- Supports various devices including desktops, tablets, and mobile phones.

## Folder Structure

```
src/
│
├── components/
│   ├── ChannelAndSubs.js
│   ├── CommentThread.js
│   ├── MainContainer.js
│   ├── TopicContainer.js
│   ├── VideoCard.js
│   ├── VideoContainer.js
│   ├── VideoInfoBox.js
│   ├── VideoSuggestion.js
│   └── WatchVideoContainer.js
│
├── images/
│   └── video-placeholder.png
│
├── Utils/
│   ├── Functions.js
│   ├── Store/
│   │   └── stateSlice.js
│   └── constants.js
│
├── App.js
├── index.js
└── README.md
```

- **components/**: Contains all React components used in the application.
- **images/**: Stores images used in the project, including placeholder images.
- **Utils/**: Contains utility files such as functions, constants, and Redux store configuration.
  - **Functions.js**: Includes helper functions used throughout the application.
  - **Store/**: Stores Redux state management files.
    - **stateSlice.js**: Defines Redux slice for managing application state.
  - **constants.js**: Defines constants such as API keys and endpoints.
- **App.js**: Main entry point of the React application.
- **index.js**: Entry point for rendering the React application.
- **README.md**: Project documentation file.

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server with `npm start`.
5. Access the application in your web browser at `http://localhost:3000`.
