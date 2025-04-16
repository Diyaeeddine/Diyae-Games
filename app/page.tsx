import { GameLocker } from "@/components/game-locker";
import Header from "@/components/header";
export default function Home() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <Header />
      <GameLocker />
    </main>
  );
}
