import mongoose from 'mongoose';

const smeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
}, { timestamps: true });

export default mongoose.model('SME', smeSchema);
