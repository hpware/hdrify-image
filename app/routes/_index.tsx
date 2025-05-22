import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | HDRify your Image" },
    {
      name: "description",
      content: "Want to blow your friend's eye with HDR? Maybe yes.",
    },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <StartingComponent />
    </div>
  );
}

function StartingComponent() {
  return (
    <div className="flex flex-col absolute inset-0 justify-center align-center items-center">
      <h1 className="text-3xl text-bold text-transparent bg-gradient-to-tl from-sky-400 to-stone-400 bg-clip-text">
        HDRfrier
      </h1>
      <h3 className="text-lg text-gray-300">AHHHHHH, WHY IS THIS SO BRIGHT?</h3>
    </div>
  );
}
