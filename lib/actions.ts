"use server";

import { connectToDatabase } from "./mongodb";
import { Game } from "./models/game";
import { revalidatePath } from "next/cache";
import type { Game as GameType } from "./types";

export async function getGames(): Promise<GameType[]> {
  try {
    await connectToDatabase();
    const games = await Game.find({}).sort({ addedDate: -1 }).lean();

    return games.map((game) => ({
      id: game._id.toString(),
      title: game.title,
      coverImage: game.coverImage,
      platform: game.platform,
      genre: game.genre,
      addedDate: game.addedDate,
    }));
  } catch (error) {
    console.error("❌ Failed to fetch games:", error);
    return [];
  }
}

export async function addGame(
  game: Omit<GameType, "id">
): Promise<{ success: boolean; message: string; game?: GameType }> {
  try {
    await connectToDatabase();

    // Ensure platform and genre are properly formatted arrays
    const platforms = Array.isArray(game.platform)
      ? game.platform.filter(Boolean).map((p) => String(p).trim())
      : [String(game.platform).trim()].filter(Boolean);

    const genres = Array.isArray(game.genre)
      ? game.genre.filter(Boolean).map((g) => String(g).trim())
      : [String(game.genre).trim()].filter(Boolean);

    // Validate required fields
    if (!game.title || platforms.length === 0 || genres.length === 0) {
      throw new Error("Missing required fields");
    }

    const newGame = new Game({
      title: game.title.trim(),
      coverImage: game.coverImage?.trim() || "/placeholder.svg",
      platform: platforms,
      genre: genres,
      addedDate: game.addedDate || new Date().toISOString(),
    });

    const savedGame = await newGame.save();
    revalidatePath("/");

    return {
      success: true,
      message: "Game added successfully",
      game: {
        id: savedGame._id.toString(),
        title: savedGame.title,
        coverImage: savedGame.coverImage,
        platform: savedGame.platform,
        genre: savedGame.genre,
        addedDate: savedGame.addedDate,
      },
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to add game. Please try again.",
    };
  }
}
