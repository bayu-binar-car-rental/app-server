import { Router } from "express";

// Controllers
import ControllerCars from "../../controllers/ControllerCars";

// Services
import ServiceCars from "../../services/ServiceCars";

// Repositories
import RepoCars from "../../repositories/RepoCars";

const router = Router();

// Cars Objects
const repoCars = new RepoCars();
const serviceCars = new ServiceCars(repoCars);
const controllerCars = new ControllerCars(serviceCars);

// cars
router.get("/cars", controllerCars.list());
router.post("/cars", controllerCars.create());
router.get("/cars/:id", controllerCars.find());
router.patch("/cars/:id", controllerCars.update());
router.delete("/cars/:id", controllerCars.delete());

export default router;
