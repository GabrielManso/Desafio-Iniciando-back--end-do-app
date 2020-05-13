import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
export default class TransactionsRepository extends Repository<Transaction> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getBalance({ type, value }: Transaction): Promise<Balance> {
    let getIncomeValue = 0;
    let getOutcomeValue = 0;
    // eslint-disable-next-line no-param-reassign
    const getIncomeType = await this.find({ where: type = 'income' });

    if (getIncomeType) {
      getIncomeValue = value;
    }

    // eslint-disable-next-line no-param-reassign
    const getOutcomeType = await this.find({ where: type = 'outcome' });
    if (getOutcomeType) {
      getOutcomeValue = value;
    }

    const getTotal = getIncomeValue - getOutcomeValue;

    if (getTotal < 0) {
      throw new Error(
        'You can`t make this transaction. Please add an income transaction first',
      );
    }

    return {
      income: getIncomeValue,
      outcome: getOutcomeValue,
      total: getTotal,
    };
  }
}
