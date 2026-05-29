import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutingFriendReqs, getRecommendedUsers, sendFriendRequest } from "../controllers/user.controller";

const router = express.Router();
//applying auth middleware to all routes
router.use(protectRoute);
router.get("/",getRecommendedUsers);
router.get("/friends",getMyFriends);



router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-request",getFriendRequests);

router.get("/outgoing-friend-request",getOutingFriendReqs);


export default router;