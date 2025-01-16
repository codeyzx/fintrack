import { Service } from 'typedi';
import { Transaction } from '@interfaces/transactions.interface';
import { TransactionModel } from '@models/transactions.model';
import { HttpException } from '@exceptions/HttpException';

@Service()
export class TransactionService {
  public async findAllTransactions(): Promise<Transaction[]> {
    const transactions: Transaction[] = await TransactionModel.find();
    return transactions;
  }

  public async getTransactionsByUser(userId: string): Promise<any[]> {
    const transactions: any[] = await TransactionModel.find({ userId });
    return transactions;
  }

  public async findTransactionById(transactionId: string): Promise<Transaction> {
    const transaction: Transaction = await TransactionModel.findOne({ _id: transactionId });
    if (!transaction) throw new HttpException(404, 'Transaction not found');

    return transaction;
  }

  public async createTransaction(transactionData: Transaction): Promise<Transaction> {
    const transaction: Transaction = await TransactionModel.create(transactionData);
    return transaction;
  }

  public async updateTransaction(transactionId: string, transactionData: Transaction): Promise<Transaction> {
    const updatedTransaction: Transaction = await TransactionModel.findByIdAndUpdate(transactionId, transactionData, { new: true });
    if (!updatedTransaction) throw new HttpException(404, 'Transaction not found');

    return updatedTransaction;
  }

  public async deleteTransaction(transactionId: string): Promise<Transaction> {
    const deletedTransaction: Transaction = await TransactionModel.findByIdAndDelete(transactionId);
    if (!deletedTransaction) throw new HttpException(404, 'Transaction not found');

    return deletedTransaction;
  }

  public async getReport(userId: string, month: number, year: number): Promise<any> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const [report] = await TransactionModel.aggregate([
      {
        $match: {
          userId,
          date: { $gte: startDate, $lt: endDate }, // Filter transaksi pada bulan tertentu
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0],
            },
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalIncome: 1,
          totalExpense: 1,
          balance: { $subtract: ['$totalIncome', '$totalExpense'] },
        },
      },
    ]);

    return (
      report || {
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
      }
    );
  }
}
