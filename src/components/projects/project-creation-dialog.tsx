"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateProjectWizard from "./project-creation-wizard"

export default function CreateProjectDialog({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New AI Project</DialogTitle>
          <DialogDescription>
            Set up a new AI project with compliance frameworks and team collaboration
          </DialogDescription>
        </DialogHeader>
        <CreateProjectWizard onClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}