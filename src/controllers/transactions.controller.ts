import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { TransactionService } from '@services/transactions.service';
import { Transaction } from '@interfaces/transactions.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { HttpException } from '@/exceptions/HttpException';

export class TransactionController {
  public transactionService = Container.get(TransactionService);

  public getAllTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transactions: Transaction[] = await this.transactionService.findAllTransactions();
      res.status(200).json({ data: transactions, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTransactions = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id;

      const transactions = await this.transactionService.getTransactionsByUser(userId);

      if (!transactions || transactions.length === 0) {
        next(new HttpException(404, 'No transactions found for this user'));
      }

      res.status(200).json({ data: transactions, message: 'Transactions retrieved successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getTransactionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transactionId: string = req.params.id;
      const transaction: Transaction = await this.transactionService.findTransactionById(transactionId);
      res.status(200).json({ data: transaction, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTransaction = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const transactionData: Transaction = { ...req.body, userId: req.user._id };
      const newTransaction: Transaction = await this.transactionService.createTransaction(transactionData);
      res.status(201).json({ data: newTransaction, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transactionId: string = req.params.id;
      const transactionData: Transaction = req.body;
      const updatedTransaction: Transaction = await this.transactionService.updateTransaction(transactionId, transactionData);
      res.status(200).json({ data: updatedTransaction, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transactionId: string = req.params.id;
      const deletedTransaction: Transaction = await this.transactionService.deleteTransaction(transactionId);
      res.status(200).json({ data: deletedTransaction, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getReport = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id;
      const { month, year } = req.query;
      const report = await this.transactionService.getReport(userId, Number(month), Number(year));
      res.status(200).json({ data: report, message: 'Report successfully generated' });
    } catch (error) {
      next(error);
    }
  };
}
