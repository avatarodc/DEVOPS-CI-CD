import axios from 'axios';

const isRenderHosting = window.location.hostname.includes('render.com');

// Choisir l'URL de base en fonction de l'hôte
const baseURL = isRenderHosting || window.location.hostname !== 'localhost' 
  ? '/api'  // Sur Render ou tout autre hôte non-local
  : 'http://localhost:5000/api';  // Uniquement en local

console.log('API baseURL:', baseURL); 

// Créer une instance axios préconfigurée
const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Exemples de méthodes API que vous utiliserez dans vos composants
export const getStudents = () => {
  return api.get('/etudiants');
};

export const getStudentById = (id) => {
  return api.get(`/etudiants/${id}`);
};

export const createStudent = (studentData) => {
  return api.post('/etudiants', studentData);
};

export const updateStudent = (id, studentData) => {
  return api.put(`/etudiants/${id}`, studentData);
};

export const deleteStudent = (id) => {
  return api.delete(`/etudiants/${id}`);
};

export default api;