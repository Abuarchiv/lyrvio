import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-ink text-paper",
        secondary:
          "bg-paper-2 text-ink border border-rule-soft",
        outline: "border-2 border-ink text-ink bg-transparent",
        success: "bg-sage text-paper",
        stamp: "bg-stamp text-paper",
        yellow: "bg-hi text-ink",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
