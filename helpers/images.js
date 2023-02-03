import imageNotFound from '../assets/no_pic2.png';

export function getUserProfilePhoto(path) {
  if (!path || path === '') {
    return imageNotFound;
  }
  return { uri: path };
}

export function getUserCover(path) {
  if (!path || path === '') {
    return imageNotFound;
  }
  return path;
}