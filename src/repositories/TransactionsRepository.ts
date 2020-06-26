import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransationDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create({
    title,
    value,
    type,
  }: CreateTransationDTO): Transaction | null {
    const transaction = new Transaction({ title, value, type });

    const total =
      transaction.type === 'income'
        ? this.balance.total + transaction.value
        : this.balance.total - transaction.value;

    if (total < 0) {
      return null;
    }

    if (total > this.balance.total) this.balance.income += transaction.value;
    else this.balance.outcome += transaction.value;

    this.balance.total = total;

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
