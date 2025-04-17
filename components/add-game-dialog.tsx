"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addGame } from "@/lib/actions";
import toast from "react-hot-toast";

interface AddGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const genreOptions = [
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Simulation",
  "Sports",
  "Racing",
  "Puzzle",
  "FPS",
  "Fighting",
  "Platformer",
  "Roguelike",
  "Other",
];

const platformOptions = [
  "PC",
  "PlayStation 5",
  "PlayStation 4",
  "Xbox Series X/S",
  "Xbox One",
  "Nintendo Switch",
  "Mobile",
  "All Platforms",
  "Other",
];

export function AddGameDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddGameDialogProps) {
  const [newGame, setNewGame] = useState({
    title: "",
    coverImage: "",
    addedDate: new Date().toISOString(),
  });

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleItem = (
    value: string,
    list: string[],
    setList: (val: string[]) => void
  ) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Debug log
      console.log("Submitting:", {
        title: newGame.title,
        coverImage: newGame.coverImage,
        platform: selectedPlatforms,
        genre: selectedGenres,
        addedDate: newGame.addedDate,
      });

      const result = await addGame({
        title: newGame.title,
        coverImage: newGame.coverImage,
        platform: selectedPlatforms,
        genre: selectedGenres,
        addedDate: newGame.addedDate,
      });

      if (result.success) {
        toast.success("Game added successfully!");
        onSuccess();
        onOpenChange(false);
        // Reset form
        setNewGame({
          title: "",
          coverImage: "",
          addedDate: new Date().toISOString(),
        });
        setSelectedGenres([]);
        setSelectedPlatforms([]);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Failed to submit game");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add a New Game</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input
              value={newGame.title}
              onChange={(e) =>
                setNewGame({ ...newGame, title: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label>Cover Image URL</Label>
            <Input
              value={newGame.coverImage}
              onChange={(e) =>
                setNewGame({ ...newGame, coverImage: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label>Genres</Label>
            <div className="flex flex-wrap gap-2">
              {genreOptions.map((genre) => {
                const selected = selectedGenres.includes(genre);
                return (
                  <div
                    key={genre}
                    onClick={() =>
                      toggleItem(genre, selectedGenres, setSelectedGenres)
                    }
                    className={`cursor-pointer flex items-center gap-2 px-3 py-1 rounded-full text-sm transition border
                      ${
                        selected
                          ? "border-yellow-100 bg-yellow-100 text-yellow-950"
                          : "border-black text-black"
                      }
                    `}
                  >
                    {" "}
                    <Image
                      src={
                        selected
                          ? "/assets/images/check.png"
                          : "/assets/images/add.png"
                      }
                      alt={selected ? "Selected" : "Add"}
                      width={16}
                      height={16}
                    />
                    <span>{genre}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Platforms */}
          <div className="grid gap-2">
            <Label>Platforms</Label>
            <div className="flex flex-wrap gap-2">
              {platformOptions.map((platform) => {
                const selected = selectedPlatforms.includes(platform);
                return (
                  <div
                    key={platform}
                    onClick={() =>
                      toggleItem(
                        platform,
                        selectedPlatforms,
                        setSelectedPlatforms
                      )
                    }
                    className={`cursor-pointer flex items-center gap-2 px-3 py-1 rounded-full text-sm transition border
                      ${
                        selected
                          ? "border-yellow-400 bg-yellow-100 text-yellow-800"
                          : "border-black text-black"
                      }
                    `}
                  >
                    <Image
                      src={
                        selected
                          ? "/assets/images/check.png"
                          : "/assets/images/add.png"
                      }
                      alt={selected ? "Selected" : "Add"}
                      width={16}
                      height={16}
                    />
                    <span>{platform}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add Game"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
