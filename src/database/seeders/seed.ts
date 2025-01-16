import { exec } from 'child_process';
import { config } from 'dotenv';

const runSeeders = async () => {
  try {
    config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

    console.log('Starting seed process...');

    // Jalankan file seeder satu per satu
    exec('ts-node src/database/seeders/seed-users.ts', (err, stdout) => {
      if (err) {
        console.error(`Error in users seeder: ${err.message}`);
        return;
      }
      console.log(stdout);
    });

    exec('ts-node src/database/seeders/seed-transactions.ts', (err, stdout) => {
      if (err) {
        console.error(`Error in transactions seeder: ${err.message}`);
        return;
      }
      console.log(stdout);
    });

    console.log('Seeding completed!');
  } catch (error) {
    console.error(`Error during seeding: ${error.message}`);
  }
};

runSeeders();
