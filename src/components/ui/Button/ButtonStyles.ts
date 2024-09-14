import { cva, VariantProps } from "class-variance-authority";

export type ButtonVariantProps = VariantProps<typeof buttonStyles>;
export const buttonStyles = cva(
  "h-[28px] rounded-md px-3 text-sm outline-none duration-75 focus:border-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 select-none flex gap-1 items-center justify-center",
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
