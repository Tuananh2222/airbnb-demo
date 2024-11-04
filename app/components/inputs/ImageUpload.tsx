"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  let cloudinary: unknown;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="vqc3m65p"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div 
            onClick={() => open?.()}
            className="relative flex flex-col items-center justify-center gap-4 text-neutral-600 cursor-pointer hover:opacity-70 transition border-dashed border-2 border-neutral-300 p-20"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image alt="Upload" fill style={{ objectFit: "contain" }} src={value} />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
