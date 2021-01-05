import React, { useEffect, useState } from 'react';
import PhotosLinkedList from './linkedList';

const Photos = ({ pics }) => {
  const linkedListPhotos = new PhotosLinkedList();
  const [currentPhoto, setCurrentPhoto] = useState(null);

  useEffect(() => {
    if (pics) {
      pics.forEach(pic => {
        linkedListPhotos.addNode(pic);
        setCurrentPhoto(linkedListPhotos.head);
      });
    } else {
      setCurrentPhoto('none');
    }
  }, []);

  if (currentPhoto) {
    if (currentPhoto === 'none') {
      return (
        <div 
          className='listingPhoto'
          style={{ 
            backgroundImage: `url(https://149368757.v2.pressablecdn.com/wp-content/uploads/Photos-Coming-Soon.jpg)`,
            borderBottom: '1px solid grey'
          }}
        >

        </div>
      )
    } else {
      return (
        <div 
          className='listingPhoto'
          style={{ backgroundImage: `url(${ currentPhoto.value })` }}
        >
          <img
            className='arrows'
            src="https://img.icons8.com/metro/26/000000/left.png"
            onClick={() => setCurrentPhoto(currentPhoto.prev)}
          />
          <img
            className='arrows'
            src="https://img.icons8.com/metro/26/000000/right.png"
            onClick={() => setCurrentPhoto(currentPhoto.next)}
          />
        </div>
      );
    }
  } else {
    return null;
  }
};

export default Photos;