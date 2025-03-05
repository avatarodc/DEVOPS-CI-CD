const Student = require('../models/Student');

// Récupérer tous les étudiants
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un étudiant par ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer un étudiant
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Mettre à jour un étudiant
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer un étudiant
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }
    res.json({ message: 'Étudiant supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};