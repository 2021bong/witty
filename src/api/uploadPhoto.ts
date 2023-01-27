import { PhotosType } from '../utils/types';

type setState = React.Dispatch<React.SetStateAction<string[] | []>>;

const uploadPhotos = (photos: PhotosType, setUploadImgUrls: setState) => {
  const formData = new FormData();
  for (let i = 0; i < photos.length; i += 1) {
    formData.append('file', photos[i].file ?? '');
    formData.append(
      'upload_preset',
      import.meta.env.VITE_CLOUDINARY_PRESET_KEY
    );

    fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => setUploadImgUrls((prev) => [...prev, res.url]));
  }
};

export default uploadPhotos;
