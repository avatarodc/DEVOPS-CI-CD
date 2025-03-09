import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getStudents, 
  deleteStudent 
} from '../../services/api';

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Charger la liste des étudiants
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        setStudents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des données');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchStudents();
  }, []);
  
  // Supprimer un étudiant
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?');
    if (confirmDelete) {
      try {
        await deleteStudent(id);
        // Mettre à jour la liste des étudiants après suppression
        setStudents(students.filter(student => student._id !== id));
      } catch (err) {
        console.error('Erreur lors de la suppression', err);
        setError('Erreur lors de la suppression de l\'étudiant');
      }
    }
  };

  // Naviguer vers le formulaire de modification
  const handleEdit = (id) => {
    navigate(`/etudiants/modifier/${id}`);
  };

  // Naviguer vers le formulaire d'ajout
  const handleAddNew = () => {
    navigate('/etudiants/nouveau');
  };
  
  // Affichage de chargement
  if (loading) return (
    <div className="text-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
    </div>
  );
  
  return (
    <div className="container">
      <div className="row mb-3 align-items-center">
        <div className="col">
          <h2 className="mb-0">Gestion des Étudiants</h2>
        </div>
        <div className="col-auto">
          <button 
            className="btn btn-primary" 
            onClick={handleAddNew}
          >
            Ajouter un étudiant
          </button>
        </div>
      </div>
      
      {/* Affichage des erreurs */}
      {error && <div className="alert alert-danger">{error}</div>}
      
      {/* Liste des étudiants */}
      <div className="card">
        <div className="card-body">
          {students.length === 0 ? (
            <p className="text-center">Aucun étudiant enregistré</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student._id}>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.email}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button 
                            className="btn btn-sm btn-info" 
                            onClick={() => handleEdit(student._id)}
                          >
                            Modifier
                          </button>
                          <button 
                            className="btn btn-sm btn-danger" 
                            onClick={() => handleDelete(student._id)}
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentsList;