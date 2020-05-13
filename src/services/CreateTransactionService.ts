import { getCustomRepository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

export default class CreateTransactionService {
  // eslint-disable-next-line consistent-return
  public async execute({
    category,
    title,
    type,
    value,
  }: Request): Promise<Transaction> {
    try {
      const transactionsRepository = getCustomRepository(
        TransactionsRepository,
      );
      const categoryRepository = getRepository(Category);

      let findCategoryWithTheSameName = await categoryRepository.findOne({
        where: {
          title: category,
        },
      });

      if (!findCategoryWithTheSameName) {
        findCategoryWithTheSameName = categoryRepository.create({
          title: category,
        });
      }
      await categoryRepository.save(findCategoryWithTheSameName);

      const transactions = transactionsRepository.create({
        category: findCategoryWithTheSameName,
        title,
        type,
        value,
      });

      await transactionsRepository.save(transactions);

      return transactions;
    } catch (err) {
      throw new Error('Transactions is undefined');
    }
  }
}
