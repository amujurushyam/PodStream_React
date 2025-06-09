// import React from 'react';
// import axios from 'axios';

// const PodcastItem = ({ podcast, onDelete }) => {
//   const handleDelete = async () => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this podcast?');
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`/api/podcasts/${podcast._id}`);
//       onDelete(podcast._id);
//     } catch (error) {
//       console.error('Error deleting podcast:', error);
//       alert('Failed to delete podcast.');
//     }
//   };

//   return (
//     <div>
//       <h3>{podcast.title}</h3>
//       <audio controls src={podcast.audioUrl}></audio>
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// };

// export default PodcastItem;
