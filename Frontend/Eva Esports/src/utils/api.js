import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Request interceptor for adding auth token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const register = (userData) => API.post('/auth/register', userData);
export const login = (credentials) => API.post('/auth/login', credentials);

// Teams API
export const fetchTeams = () => API.get('/teams');
export const createTeam = (teamData) => API.post('/teams', teamData);
export const updateTeam = (id, teamData) => API.put(`/teams/${id}`, teamData);
export const deleteTeam = (id) => API.delete(`/teams/${id}`);

// Tournaments API
export const fetchTournaments = () => API.get('/tournaments');
export const createTournament = (tournamentData) => API.post('/tournaments', tournamentData);

// Users API
export const fetchUserProfile = () => API.get('/users/profile');
export const updateUser = (id, userData) => API.put(`/users/${id}`, userData);

export default API;
