import axios from 'axios';

const API = axios.create({ baseURL: 'https://e-shop-mintic.netlify.app' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const fetchSale = (id) => API.get(`/sales/${id}`);
export const fetchSales = (page) => API.get(`/sales?page=${page}`);
export const fetchSalesByCreator = (name) => API.get(`/sales/creator?name=${name}`);
export const fetchSalesBySearch = (searchQuery) => API.get(`/sales/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createSale = (newSale) => API.post('/sales', newSale);
export const updateSale = (id, updatedSale) => API.patch(`/sales/${id}`, updatedSale);
export const deleteSale = (id) => API.delete(`/sales/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
