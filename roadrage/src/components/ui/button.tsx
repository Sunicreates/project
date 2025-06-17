import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-200 dark:focus-visible:ring-pink-800 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:from-pink-600 hover:to-rose-600 hover:shadow-xl hover:scale-105",
        destructive: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:scale-105",
        outline: "border-2 border-pink-200 dark:border-pink-800 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 shadow-md hover:shadow-lg hover:scale-105 hover:border-pink-300 dark:hover:border-pink-700",
        secondary: "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 shadow-md hover:shadow-lg hover:scale-105",
        ghost: "text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20",
        link: "text-pink-600 dark:text-pink-400 underline-offset-4 hover:underline hover:text-pink-700 dark:hover:text-pink-300",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-10 px-6 py-2 text-xs",
        lg: "h-14 px-10 py-4 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }