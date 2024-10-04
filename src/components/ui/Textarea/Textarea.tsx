import cn from "clsx";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { textareaStyles, TextareaVariantProps } from "./TextareaStyles";

export type TextareaProps = TextareaVariantProps &
  ComponentPropsWithoutRef<"textarea">;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...rest }: TextareaProps, ref) => {
    return (
      <textarea
        {...rest}
        className={cn(textareaStyles({}), className)}
        ref={ref}
      />
    );
  },
);

export default Textarea;
