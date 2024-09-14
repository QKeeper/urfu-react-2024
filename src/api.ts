import axios from "axios";
import { IPost } from "./models";

const baseURL = import.meta.env.VITE_API;

const Post = {
  instance: axios.create({ baseURL: baseURL + "/posts" }),
  get: async function (id?: string) {
    return await this.instance.get<Required<IPost>[]>(id ? "?id=" + id : "");
  },
  create: async function (data: Pick<IPost, "title" | "description">) {
    return await this.instance.post<Required<IPost>>("", data);
  },
  put: async function (data: Omit<IPost, "id"> & Required<Pick<IPost, "id">>) {
    return await this.instance.put("?id=" + data.id, data);
  },
  delete: async function (id?: string) {
    return await this.instance.delete("?id=" + id);
  },
};

export const API = { Post };
