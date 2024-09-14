import { cva, VariantProps } from "class-variance-authority";

export type InputVariantProps = VariantProps<typeof inputStyles>;
export const inputStyles = cva(
  "h-10 rounded border px-2 focus:border-neutral-950 outline-none duration-75 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed text-sm",
  {
    variants: {},
    defaultVariants: {},
  },
);
