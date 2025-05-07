import { redirect } from "next/navigation";
import LandingPage from "./(landingPage)/landingPage";
import { auth } from "@clerk/nextjs/server";

async function Home() {
  const { userId } = await auth();
  if (userId) {
    return redirect("/app");
  }
  return <LandingPage />;
}

export default Home;
