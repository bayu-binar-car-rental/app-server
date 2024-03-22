import { Router } from "express";
import media from "../../utils/upload";

// || CONTROLLERS
import ControllerCars from "../../controllers/ControllerCars";
import ControllerUsers from "../../controllers/ControllerUsers";

// || SERVICES
import ServiceCars from "../../services/ServiceCars";
import ServiceUsers from "../../services/ServiceUsers";

// || REPOSITORIES
import RepoCars from "../../repositories/RepoCars";
import RepoUsers from "../../repositories/RepoUsers";

const router = Router();

// || OBJECTS
// Users Objects
const repoUsers = new RepoUsers();
const serviceUsers = new ServiceUsers(repoUsers);
const controllerUsers = new ControllerUsers(serviceUsers);

// Cars Objects
const repoCars = new RepoCars();
const serviceCars = new ServiceCars(repoCars);
const controllerCars = new ControllerCars(serviceCars);

// || ROUTES
// users
router.get("/auth", controllerUsers.list());
router.post("/auth", controllerUsers.create());
router.post("/auth/authorize-jwt", controllerUsers.check());
router.post("/auth/login", controllerUsers.login());

// cars
router.get("/", controllerCars.root());
router.get("/cars", controllerCars.list());
router.post("/cars", controllerCars.create());
router.get("/cars/:id", controllerCars.find());
router.patch("/cars/:id", controllerCars.update());
router.delete("/cars/:id", controllerCars.remove());
router.post(
  "/cars/upload",
  media.upload.single("image"),
  controllerCars.upload()
);

export default router;
