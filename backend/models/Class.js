const mongoose = require('mongoose');

// Vérifier si le modèle existe déjà
if (mongoose.models.Class) {
  module.exports = mongoose.model('Class');
} else {
  const ClassSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    courses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }]
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Class', ClassSchema);
}