import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDatabase from '../config/database.js';
import User from '../models/User.js';

dotenv.config();

const seedAdmin = async () => {
  await connectDatabase();

  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error('ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD are required');
  }

  const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

  if (existingAdmin) {
    existingAdmin.name = ADMIN_NAME;
    existingAdmin.password = ADMIN_PASSWORD;
    existingAdmin.role = 'admin';
    await existingAdmin.save();
    console.log(`Admin updated: ${ADMIN_EMAIL}`);
  } else {
    await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin'
    });
    console.log(`Admin created: ${ADMIN_EMAIL}`);
  }

  await mongoose.connection.close();
};

seedAdmin().catch(async (error) => {
  console.error(error.message);
  await mongoose.connection.close();
  process.exit(1);
});
