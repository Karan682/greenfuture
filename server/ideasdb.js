import dotenv from 'dotenv';
import fs from 'fs/promises';
import connectDB from './db/connect.js';
import Idea from './models/ideas.js';

dotenv.config();

const importData = async () => {
  try {
    // Connect to the database
    await connectDB(process.env.MONGO_URL);

    // Read the JSON file
    const data = await fs.readFile('./ideas.json', 'utf-8');
    const ideas = JSON.parse(data);

    // Insert data into the database
    await Idea.insertMany(ideas);

    console.log('Data imported successfully!');
    process.exit(0); // Exit the process
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1); // Exit with failure
  }
};

importData();
