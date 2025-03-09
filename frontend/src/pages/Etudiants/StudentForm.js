import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  createStudent, 
  getStudentById, 
  updateStudent,
  getClasses 
} from '../../services/api';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    classId: ''
  });

  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  // Charger les classes et les données de l'étudiant
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger les classes
        const classesResponse = await getClasses();
        setClasses(classesResponse.data);

        // Si en mode édition, charger les données de l'étudiant
        if (isEditing) {
          const studentResponse = await getStudentById(id);
          setFormData(studentResponse.data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Erreur de chargement', error);
        setError('Impossible de charger les données');
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateStudent(id, formData);
      } else {
        await createStudent(formData);
      }
      navigate('/etudiants');
    } catch (error) {
      console.error('Erreur de soumission du formulaire', error);
      setError('Erreur lors de l\'enregistrement');
    }
  };

  const handleCancel = () => {
    navigate('/etudiants');
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2>{isEditing ? 'Modifier un Étudiant' : 'Ajouter un Étudiant'}</h2>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">Prénom</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Nom</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="classId" className="form-label">Classe</label>
                  <select
                    className="form-select"
                    id="classId"
                    name="classId"
                    value={formData.classId}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner une classe</option>
                    {classes.map(classe => (
                      <option key={classe._id} value={classe._id}>
                        {classe.name} {classe.level ? `- ${classe.level}` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="d-flex justify-content-between">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={handleCancel}
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                  >
                    {isEditing ? 'Mettre à jour' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;