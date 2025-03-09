const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');
const Student = require('../models/Student');
const etudiantsRoutes = require('../routes/etudiantsRoutes');

// Mock de mongoose
jest.mock('../models/Student');

const app = express();
app.use(express.json());
app.use('/api/etudiants', etudiantsRoutes);

describe('Etudiants Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/etudiants - devrait retourner tous les étudiants', async () => {
    const mockStudents = [
      { _id: '1', nom: 'Diop', prenom: 'Fatou', matricule: 'ST001', email: 'fatou.diop@example.com' },
      { _id: '2', nom: 'Ndiaye', prenom: 'Abdou', matricule: 'ST002', email: 'abdou.ndiaye@example.com' }
    ];

    Student.find.mockResolvedValue(mockStudents);

    const response = await request(app).get('/api/etudiants');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockStudents);
    expect(Student.find).toHaveBeenCalledTimes(1);
  });

  test('GET /api/etudiants/:id - devrait retourner un étudiant spécifique', async () => {
    const mockStudent = { _id: '1', nom: 'Diop', prenom: 'Fatou', matricule: 'ST001', email: 'fatou.diop@example.com' };
    
    Student.findById.mockResolvedValue(mockStudent);

    const response = await request(app).get('/api/etudiants/1');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockStudent);
    expect(Student.findById).toHaveBeenCalledWith('1');
  });

  test('POST /api/etudiants - devrait créer un nouvel étudiant', async () => {
    const newStudent = { nom: 'Sow', prenom: 'Aminata', matricule: 'ST003', email: 'aminata.sow@example.com' };
    const savedStudent = { _id: '3', ...newStudent };
    
    const mockSave = jest.fn().mockResolvedValue(savedStudent);
    Student.mockImplementation(() => ({
      save: mockSave
    }));

    const response = await request(app)
      .post('/api/etudiants')
      .send(newStudent);
    
    expect(response.status).toBe(201);
    expect(response.body).toEqual(savedStudent);
  });

  test('PUT /api/etudiants/:id - devrait mettre à jour un étudiant', async () => {
    const studentId = '1';
    const updatedData = { nom: 'Diop', prenom: 'Fatou', matricule: 'ST001', email: 'fatou.diop@example.com' };
    const updatedStudent = { _id: studentId, ...updatedData };
    
    Student.findByIdAndUpdate.mockResolvedValue(updatedStudent);

    const response = await request(app)
      .put(`/api/etudiants/${studentId}`)
      .send(updatedData);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedStudent);
    expect(Student.findByIdAndUpdate).toHaveBeenCalledWith(studentId, updatedData, { new: true });
  });

});