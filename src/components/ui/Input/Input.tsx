import cn from "clsx";
import { ComponentProps, forwardRef } from "react";
import { inputStyles, InputVariantProps } from "./InputStyles";

export type InputProps = InputVariantProps & ComponentProps<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }: InputProps, ref) => {
    return (
      <input {...rest} className={cn(inputStyles({}), className)} ref={ref} />
    );
  },
);

export default Input;
