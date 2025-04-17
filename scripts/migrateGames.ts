import { connectToDatabase } from "@/lib/mongodb";
import { Game } from "@/lib/models/game";

async function migrateGames() {
  try {
    await connectToDatabase();

    const games = await Game.find({});

    for (const game of games) {
      let needsUpdate = false;

      // ✅ Convert genre from string → array
      if (typeof game.genre === "string") {
        game.genre = game.genre.split(",").map((g: string) => g.trim());
        needsUpdate = true;
      }

      // ✅ Convert platform from string → array
      if (typeof game.platform === "string") {
        game.platform = game.platform.split(",").map((p: string) => p.trim());
        needsUpdate = true;
      }

      if (needsUpdate) {
        await game.save();
        console.log(`✅ Migrated: ${game.title}`);
      }
    }

    console.log("🎉 Migration finished.");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  }
}

migrateGames();
