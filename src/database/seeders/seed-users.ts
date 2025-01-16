import { connect, disconnect } from 'mongoose';
import { hash } from 'bcrypt';
import { UserModel } from '../../models/users.model';

const seedUsers = async () => {
  try {
    await connect(process.env.MONGO_URI as string);

    // Data user yang akan di-seed
    const users = [
      { email: 'user1@example.com', password: await hash('user1', 10) },
      { email: 'user2@example.com', password: await hash('user2', 10) },
      { email: 'user3@example.com', password: await hash('user3', 10) },
      { email: 'user4@example.com', password: await hash('user4', 10) },
      { email: 'user5@example.com', password: await hash('user5', 10) },
    ];

    // Hapus data user sebelumnya (jika ada)
    await UserModel.deleteMany({});
    console.log('Existing users deleted');

    // Tambahkan data user baru
    await UserModel.insertMany(users);
    console.log('Users seeded successfully');
  } catch (error) {
    console.log(`Error seeding users: ${error.message}`);
  } finally {
    await disconnect();
    console.log('Database connection closed');
  }
};

seedUsers();
