function fetchImages(query, key, page = 1) {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error("Oops, something went wrong!"));
  });
}

const api = { fetchImages };

export default api;
