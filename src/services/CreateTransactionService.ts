import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const transation = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    if (transation === null) {
      throw Error('Denied. Negative balance.');
    }

    return transation;
  }
}

export default CreateTransactionService;
