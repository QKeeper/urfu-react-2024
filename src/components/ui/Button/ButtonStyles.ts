import { cva, VariantProps } from "class-variance-authority";

export type ButtonVariantProps = VariantProps<typeof buttonStyles>;
export const buttonStyles = cva(
  "h-[28px] rounded-md px-3 text-sm outline-none duration-100 focus:border-gray-950 disabled:cursor-not-allowed disabled:opacity-50 select-none flex gap-1 items-center justify-center",
  {
    variants: {
      variant: {
        default:
          "bg-gray-950 text-gray-50 ring-0 ring-gray-500/50 focus:bg-gray-900 focus:ring-2",
        outline: "text-gray-950 border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
