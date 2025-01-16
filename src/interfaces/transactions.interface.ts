import mongoose, { Document } from 'mongoose';

// Interface untuk mendefinisikan struktur data Transaksi
export interface Transaction extends Document {
  userId: mongoose.Types.ObjectId; // Relasi ke User
  amount: number; // Jumlah uang
  category: 'Food' | 'Transportation' | 'Utilities' | 'Entertainment' | 'Salary' | 'Other'; // Kategori transaksi
  type: 'income' | 'expense'; // Jenis transaksi
  date: Date; // Tanggal transaksi
  description?: string; // Deskripsi tambahan
  status: 'pending' | 'completed' | 'failed'; // Status transaksi
  currency: string; // Mata uang
  convertedAmount?: number; // Nilai yang sudah dikonversi
}
