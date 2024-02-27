import { ICars } from "../models/Cars";
import RepoCars, { IParams } from "../repositories/RepoCars";

class ServiceCars {
  private _repoCars: RepoCars;

  constructor(repoCars: RepoCars) {
    this._repoCars = repoCars;
  }

  async list(params: IParams) {
    const cars = await this._repoCars.list(params);
    return cars;
  }

  async find(id: number) {
    const car = await this._repoCars.find(id);
    return car;
  }

  async update(id: number, params: ICars) {
    const car = await this._repoCars.update(id, params);
    return await this._repoCars.find(id);
  }

  async delete(id: number) {
    const car = await this._repoCars.delete(id);
    return car;
  }

  async create(params: ICars) {
    const car = await this._repoCars.create(params);
    return car;
  }
}

export default ServiceCars;
