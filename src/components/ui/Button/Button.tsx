import { cva, VariantProps } from "class-variance-authority";
import cn from "clsx";
import { ComponentProps } from "react";

export type ButtonVariantProps = VariantProps<typeof buttonStyles>;
export const buttonStyles = cva(
  "h-[30px] rounded-md px-3 text-sm outline-none duration-75 focus:border-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-950 text-neutral-50 ring-0 ring-neutral-950/50 focus:ring-2",
        outline: "text-neutral-950 border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type ButtonProps = ButtonVariantProps & ComponentProps<"button">;

export default function Button({ variant, className, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={cn(buttonStyles({ variant }), className)} />
  );
}
