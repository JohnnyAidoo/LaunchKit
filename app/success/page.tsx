import { Smile } from "lucide-react";
import Link from "next/link";

function Succes() {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="card bg-base-200 text-neutral-content w-1/2 py-10 shadow-md border-2 border-success">
        <div className="card-body items-center text-center">
          <Smile size={50} className="text-success" />
          <h2 className="card-title">Thank you for subscribing!</h2>
          <p>You have successfully subscribed to our plan.Enjoy The App</p>
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

export default Succes;
