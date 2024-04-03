import { Router } from "express";
import media from "../../utils/upload";

// || CONTROLLERS
import ControllerCars from "../../controllers/ControllerCars";
import ControllerUsers from "../../controllers/ControllerUsers";
import ControllerTransactions from "../../controllers/ControllerTransactions";

// || SERVICES
import ServiceCars from "../../services/ServiceCars";
import ServiceUsers from "../../services/ServiceUsers";
import ServiceTransactions from "../../services/ServiceTransactions";

// || REPOSITORIES
import RepoCars from "../../repositories/RepoCars";
import RepoUsers from "../../repositories/RepoUsers";
import RepoTransactions from "../../repositories/RepoTransactions";

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

// Transactions Objects
const repoTransactions = new RepoTransactions();
const serviceTransactions = new ServiceTransactions(repoTransactions);
const controllerTransactions = new ControllerTransactions(serviceTransactions);

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

// transactions
router.get("/transactions", controllerTransactions.list());
router.post("/transactions", controllerTransactions.create());
router.get("/transactions/:id", controllerTransactions.findById());
router.post("/transactions/:id", controllerTransactions.update());
router.get("/transactions/user/:id", controllerTransactions.findByUserId());

export default router;
