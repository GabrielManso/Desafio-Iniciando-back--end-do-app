import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionRepository);

    const checkTransaction = await transactionRepository.findOne(id);

    if (!checkTransaction) {
      throw new AppError('This transactions doesn`t exist');
    }

    await transactionRepository.remove(checkTransaction);
  }
}

export default DeleteTransactionService;
