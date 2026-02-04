import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-surface-secondary text-text-primary",
        success: "bg-green-500/20 text-green-600 dark:text-green-400",
        warning: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
        error: "bg-red-500/20 text-red-600 dark:text-red-400",
        info: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
        uber: "bg-green-500/20 text-green-600 dark:text-green-400",
        doordash: "bg-red-500/20 text-red-600 dark:text-red-400",
        accent: "bg-accent-light text-accent",
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
