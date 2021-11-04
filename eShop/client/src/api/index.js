import axios from 'axios';

const url_posts = 'http://localhost:5000/posts';
const url_sales = 'http://localhost:5000/sales';

export const fetchPosts = () => axios.get(url_posts);
export const createPost = (newPost) => axios.post(url_posts, newPost);
export const likePost = (id) => axios.patch(`${url_posts}/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`${url_posts}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url_posts}/${id}`);
