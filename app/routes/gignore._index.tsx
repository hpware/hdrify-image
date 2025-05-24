import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import { InstagramIcon, UploadIcon, DownloadIcon } from "lucide-react";
import { Link } from "@remix-run/react";

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

type ConversionFormat = "jpeg" | "png" | "webp";

function UploadPage({ onFileSelect }: { onFileSelect: (file: File) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
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
      onFileSelect(file);
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
        <div className="flex flex-col items-center">
          <UploadIcon className="h-12 w-12 justify-center align-center text-center mb-4" />
          <span>Drag your image here</span>
          <span className="text-xs">Or click to select your image</span>
        </div>
      </button>
    </div>
  );
}

function ControlApp({
  selectedFormat,
  setSelectedFormat,
  quality,
  setQuality,
  convertImage,
  isConverting,
}: ControlAppProps) {
  return (
    <div>
      {/* Conversion Controls */}
      <div className="mt-6 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Conversion Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Output Format
            </label>
            <select
              value={selectedFormat}
              onChange={(e) =>
                setSelectedFormat(e.target.value as ConversionFormat)
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
            </select>
          </div>

          {selectedFormat !== "png" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full"
              />
            </div>
          )}
        </div>

        <button
          onClick={convertImage}
          disabled={isConverting}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
        >
          {isConverting ? "Converting..." : "Convert Image"}
        </button>
      </div>
    </div>
  );
}

function ConversionPage({
  file,
  onReset,
}: {
  file: File;
  onReset: () => void;
}) {
  const [selectedFormat, setSelectedFormat] =
    useState<ConversionFormat>("jpeg");
  const [quality, setQuality] = useState<number>(90);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [convertedImageUrl, setConvertedImageUrl] = useState<string>("");
  const [originalImageUrl, setOriginalImageUrl] = useState<string>("");

  useEffect(() => {
    // Create preview URL for original image
    const url = URL.createObjectURL(file);
    setOriginalImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const convertImage = async () => {
    setIsConverting(true);
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        // Convert to selected format
        const mimeType = `image/${selectedFormat}`;
        const qualityValue =
          selectedFormat === "png" ? undefined : quality / 100;

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setConvertedImageUrl(url);
            }
            setIsConverting(false);
          },
          mimeType,
          qualityValue
        );
      };

      img.src = originalImageUrl;
    } catch (error) {
      console.error("Conversion failed:", error);
      setIsConverting(false);
    }
  };

  const downloadImage = () => {
    if (convertedImageUrl) {
      const link = document.createElement("a");
      link.href = convertedImageUrl;
      link.download = `converted-image.${selectedFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetConverter = () => {
    if (convertedImageUrl) {
      URL.revokeObjectURL(convertedImageUrl);
    }
    if (originalImageUrl) {
      URL.revokeObjectURL(originalImageUrl);
    }
    onReset();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Convert Your Image</h1>
        <button
          onClick={resetConverter}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Upload New Image
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original Image */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Original Image</h2>
          <div className="border rounded-lg p-4">
            <img
              src={originalImageUrl}
              alt="Original"
              className="w-full h-auto max-h-64 object-contain rounded"
            />
            <p className="text-sm text-gray-600 mt-2">
              {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          </div>
        </div>

        {/* Converted Image */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Converted Image</h2>
          <div className="border rounded-lg p-4 min-h-[200px] flex items-center justify-center">
            {convertedImageUrl ? (
              <div className="w-full">
                <img
                  src={convertedImageUrl}
                  alt="Converted"
                  className="w-full h-auto max-h-64 object-contain rounded"
                />
                <button
                  onClick={downloadImage}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Download Converted Image
                </button>
              </div>
            ) : (
              <p className="text-gray-500">
                {isConverting ? "Converting..." : "No converted image yet"}
              </p>
            )}
          </div>
        </div>
      </div>
      <ControlApp
        selectedFormat={selectedFormat}
        setSelectedFormat={setSelectedFormat}
        quality={quality}
        setQuality={setQuality}
        convertImage={convertImage}
        isConverting={isConverting}
      />
    </div>
  );
}
/**
* selectedFormat: any,
setSelectedFormat: any,
quality: any,
setQuality: any,
convertImage: any,
isConverting: any
*/

export default function Index() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
  };

  const handleReset = () => {
    setUploadedFile(null);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4">
      {uploadedFile ? (
        <ConversionPage file={uploadedFile} onReset={handleReset} />
      ) : (
        <UploadPage onFileSelect={handleFileSelect} />
      )}
    </div>
  );
}
