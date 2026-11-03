import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils.ts";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A9EFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161618] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#4A9EFF] text-white shadow-sm hover:bg-[#3b82f6] shadow-[#4A9EFF]/20 hover:shadow-md hover:shadow-[#4A9EFF]/30",
        destructive:
          "bg-rose-500 text-white shadow-sm hover:bg-rose-600",
        outline:
          "border border-white/15 bg-transparent hover:bg-white/10 hover:border-white/25 text-white",
        secondary:
          "bg-white/10 text-white shadow-sm hover:bg-white/15 border border-white/5",
        ghost: "hover:bg-white/10 text-white/90 hover:text-white",
        link: "text-[#4A9EFF] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3.5 text-xs",
        lg: "h-11 rounded-lg px-7 text-base font-semibold",
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
