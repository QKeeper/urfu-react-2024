import axios from "axios";
import { IPost } from "./models";

const baseURL = import.meta.env.VITE_API;

const Post = {
  instance: axios.create({ baseURL: baseURL + "/posts" }),
  get: async function (id?: string) {
    return await this.instance.get("" + (id ? "?id=" + id : ""));
  },
  create: async function (data: IPost) {
    return await this.instance.post("", data);
  },
  patch: async function (
    data: Omit<IPost, "id"> & Required<Pick<IPost, "id">>,
  ) {
    return await this.instance.patch("?id=" + data.id, data);
  },
  delete: async function (id?: string) {
    return await this.instance.delete("?id=" + id);
  },
};

export const API = { Post };
