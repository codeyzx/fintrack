import { Router } from 'express';
import { TransactionController } from '@controllers/transactions.controller';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { CreateTransactionDto } from '@/dtos/transactions.dto';

export class TransactionRoute implements Routes {
  public path = '/transactions';
  public router = Router();
  public transactionController = new TransactionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.transactionController.getTransactions);
    this.router.get(`${this.path}/all`, AuthMiddleware, this.transactionController.getAllTransactions);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.transactionController.getTransactionById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateTransactionDto), this.transactionController.createTransaction);
    this.router.put(
      `${this.path}/:id`,
      AuthMiddleware,
      ValidationMiddleware(CreateTransactionDto, true),
      this.transactionController.updateTransaction,
    );
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.transactionController.deleteTransaction);
    this.router.get('/reports', AuthMiddleware, this.transactionController.getReport);
  }
}
