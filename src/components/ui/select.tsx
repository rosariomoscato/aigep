"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Root ref={ref} {...props}>
    <SelectPrimitive.Trigger
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border bg-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      )}
    >
      <SelectPrimitive.Value placeholder="Select an option" />
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
        <SelectPrimitive.Viewport className="p-1">
          <SelectPrimitive.Group>
            <SelectPrimitive.Label className="py-1.5 pl-8 pr-2 text-sm font-semibold">Frameworks</SelectPrimitive.Label>
            {children}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
))

Select.displayName = SelectPrimitive.Root.displayName

// Export the Select components for use in other components
const SelectTrigger = SelectPrimitive.Trigger
const SelectValue = SelectPrimitive.Value
const SelectContent = SelectPrimitive.Content
const SelectItem = SelectPrimitive.Item
const SelectGroup = SelectPrimitive.Group
const SelectLabel = SelectPrimitive.Label
const SelectPortal = SelectPrimitive.Portal
const SelectViewport = SelectPrimitive.Viewport

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectPortal,
  SelectViewport
}