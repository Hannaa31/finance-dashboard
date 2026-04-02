import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80": variant === "default",
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
          "border-transparent bg-red-100/50 text-red-500 dark:bg-red-500/10 dark:text-red-400 hover:bg-red-200/50 dark:hover:bg-red-500/20": variant === "destructive",
          "text-foreground": variant === "outline",
          "border-transparent bg-green-100/50 text-green-500 dark:bg-green-500/10 dark:text-green-400 hover:bg-green-200/50 dark:hover:bg-green-500/20": variant === "success", 
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
