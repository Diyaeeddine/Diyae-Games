import { GameLocker } from "@/components/game-locker"

export default function Home() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">My Game Locker</h1>
      <GameLocker />
    </main>
  )
}
