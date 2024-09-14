import { API } from "@/api";
import { IPost } from "@/models";
import { useContext, useState } from "react";
import { PostsActionsContext } from "./PostsContext";
import { ModalContext } from "../Modal/ModalContext";
import Button from "@ui/Button/Button";
import { SymbolIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

export default function PostModal({ id, title, description }: Required<IPost>) {
  const { close } = useContext(ModalContext);
  const { deletePost } = useContext(PostsActionsContext);
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    setIsPending(true);
    await API.Post.delete(id).then(() => deletePost?.(id));
    close?.();
  }

  return (
    <div className="relative">
      <p className="font-bold">{title}</p>
      <div className="max-h-96 overflow-y-auto">
        <p className="text-pretty text-sm">{description}</p>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button type="button" onClick={handleDelete} variant="outline">
          Delete
        </Button>
        <Button variant="outline">Edit</Button>
      </div>
      {isPending && (
        <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <SymbolIcon className="animate-spin" />
          </motion.div>
        </div>
      )}
    </div>
  );
}
