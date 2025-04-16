"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addGame } from "@/lib/actions"
import type { Game } from "@/lib/types"

interface AddGameDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function AddGameDialog({ open, onOpenChange, onSuccess }: AddGameDialogProps) {
  const [newGame, setNewGame] = useState<Omit<Game, "id">>({
    title: "",
    coverImage: "",
    platform: "",
    genre: "",
    addedDate: new Date().toISOString(),
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await addGame(newGame)

      if (result.success) {
        onOpenChange(false)
        setNewGame({
          title: "",
          coverImage: "",
          platform: "",
          genre: "",
          addedDate: new Date().toISOString(),
        })
        onSuccess()
      } else {
        setError(result.message || "Failed to add game")
      }
    } catch (err) {
      console.error("Error adding game:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Game</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {error && (
              <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">
                {error}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="title">Game Title</Label>
              <Input
                id="title"
                value={newGame.title}
                onChange={(e) =>
                  setNewGame({ ...newGame, title: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                type="url"
                placeholder="https://example.com/game-cover.jpg"
                value={newGame.coverImage}
                onChange={(e) =>
                  setNewGame({ ...newGame, coverImage: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to use placeholder image
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="platform">Platform</Label>
              <Select
                value={newGame.platform}
                onValueChange={(value) =>
                  setNewGame({ ...newGame, platform: value })
                }
                required
              >
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PC">PC</SelectItem>
                  <SelectItem value="PlayStation 5">PlayStation 5</SelectItem>
                  <SelectItem value="PlayStation 4">PlayStation 4</SelectItem>
                  <SelectItem value="Xbox Series X/S">
                    Xbox Series X/S
                  </SelectItem>
                  <SelectItem value="Xbox One">Xbox One</SelectItem>
                  <SelectItem value="Nintendo Switch">
                    Nintendo Switch
                  </SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="genre">Genre</Label>
              <Select
                value={newGame.genre}
                onValueChange={(value) =>
                  setNewGame({ ...newGame, genre: value })
                }
                required
              >
                <SelectTrigger id="genre">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Action">Action</SelectItem>
                  <SelectItem value="Adventure">Adventure</SelectItem>
                  <SelectItem value="RPG">RPG</SelectItem>
                  <SelectItem value="Strategy">Strategy</SelectItem>
                  <SelectItem value="Simulation">Simulation</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Racing">Racing</SelectItem>
                  <SelectItem value="Puzzle">Puzzle</SelectItem>
                  <SelectItem value="FPS">FPS</SelectItem>
                  <SelectItem value="Fighting">Fighting</SelectItem>
                  <SelectItem value="Platformer">Platformer</SelectItem>
                  <SelectItem value="Roguelike">Roguelike</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Game"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
