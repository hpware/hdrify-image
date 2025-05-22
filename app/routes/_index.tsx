import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useState, useEffect } from "react";
import { InstagramIcon } from "lucide-react";
import { Link } from "@remix-run/react";

//const navigate = useNavigate();

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

const platforms = [
  {
    name: "Instagram",
    to: "/instgram",
    icon: <InstagramIcon />,
  },
  {
    name: "Facebook",
    to: "/instgram",
    icon: <InstagramIcon />,
  },
];

export default function Index() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-5xl text-bold">Select your platform</h1>
      <div className="flex flex-row flex-wrap">
        {platforms.map(({ name, to, icon }) => {
          return (
            <Link to={to} key={name}>
              <div>
                <span>{name}</span>
                {icon}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
