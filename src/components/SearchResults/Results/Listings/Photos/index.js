import React, { useEffect, useState } from 'react';
import PhotosLinkedList from './linkedList';

const Photos = ({ photos }) => {
  // const linkedListPhotos = new PhotosLinkedList();
  // const [currentPhoto, setCurrentPhoto] = useState(null);

  // useEffect(() => {
  //   photos.forEach(photo => {
  //     linkedListPhotos.addNode(photo);
  //     setCurrentPhoto(linkedListPhotos.head);
  //   });
  // }, []);

  // if (currentPhoto) {
  //   return (
  //     <div 
  //       className='listingPhoto'
  //       style={{ backgroundImage: `url(${ currentPhoto.value })` }}
  //     >
  //       <img
  //         className='arrows'
  //         src="https://img.icons8.com/metro/26/000000/left.png"
  //         onClick={() => setCurrentPhoto(currentPhoto.prev)}
  //       />
  //       <img
  //         className='arrows'
  //         src="https://img.icons8.com/metro/26/000000/right.png"
  //         onClick={() => setCurrentPhoto(currentPhoto.next)}
  //       />
  //     </div>
  //   );
  // } else {
    return null;
  // }
};

export default Photos;