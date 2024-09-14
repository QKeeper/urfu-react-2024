import { cva, VariantProps } from "class-variance-authority";

export type TextareaVariantProps = VariantProps<typeof textareaStyles>;
export const textareaStyles = cva(
  "h-10 py-2 rounded border px-2 focus:border-gray-950 outline-none duration-75 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed text-sm",
  {
    variants: {},
    defaultVariants: {},
  },
);
