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
      className="flex h-28 items-center justify-center gap-2 rounded-md border p-2"
    >
      <PlusIcon />
      <p>New Note</p>
    </button>
  );
}
