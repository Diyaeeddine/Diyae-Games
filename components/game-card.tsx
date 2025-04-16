"use client"

import Image from "next/image"
import { Download } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Game } from "@/lib/types"

interface GameCardProps {
  game: Game
  onUpdate?: () => void
}

export function GameCard({ game, onUpdate }: GameCardProps) {
  const handleInstall = () => {
    // You can implement actual installation logic here
    alert(`Installing ${game.title}...`)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-[2/3] relative overflow-hidden">
        <Image
          src={game.coverImage || "/placeholder.svg?height=300&width=200"}
          alt={game.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{game.title}</h3>
        <div className="text-sm text-muted-foreground space-y-1 mt-1">
          <p>{game.platform}</p>
          <p>{game.genre}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">Added {new Date(game.addedDate).toLocaleDateString()}</span>
        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={handleInstall}>
          <Download className="h-4 w-4 mr-1" />
          Install
        </Button>
      </CardFooter>
    </Card>
  )
}
