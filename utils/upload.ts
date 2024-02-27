import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

class Media {
  private _upload;
  private _storage;
  constructor() {
    this._upload = multer({ storage: multer.memoryStorage() });
    cloudinary.config({
      cloud_name: "dvncokkpe",
      api_key: "888438261624348",
      api_secret: "8eW-bqIShHq1hH6n9Ik8ql6sBCA",
    });
    this._storage = cloudinary;
  }

  get upload() {
    return this._upload;
  }

  get storage() {
    return this._storage;
  }
}

export default new Media();
