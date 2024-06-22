import{ Router } from "express";
import backPackController from "./controllers/backpackController";
import categoryController from "./controllers/categoryController";
import swapCardController from "./controllers/swapCardController";
import userController from "./controllers/userController";
import wishListController from "./controllers/wishlistController";
import userLocationController from "./controllers/userLocationController";
import firebaseAuth from "./middleware/firebaseAuthMiddleware";

const router: Router = Router();

// User routes
router.get("/users/:id", userController.getUser);

// Backpack routes
router.get("/backpack/:id", firebaseAuth, backPackController.getBackPack);
router.get("/backpack/item/:id", backPackController.getBackPackItem);
router.post("/backpack", firebaseAuth, backPackController.createBackPack);
router.put("/backpack/:id", firebaseAuth, backPackController.updateBackPack);
router.delete(
  "/backpack/:id",
  firebaseAuth,
  backPackController.deleteBackPack
);

// Category routes
router.get("/categories", categoryController.getAllCategories);

// Swap card routes
router.get("/swapcards/:uid", swapCardController.getSwapCards);

// Wishlist routes
router.get("/wishlist/:id", wishListController.getWishList);
router.post("/wishlist", wishListController.createWishList);
router.put("/wishlist/:id", wishListController.updateWishList);
router.delete("/wishlist/:id", wishListController.deleteWishList);

// Location routes
router.get("/users/:id/location", userLocationController.getUserLocation);
router.post("/users/location", userLocationController.addUserLocation);
router.put("/users/location", userLocationController.updateUserLocation);
router.delete("/users/location", userLocationController.deleteUserLocation);


export default router;