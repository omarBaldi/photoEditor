import {
  getDownloadURL,
  listAll,
  ref,
  StorageReference,
  UploadResult,
  uploadString,
} from 'firebase/storage';
import { storage } from '../config/firebaseInitialize';

export const uploadImagetoFirebase = async (
  currentImageName: string,
  imageSrcDownload: string
): Promise<UploadResult> => {
  const storageRef = ref(storage, currentImageName);
  return await uploadString(storageRef, imageSrcDownload as string, 'data_url');
};

export const getImagesURLFromDatabase = async (): Promise<
  {
    imageDownloadSrc: string;
    name: string;
  }[]
> => {
  const listRef: StorageReference = ref(storage);

  const { items } = await listAll(listRef);
  const imagesData = await Promise.all(
    items.map(async (currentItemRef) => {
      return {
        imageDownloadSrc: await getDownloadURL(
          ref(storage, currentItemRef.name)
        ),
        name: currentItemRef.name,
      };
    })
  );

  return imagesData;
};
