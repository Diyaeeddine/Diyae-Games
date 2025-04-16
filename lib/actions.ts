"use server"

import { connectToDatabase } from "./mongodb"
import { Game } from "./models/game"
import { revalidatePath } from "next/cache"
import type { Game as GameType } from "./types"

export async function getGames(): Promise<GameType[]> {
  try {
    await connectToDatabase()
    const games = await Game.find({}).sort({ addedDate: -1 }).lean()

    return games.map((game) => ({
      id: game._id.toString(),
      title: game.title,
      coverImage: game.coverImage,
      platform: game.platform,
      genre: game.genre,
      addedDate: game.addedDate,
    }))
  } catch (error) {
    console.error("Failed to fetch games:", error)
    return []
  }
}

export async function addGame(
  game: Omit<GameType, "id">,
): Promise<{ success: boolean; message: string; game?: GameType }> {
  try {
    await connectToDatabase()

    const newGame = new Game({
      title: game.title,
      coverImage: game.coverImage || "/placeholder.svg?height=300&width=200",
      platform: game.platform,
      genre: game.genre,
      addedDate: game.addedDate,
    })

    await newGame.save()

    revalidatePath("/")

    return {
      success: true,
      message: "Game added successfully",
      game: {
        id: newGame._id.toString(),
        title: newGame.title,
        coverImage: newGame.coverImage,
        platform: newGame.platform,
        genre: newGame.genre,
        addedDate: newGame.addedDate,
      },
    }
  } catch (error) {
    console.error("Failed to add game:", error)
    return { success: false, message: "Failed to add game" }
  }
}
