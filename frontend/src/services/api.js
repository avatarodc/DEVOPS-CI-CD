import axios from 'axios';

// Déterminer l'URL de base en fonction de l'environnement
const baseURL = process.env.NODE_ENV === 'production'
  ? '/api'  // En production, utiliser une URL relative au domaine actuel
  : 'http://localhost:5000/api';  // En développement, utiliser localhost

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