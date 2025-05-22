import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";

const navigate = useNavigate();

export const meta: MetaFunction = () => {
  return [
    { title: "Home | HDRify your Image" },
    {
      name: "description",
      content: "Want to blow your friend's eye with HDR? Maybe yes.",
    },
    {
      name: "og:description",
      content: "Want to blow your friend's eye with HDR? Maybe yes.",
    },
  ];
};

function StartingComponent() {
  const sureClick = () => {
    localStorage.setItem("userConsent", "true");
  };
  return (
    <div className="flex flex-col absolute inset-0 justify-center align-center items-center">
      <h1 className="text-5xl text-bold text-transparent bg-gradient-to-tl from-sky-400 to-stone-400 bg-clip-text">
        HDRfrier
      </h1>
      <h3 className="text-lg text-gray-300">
        Are you sure you want to blow your friend's eyes?
      </h3>
      <button
        onClick={sureClick}
        className="bg-red-400 p-2 rounded-xl hover:bg-red-600 text-black transition-all duration-200"
      >
        Sure! Why not.
      </button>
      <span className="text-xs text-gray-500 mt-1">
        I'm not responsible for your actions, this is for funises only.
      </span>
    </div>
  );
}

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <StartingComponent />
    </div>
  );
}
