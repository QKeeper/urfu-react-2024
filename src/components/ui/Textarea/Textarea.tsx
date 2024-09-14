import cn from "clsx";
import { ComponentProps } from "react";
import { textareaStyles, TextareaVariantProps } from "./TextareaStyles";

export type TextareaProps = TextareaVariantProps & ComponentProps<"textarea">;

export default function Textarea({ className, ...rest }: TextareaProps) {
  return <textarea {...rest} className={cn(textareaStyles({}), className)} />;
}
