import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import { InstagramIcon, UploadIcon } from "lucide-react";
import { Link } from "@remix-run/react";

//const navigate = useNavigate();

export const meta: MetaFunction = () => {
  return [
    { title: "Flash bang!" },
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

function UploadPage() {
  const [filefile, setFile] = useState<any>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      console.log("File selected:", file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setFile(file);
      console.log("File dropped:", file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="justify-center align-center text-center">
      <h1 className="text-5xl text-bold m-1">Upload your image</h1>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
      <button
        className="text-left p-[200px] group shadow-xl border border-dashed hover:shadow-gray-400/50 rounded-xl transition-all duration-500"
        onClick={triggerFileInput}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col ">
          <UploadIcon className="h-12 w-12 justify-center align-center text-center " />
          <span>Drag your image here</span>
          <span className="text-xs">Or click to get select your image</span>
        </div>
      </button>
    </div>
  );
}

export default function Index() {
  const [hasUploaded, setHasUploaded] = useState<boolean>(false);
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      {hasUploaded ? null : <UploadPage />}
    </div>
  );
}
