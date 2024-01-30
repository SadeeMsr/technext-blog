import Featured from "@/components/Featured";
import Feed from "@/components/Feed";

export default function Home() {

  return (
    <main className="min-h-screen flex">
        <Feed />
        <Featured />
    </main>
  )
}
