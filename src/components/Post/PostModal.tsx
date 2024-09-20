import { API } from "@/api";
import { IPost } from "@/models";
import { useContext, useState } from "react";
import { PostsActionsContext } from "./PostsContext";
import { ModalContext } from "../Modal/ModalContext";
import Button from "@ui/Button/Button";
import { SymbolIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import TextareaAutosize from "react-textarea-autosize";

export default function PostModal({ id, title, description }: Required<IPost>) {
  const { close } = useContext(ModalContext);
  const { deletePost, updatePost } = useContext(PostsActionsContext);
  const [isPendingSave, setIsPendingSave] = useState(false);
  const [isPendingDelete, setIsPendingDelete] = useState(false);
  const [inputs, setInputs] = useState<Pick<IPost, "title" | "description">>({
    title,
    description,
  });

  async function handleDelete() {
    setIsPendingDelete(true);
    await API.Post.delete(id).then(() => deletePost?.(id));
    close?.();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPendingSave(true);
    await API.Post.put({
      id,
      title: inputs.title,
      description: inputs.description,
    }).then(({ data }) => updatePost?.(data));
    close?.();
  }

  return (
    <form className="relative" onSubmit={onSubmit}>
      <input
        required
        className="w-full text-xl font-medium outline-none"
        placeholder="Title"
        value={inputs.title}
        onChange={(e) =>
          setInputs((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <div className="max-h-96 overflow-y-auto">
        <TextareaAutosize
          required
          placeholder="Description"
          className="w-full resize-none text-pretty text-sm outline-none"
          value={inputs.description}
          onChange={(e) =>
            setInputs((prev) => ({ ...prev, description: e.target.value }))
          }
          maxRows={8}
        />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          className="w-16"
          onClick={handleDelete}
          disabled={isPendingDelete}
        >
          {!isPendingDelete ? (
            <span>Delete</span>
          ) : (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <SymbolIcon className="animate-spin" />
            </motion.div>
          )}
        </Button>
        <Button
          autoFocus
          type="submit"
          disabled={isPendingSave}
          className="w-16"
        >
          {!isPendingSave ? (
            <span>Save</span>
          ) : (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <SymbolIcon className="animate-spin" />
            </motion.div>
          )}
        </Button>
      </div>
    </form>
  );
}
