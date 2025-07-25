
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://s66-albinshiju-capstone-eva-esports-gdvq.onrender.com/api',
  withCredentials: true, 
});


// Handle unauthorized
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location = '/profile';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const register = async (userData) => {
  const response = await API.post('/auth/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  return response.data;
};




// Teams API
export const fetchTeams = () => API.get('/teams');
export const createTeam = (teamData) => API.post('/teams', teamData);
export const updateTeam = (id, teamData) => API.put(`/teams/${id}`, teamData);
export const deleteTeam = (id) => API.delete(`/teams/${id}`);


// Tournaments API
export const fetchTournaments = () => API.get('/tournaments/');
export const fetchTournamentById = (id) => API.get(`/tournaments/${id}`);
export const createTournament = (tournamentData) => API.post('/tournaments', tournamentData);

// Users API
export const fetchUserProfile = () => API.get('/users/profile');
export const updateUser = (id, userData) => API.put(`/users/${id}`, userData);

export default API;
