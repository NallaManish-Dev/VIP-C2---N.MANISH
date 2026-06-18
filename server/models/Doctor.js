import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true
    },
    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
      trim: true,
      index: true
    },
    qualification: {
      type: String,
      required: [true, 'Qualification is required'],
      trim: true
    },
    experience: {
      type: Number,
      required: [true, 'Experience is required'],
      min: [0, 'Experience cannot be negative']
    },
    fees: {
      type: Number,
      required: [true, 'Consultation fee is required'],
      min: [0, 'Consultation fee cannot be negative']
    },
    image: {
      type: String,
      default: ''
    },
    availability: {
      type: Boolean,
      default: true
    },
    about: {
      type: String,
      default: '',
      trim: true
    },
    hospital: {
      type: String,
      default: '',
      trim: true
    }
  },
  { timestamps: true }
);

doctorSchema.index({ name: 'text', specialization: 'text' });

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
