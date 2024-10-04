import { API } from "@/api";
import { IPost } from "@/models";
import { useContext, useState } from "react";
import { PostsActionsContext } from "./PostsContext";
import { ModalContext } from "../Modal/ModalContext";
import Button from "@ui/Button/Button";
import { SymbolIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";

export default function PostModal({ id, title, description }: Required<IPost>) {
  const { close } = useContext(ModalContext);
  const { deletePost, updatePost } = useContext(PostsActionsContext);
  const [isPendingSave, setIsPendingSave] = useState(false);
  const [isPendingDelete, setIsPendingDelete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<IPost, "title" | "description">>({
    defaultValues: { title, description },
  });

  async function handleDelete() {
    setIsPendingDelete(true);
    await API.Post.delete(id).then(() => deletePost?.(id));
    close?.();
  }

  const onSubmit = handleSubmit(async (data) => {
    setIsPendingSave(true);
    await API.Post.put({
      id,
      title: data.title,
      description: data.description,
    }).then(({ data }) => updatePost?.(data));
    close?.();
  });

  return (
    <form className="relative" onSubmit={onSubmit}>
      <input
        className="w-full text-xl font-medium outline-none"
        placeholder="Title"
        {...register("title", { required: true, minLength: 2, maxLength: 70 })}
      />
      {errors.title && (
        <p className="text-sm text-red-500">
          {errors.title.type == "minLength" && "At least 2 characters required"}
          {errors.title.type == "maxLength" && "Up to 70 characters required"}
          {errors.title.type == "required" && "Title required"}
        </p>
      )}
      <div className="max-h-96 overflow-y-auto">
        <TextareaAutosize
          placeholder="Description"
          className="w-full resize-none text-pretty text-sm outline-none"
          maxRows={8}
          {...register("description", { required: true })}
        />
      </div>
      {errors.description && (
        <p className="text-sm text-red-500">
          {errors.description.type == "required" && "Description required"}
        </p>
      )}
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
