import cn from "clsx";
import { ComponentProps } from "react";
import { inputStyles, InputVariantProps } from "./InputStyles";

export type InputProps = InputVariantProps & ComponentProps<"input">;

export default function Input({ className, ...rest }: InputProps) {
  return <input {...rest} className={cn(inputStyles({}), className)} />;
}
