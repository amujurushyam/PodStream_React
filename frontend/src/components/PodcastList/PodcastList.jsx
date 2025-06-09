// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import PodcastItem from './PodcastItem';

// const PodcastList = () => {
//   const [podcasts, setPodcasts] = useState([]);

//   useEffect(() => {
//     const fetchPodcasts = async () => {
//       try {
//         const response = await axios.get('/api/podcasts');
//         setPodcasts(response.data);
//       } catch (error) {
//         console.error('Error fetching podcasts:', error);
//       }
//     };

//     fetchPodcasts();
//   }, []);

//   const handleDelete = (deletedId) => {
//     setPodcasts(podcasts.filter((podcast) => podcast._id !== deletedId));
//   };

//   return (
//     <div>
//       {podcasts.map((podcast) => (
//         <PodcastItem key={podcast._id} podcast={podcast} onDelete={handleDelete} />
//       ))}
//     </div>
//   );
// };

// export default PodcastList;
