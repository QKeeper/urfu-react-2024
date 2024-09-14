import { PlusIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { ModalContext } from "../Modal/ModalContext";
import Form from "./NewPostForm";

export default function NewPost() {
  const { open, isOpen } = useContext(ModalContext);

  return (
    <button
      type="button"
      disabled={isOpen}
      onClick={() => open?.(<Form />)}
      className="flex h-28 items-center justify-center gap-2 rounded-md border p-2 outline-none ring-0 ring-gray-100 duration-100 hover:bg-gray-50 focus:border-gray-300 focus:ring-4"
    >
      <PlusIcon />
      <p>New Note</p>
    </button>
  );
}
