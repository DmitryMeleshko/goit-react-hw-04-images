export const PER_PAGE = 12;

export const apiServis = async (page, query) => {
  const MY_KEY = '32945444-fd4efa3e9426c87bced8145d3';
  const BASE_URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;
  const response = await fetch(BASE_URL);
  return response.ok
    ? response.json()
    : Promise.reject(new Error('Something went wrong, please try again'));
};