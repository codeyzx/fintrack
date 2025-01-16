import { Transaction } from '@/interfaces/transactions.interface';
import { Schema, model } from 'mongoose';

// Schema untuk Transaksi
const TransactionSchema: Schema<Transaction> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Nama koleksi untuk user
    required: true,
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [1, 'Amount must be greater than 0'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Food', 'Transportation', 'Utilities', 'Entertainment', 'Salary', 'Other'],
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['income', 'expense'],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  description: {
    type: String,
    maxlength: [250, 'Description cannot exceed 250 characters'],
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed',
  },
  currency: {
    type: String,
    default: 'IDR',
  },
});

// Indexing untuk performa pencarian
TransactionSchema.index({ userId: 1, date: -1 });

// Ekspor Model
export const TransactionModel = model<Transaction>('Transaction', TransactionSchema);
