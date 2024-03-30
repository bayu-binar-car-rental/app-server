import Cars, { ICars } from "../models/Cars";

export interface IParams {
  search?: string;
  availableOnly?: string;
  size?: string;
  capacity?: string;
}

class RepoCars {
  constructor() {}

  async list(params?: IParams) {
    const cars = Cars.query().orderBy("updated_at", "desc");
    if (params?.availableOnly) {
      if (params.availableOnly === "true") {
        cars.where("available", true);
      }
    }

    if (params?.search) {
      cars
        .whereILike("manufacture", `${params?.search}%`)
        .orWhereILike("model", `${params?.search}%`);
    }

    if (params?.size) {
      if (params.size === "small") {
        cars.where("capacity", "<=", 2).andWhere("capacity", ">", 0);
      } else if (params.size === "medium") {
        cars.where("capacity", "<=", 4).andWhere("capacity", ">", 2);
      } else if (params.size === "large") {
        cars.where("capacity", ">", 4);
      }
    }

    if (params?.capacity) {
      cars.where("capacity", ">=", +params.capacity);
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

  async remove(id: number) {
    const car = await Cars.query().deleteById(id);
    return car;
  }

  async create(params: ICars) {
    const car = await Cars.query().insert({ ...params });
    return car;
  }
}

export default RepoCars;
