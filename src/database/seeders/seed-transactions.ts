import { connect, disconnect } from 'mongoose';
import { UserModel } from '../../models/users.model';
import { TransactionModel } from '../../models/transactions.model';

const seedTransactions = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI environment variable is not defined');
    }

    await connect(mongoUri as string);

    // Ambil user untuk reference
    const users = await UserModel.find();
    if (users.length === 0) {
      throw new Error('No users found. Please seed users first.');
    }

    // Data transaksi yang akan di-seed
    const transactions = users.flatMap(user => [
      {
        userId: user._id,
        amount: 500000,
        category: 'Salary',
        type: 'income',
        description: 'Gaji Bulanan',
        date: new Date(),
      },
      {
        userId: user._id,
        amount: 150000,
        category: 'Food',
        type: 'expense',
        description: 'Belanja Makanan',
        date: new Date(),
      },
    ]);

    // Hapus data transaksi sebelumnya (jika ada)
    await TransactionModel.deleteMany({});
    console.log('Existing transactions deleted');

    // Tambahkan data transaksi baru
    await TransactionModel.insertMany(transactions);
    console.log('Transactions seeded successfully');
  } catch (error) {
    console.log(`Error seeding transactions: ${error.message}`);
  } finally {
    await disconnect();
    console.log('Database connection closed');
  }
};

seedTransactions();
