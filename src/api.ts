import axios from "axios";
import { IPost } from "./models";

const baseURL = import.meta.env.VITE_API;

const Post = {
  interceptor: axios.create({ baseURL: baseURL + "/posts" }),
  get: async function (id?: string) {
    return await this.interceptor.get<IPost[]>(id ? "?id=" + id : "");
  },
  create: async function (data: Pick<IPost, "title" | "description">) {
    return await this.interceptor.post<IPost>("", data);
  },
  put: async function (data: Pick<IPost, "id" | "title" | "description">) {
    return await this.interceptor.put<IPost>("?id=" + data.id, data);
  },
  delete: async function (id?: string) {
    return await this.interceptor.delete("?id=" + id);
  },
};

export const API = { Post };
