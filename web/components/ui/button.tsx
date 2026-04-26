import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono font-semibold uppercase tracking-[0.06em] transition-all duration-140 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stamp focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50 border-2",
  {
    variants: {
      variant: {
        default:
          "bg-ink text-paper border-ink hover:bg-stamp hover:border-stamp hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[5px_5px_0_0_var(--ink)] active:translate-x-0 active:translate-y-0 active:shadow-none",
        destructive:
          "bg-stamp text-paper border-stamp hover:bg-stamp-deep hover:border-stamp-deep",
        outline:
          "border-ink bg-transparent text-ink hover:bg-hi hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_var(--ink)]",
        secondary:
          "border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
        ghost:
          "border-transparent bg-transparent text-ink hover:bg-paper-2",
        link: "border-transparent text-stamp underline underline-offset-4 hover:text-stamp-deep",
      },
      size: {
        default: "h-12 px-5 py-2 text-[13px]",
        sm: "h-9 px-3 text-[11px]",
        lg: "h-14 px-8 text-[14px]",
        xl: "h-16 px-10 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
