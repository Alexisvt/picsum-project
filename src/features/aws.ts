import { Storage } from 'aws-amplify';

export async function getImageFromS3(key: string) {
  const imageURL = await Storage.get(key);
  return imageURL;
}

export async function fetchImages() {
  const imageKeys = await Storage.list('');
  const imageList = await Promise.all(
    imageKeys.map(async (k) => {
      const key = await Storage.get(k.key as string);
      return key;
    })
  );
  return imageList;
}

export async function uploadFile(file: File) {
  return await Storage.put(file.name, file, {
    contentType: 'image/png',
  });
}
