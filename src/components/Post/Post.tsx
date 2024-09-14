import { IPost } from "@/models";
import { toRelativeDate } from "@/utils";
import { useContext } from "react";
import { ModalContext } from "../Modal/ModalContext";
import PostModal from "./PostModal";

export default function Post(props: Required<IPost>) {
  const { title, description, createdAt } = props;
  const { open } = useContext(ModalContext);

  return (
    <button
      className="flex h-28 flex-col rounded-md border p-2"
      onClick={() => open?.(<PostModal {...props} />)}
    >
      <h2 className="line-clamp-1 font-bold">{title}</h2>
      <p className="line-clamp-2 text-sm">{description}</p>
      <p className="mt-auto select-none text-right text-[12px] text-neutral-400">
        {toRelativeDate(createdAt)}
      </p>
    </button>
  );
}
