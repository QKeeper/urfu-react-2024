import cn from "clsx";
import { ComponentProps } from "react";
import { buttonStyles, ButtonVariantProps } from "./ButtonStyles";

export type ButtonProps = ButtonVariantProps & ComponentProps<"button">;

export default function Button({ variant, className, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={cn(buttonStyles({ variant }), className)} />
  );
}
