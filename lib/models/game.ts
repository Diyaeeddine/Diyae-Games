import mongoose, { Schema } from "mongoose"

export interface GameDocument extends mongoose.Document {
  title: string
  coverImage: string
  platform: string
  genre: string
  addedDate: string
}

const GameSchema = new Schema<GameDocument>({
  title: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    default: "/placeholder.svg?height=300&width=200",
  },
  platform: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  addedDate: {
    type: String,
    default: () => new Date().toISOString(),
  },
})

// Check if the model is already defined to prevent overwriting during hot reloads
export const Game = mongoose.models.Game || mongoose.model<GameDocument>("Game", GameSchema)
