import axios from "axios";
import { IPost } from "./models";

const baseURL = import.meta.env.VITE_API;

export const Post = {
  instance: axios.create({ baseURL: baseURL + "/posts" }),
  get: async function (id?: string) {
    return await this.instance.get("/post" + (id ? "?id=" + id : ""));
  },
  create: async function (data: IPost) {
    return await this.instance.post("/post", { data });
  },
  patch: async function (
    data: Omit<IPost, "id"> & Required<Pick<IPost, "id">>
  ) {
    return await this.instance.patch("/post?id=" + data.id, { data });
  },
  delete: async function (id?: string) {
    return await this.instance.delete("/post?id=" + id);
  },
};
