const USER_KEY = "22971640-b13f0b0978f0830ddac6b5885";

function fetchImages(query, page) {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${USER_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error("Oops, something went wrong!"));
  });
}

const api = { fetchImages };

export default api;
