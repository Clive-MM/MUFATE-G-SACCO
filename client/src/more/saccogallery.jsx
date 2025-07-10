import React, { useEffect, useState } from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import axios from 'axios';

const SaccoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/gallery')  
      .then((res) => {
        const rawGallery = res.data.gallery || [];  
        const formatted = rawGallery.map(photo => ({
          src: photo.ImageURL,
          width: 4,
          height: 3,
          title: photo.Title,
          description: photo.Description,
        }));
        setPhotos(formatted);
      })
      .catch((err) => console.error('❌ Error fetching gallery photos:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', color: '#215732', marginBottom: '1.5rem' }}>
        SACCO Activities & Gallery
      </h2>
      <Gallery photos={photos} onClick={(_, { index }) => setIndex(index)} />
      {index >= 0 && (
        <Lightbox
          mainSrc={photos[index].src}
          nextSrc={photos[(index + 1) % photos.length]?.src}
          prevSrc={photos[(index + photos.length - 1) % photos.length]?.src}
          onCloseRequest={() => setIndex(-1)}
          onMovePrevRequest={() => setIndex((index + photos.length - 1) % photos.length)}
          onMoveNextRequest={() => setIndex((index + 1) % photos.length)}
          imageTitle={photos[index]?.title}
          imageCaption={photos[index]?.description}
        />
      )}
    </div>
  );
};

export default SaccoGallery;
