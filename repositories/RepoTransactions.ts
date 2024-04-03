import Transactions, { ITransactions } from "../models/Transactions";

class RepoTransactions {
  constructor() {}

  async list() {
    const transactions = await Transactions.query();
    return transactions;
  }

  async findById(id: number) {
    const transaction = await Transactions.query().findById(id);
    return transaction;
  }

  async findByUserId(idUser: number) {
    const transactions = await Transactions.query().where(
      "idUser",
      "=",
      idUser
    );
    return transactions;
  }

  async create(params: ITransactions) {
    const transaction = await Transactions.query().insert({ ...params });
    return transaction;
  }

  async update(id: number, params: ITransactions) {
    const transaction = await Transactions.query().findById(id).patch(params);
    return transaction;
  }
}

export default RepoTransactions;
