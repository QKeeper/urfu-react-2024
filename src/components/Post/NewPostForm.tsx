import { IPost } from "@/models";
import { forwardRef, useContext, useState } from "react";
import { ModalContext } from "../Modal/ModalContext";
import { API } from "@/api";
import { PostsActionsContext } from "./PostsContext";
import { SymbolIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Button from "@ui/Button/Button";
import Input from "../ui/Input/Input";
import Textarea from "../ui/Textarea/Textarea";
import { useForm } from "react-hook-form";

const Form = forwardRef(() => {
  type PostInputs = Pick<IPost, "title" | "description">;

  const { close } = useContext(ModalContext);
  const { createPost } = useContext(PostsActionsContext);
  const [isPending, setIsPending] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostInputs>();

  const onSubmit = handleSubmit(async (inputs) => {
    setIsPending(true);
    await API.Post.create(inputs).then(({ data }) => createPost?.(data));
    close?.();
  });

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex select-none flex-col gap-2"
    >
      <p>Create new Note</p>
      <Input
        disabled={isPending}
        placeholder="Title"
        {...register("title", {
          minLength: 2,
          maxLength: 70,
          required: true,
        })}
      />
      {errors.title && (
        <p className="text-sm text-red-500">
          {errors.title.type == "minLength" && "At least 2 characters required"}
          {errors.title.type == "maxLength" && "Up to 70 characters required"}
          {errors.title.type == "required" && "Title required"}
        </p>
      )}
      <Textarea
        disabled={isPending}
        placeholder="Description"
        className="h-24"
        {...register("description", { required: true })}
      />
      {errors.description && (
        <p className="text-sm text-red-500">
          {errors.description.type == "required" && "Description required"}
        </p>
      )}
      <div className="mt-4 flex justify-end gap-2">
        <Button
          type="button"
          onClick={close}
          disabled={isPending}
          variant="outline"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          Confirm
        </Button>
      </div>
      {isPending && (
        <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <SymbolIcon className="animate-spin" />
          </motion.div>
        </div>
      )}
    </form>
  );
});

export default Form;
