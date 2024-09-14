import { IPost } from "@/models";
import { ChangeEvent, useContext, useState } from "react";
import { ModalContext } from "../Modal/ModalContext";
import cn, { ClassValue } from "clsx";
import { API } from "@/api";
import { PostsActionsContext } from "./PostsContext";
import { SymbolIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Button from "@ui/Button/Button";

export default function Form() {
  type PostInputs = Pick<IPost, "title" | "description">;

  const { close } = useContext(ModalContext);
  const { createPost } = useContext(PostsActionsContext);
  const [inputs, setInputs] = useState<PostInputs>({
    title: "",
    description: "",
  });
  const [isPending, setIsPending] = useState<boolean>(false);

  const registerField = (
    key: keyof PostInputs,
    ...className: ClassValue[]
  ) => ({
    onChange: (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    ) => setInputs((prev) => ({ ...prev, [key]: e.target.value })),
    value: inputs[key],
    placeholder: key[0].toUpperCase() + key.slice(1).toLowerCase(),
    disabled: isPending,
    className: cn(
      "h-10 rounded border px-2 focus:border-neutral-950 outline-none duration-75 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed text-sm",
      className,
    ),
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
      <input required {...registerField("title")} autoFocus />
      <textarea required {...registerField("description", "h-24 py-2")} />
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
