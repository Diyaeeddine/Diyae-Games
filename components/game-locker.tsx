"use client"

import { useEffect, useState } from "react"
import { PlusCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GameCard } from "@/components/game-card"
import { AddGameDialog } from "@/components/add-game-dialog"
import { getGames } from "@/lib/actions"
import type { Game } from "@/lib/types"

export function GameLocker() {
  const [games, setGames] = useState<Game[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddGameOpen, setIsAddGameOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadGames() {
      try {
        setIsLoading(true)
        const fetchedGames = await getGames()
        setGames(fetchedGames)
        setError(null)
      } catch (err) {
        console.error("Error loading games:", err)
        setError("Failed to load games. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    loadGames()
  }, [])

  const refreshGames = async () => {
    try {
      setIsLoading(true)
      const fetchedGames = await getGames()
      setGames(fetchedGames)
      setError(null)
    } catch (err) {
      console.error("Error refreshing games:", err)
      setError("Failed to refresh games. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredGames = games.filter((game) => game.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search games..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddGameOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Game
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">Loading games...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 border rounded-lg bg-red-50">
          <p className="text-red-500">{error}</p>
          <Button variant="outline" className="mt-4" onClick={refreshGames}>
            Try Again
          </Button>
        </div>
      ) : filteredGames.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">
            {searchQuery ? "No games match your search." : "No games found. Add some games to your locker!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} onUpdate={refreshGames} />
          ))}
        </div>
      )}

      <AddGameDialog open={isAddGameOpen} onOpenChange={setIsAddGameOpen} onSuccess={refreshGames} />
    </div>
  )
}
