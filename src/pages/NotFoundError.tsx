import { Link, useRouteError } from "react-router-dom";
import notFoundErrorAnimation from "../assets/animations/404-not-found.json";
import LottieAnimation from "@/lib/LottieAnimation";
import { Button } from "@/components/ui/button";

export default function NotFoundError() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="grid p-14 place-items-center" id="error-page">
      <h1 className="font-black text-6xl text-primaryColor">Oops!</h1>
      <p className="text-zinc-600 font-medium mt-2">
        The page youre looking for doesnot exist.
      </p>
      <Link to="/">
        <Button className="mt-6" variant={"outline"}>
          Back To Home
        </Button>
      </Link>
      <div>
        <LottieAnimation
          width={600}
          height={400}
          animationData={notFoundErrorAnimation}
        ></LottieAnimation>
      </div>
    </div>
  );
}
