import { ITransactions } from "../models/Transactions";
import RepoTransactions from "../repositories/RepoTransactions";

class ServiceTransactions {
  private _repoTransactions: RepoTransactions;

  constructor(repoTransactions: RepoTransactions) {
    this._repoTransactions = repoTransactions;
  }

  async list() {
    const transactions = await this._repoTransactions.list();
    return transactions;
  }

  async findById(id: number) {
    const transaction = this._repoTransactions.findById(id);
    return transaction;
  }

  async findByUserId(userId: number) {
    const transactions = await this._repoTransactions.findByUserId(userId);
    return transactions;
  }

  async create(params: ITransactions) {
    const transaction = await this._repoTransactions.create(params);
    return transaction;
  }

  async update(id: number, params: ITransactions) {
    const transaction = await this._repoTransactions.update(id, params);
    return transaction;
  }
}

export default ServiceTransactions;
