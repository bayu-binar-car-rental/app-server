import Cars, { ICars } from "../models/Cars";

export interface IParams {
  search?: string;
  availableOnly?: boolean;
}

class RepoCars {
  constructor() {}

  async list(params?: IParams) {
    const cars = Cars.query();
    if (params?.availableOnly) {
      cars.where("available", true);
    }

    if (params?.search) {
      cars
        .whereILike("manufacture", `${params?.search}%`)
        .orWhereILike("model", `${params?.search}%`);
    }

    return await cars;
  }

  async find(id: number) {
    const car = await Cars.query().findById(id);
    return car;
  }

  async update(id: number, params: ICars) {
    const car = await Cars.query().findById(id).patch(params);
    return car;
  }

  async delete(id: number) {
    const car = await Cars.query().deleteById(id);
    return car;
  }

  async create(params: ICars) {
    const car = await Cars.query().insert({ ...params });
    return car;
  }
}

export default RepoCars;
