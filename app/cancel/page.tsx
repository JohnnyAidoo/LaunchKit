import { ThumbsDown } from "lucide-react";
import Link from "next/link";

function Cancel() {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="card bg-base-200 text-neutral-content w-1/2 py-10 shadow-md border-2 border-error">
        <div className="card-body items-center text-center">
          <ThumbsDown size={50} className="text-error" />
          <h2 className="card-title">Owww!</h2>
          <p>Subscription was cancelled.</p>
          <div className="card-actions justify-end w-1/3">
            <Link className="w-full" href="/app">
              <button className="btn btn-primary w-full">Go To Home</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cancel;
