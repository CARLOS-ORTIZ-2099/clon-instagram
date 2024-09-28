import { instance } from "../libs/axiosConfig";

export const createfollower = (body) =>
  instance.post("/follower/followToUser", body);

export const unFollowUser = (id) =>
  instance.delete("/follower/delete-followed/" + id);

export const getFollowers = (id) =>
  instance.get("/follower/get-followers/" + id);

export const getFolloweds = (id) =>
  instance.get("/follower/get-followeds/" + id);
