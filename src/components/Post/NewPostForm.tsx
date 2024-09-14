import { IPost } from "@/models";
import { ChangeEvent, useContext, useState } from "react";
import { ModalContext } from "../Modal/ModalContext";
import { API } from "@/api";
import { PostsActionsContext } from "./PostsContext";
import { SymbolIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Button from "@ui/Button/Button";
import Input from "../ui/Input/Input";
import Textarea from "../ui/Textarea/Textarea";

export default function Form() {
  type PostInputs = Pick<IPost, "title" | "description">;

  const { close } = useContext(ModalContext);
  const { createPost } = useContext(PostsActionsContext);
  const [inputs, setInputs] = useState<PostInputs>({
    title: "",
    description: "",
  });
  const [isPending, setIsPending] = useState<boolean>(false);

  const registerField = (key: keyof PostInputs) => ({
    onChange: (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    ) => setInputs((prev) => ({ ...prev, [key]: e.target.value })),
    value: inputs[key],
    placeholder: key[0].toUpperCase() + key.slice(1).toLowerCase(),
    disabled: isPending,
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    await API.Post.create(inputs).then(({ data }) => createPost?.(data));
    close?.();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex select-none flex-col gap-2"
    >
      <p>Create new Note</p>
      <Input required {...registerField("title")} autoFocus />
      <Textarea required {...registerField("description")} className="h-24" />
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
}
