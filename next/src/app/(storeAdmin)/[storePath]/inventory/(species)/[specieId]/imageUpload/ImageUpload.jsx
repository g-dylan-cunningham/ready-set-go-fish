"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import Resizer from "react-image-file-resizer";
import Image from "next/image";
import { getServerDomain } from '@/app/utils';
import { Button } from "@/app/components/forms";
import styles from "./styles.module.css";

const ImageUpload = ({
  // specie,
  associatedImgs,
  setAssociatedImgs,
  setShowModal,
}) => {

  const params = useParams()
  const { specieId, storePath } = params;
  const [file, setFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [fileLink, setFileLink] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    setUploading(true);
    let matchingFullImageKey = ""; // process full image before thumbnail and save to key to the thumbnail image model. This is useful for deleting.

    const uploadImageToAws = async (file, isThumbnail = false) => {

      const getImageUrls = ({ isThumbnail }) => {
        const s3Domain = "https://ready-set-go-fish.s3.us-west-1.amazonaws.com/";
        // const s3Domain = "https://cichlid-cartel.s3.us-west-1.amazonaws.com/";
        
        const pathArr = [
          `${storePath}`, // unique folder for store images
          `${specieId}`, // unique folder for each species
          isThumbnail ? "thumbnail" : "full",  // file thumbnails together and full images together
          file.name
        ]
        const path = pathArr.join('/');


        return {
          path,
          url: s3Domain + path,
        };
      };

      // https://cichlid-cartel.s3.us-west-1.amazonaws.com/cichlid-cartel/clqeem8js0000g7us2ln2cp5m/thumbnail/eyebiter1.png
      const response = await fetch("/api/aws", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: getImageUrls({ isThumbnail }).path,
          contentType: file.type,
          // specie_id: specie.specie_id,
        }),
      });

      if (response.ok) {
        const { url, fields } = await response.json();
        const formData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append("file", file);

        // post to AWS using the presigned url
        try {
          const uploadResponse = await fetch(url, {
            method: "POST",
            body: formData,
          });

          if (uploadResponse.ok) {
            let isPrimary = false;
            let isSecondary = false;

            if (associatedImgs?.length === 0) {
              isPrimary = true;
            } else if (associatedImgs?.length === 1) {
              isSecondary = true;
            }

            const prismaRes = await fetch(getServerDomain() + "/image/store/specie", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                // filename: file.name,
                contentType: file.type,
                storeSpecieId: specieId,
                // fields,
                url,
                isPrimary,
                isSecondary,
                isThumbnail,
                key: getImageUrls({ isThumbnail }).path,
                thumbnailUrl: getImageUrls({ isThumbnail: true }).url,
                fullImageUrl: getImageUrls({ isThumbnail: false }).url,
                fullImageKey: matchingFullImageKey,
              }),
            });

            if (prismaRes.ok) {
              const newImagePrisma = await prismaRes.json();
              if (!isThumbnail) {
                matchingFullImageKey = newImagePrisma.id;
              }
  
              setFileLink(null);
              setFile(null);
              if (isThumbnail) {
                const newAssociatedImages = [
                  ...associatedImgs,
                  { ...newImagePrisma },
                ];
                setAssociatedImgs(newAssociatedImages);
                setShowModal(false);
              }
  
              e.target.reset();
              return;
            } else {
              console.error('prisma response for image api is not ok')
            }
            
          } else {
            console.error("S3 Upload Error:", uploadResponse);
            alert("Upload failed.");
          }
        } catch (error) {
          console.log("uploadResponse error", error);
        }
      } else {
        alert("Failed to get pre-signed URL.");
      }
    };

    await uploadImageToAws(file, false);

    await uploadImageToAws(thumbnailFile, true);

    setUploading(false);
  };

  const resizeFile = (file, isThumbnail) => {
    if (isThumbnail) {
      return new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          200,
          200,
          "png",
          10,
          0,
          (uri) => {
            resolve(uri);
          },
          "file",
        );
      });
    }

    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        900,
        900,
        "png",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file",
      );
    });
  };
  // Resizer.imageFileResizer(
  //   file, // Is the file of the image which will resized.
  //   maxWidth, // Is the maxWidth of the resized new image.
  //   maxHeight, // Is the maxHeight of the resized new image.
  //   compressFormat, // Is the compressFormat of the resized new image.
  //   quality, // Is the quality of the resized new image.
  //   rotation, // Is the degree of clockwise rotation to apply to uploaded image.
  //   responseUriFunc, // Is the callBack function of the resized new image URI.
  //   outputType, // Is the output type of the resized new image.
  //   minWidth, // Is the minWidth of the resized new image.
  //   minHeight // Is the minHeight of the resized new image.
  // );

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const image = await resizeFile(file, false);
    const thumbnail = await resizeFile(file, true);

    setFile(image);
    setThumbnailFile(thumbnail);
    setFileLink(URL.createObjectURL(image));
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit} className="flex justify-between">
        <div className="mr-3">
          {/* image queued for upload */}
          {fileLink && (
            <>
              <Image src={fileLink} width={200} height={200} alt="your image to upload" />
              <h3 className="mb-4">Click upload button</h3>
            </>
          )}
        </div>
        <div className="flex flex-col items-end">
          {!file && (
            <h1 className="mb-2">Choose an image for this species to upload</h1>
          )}
          <input
            className={`${styles.fileSelector} mb-6`}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button
            type="submit"
            variant="primary"
            btnClass=""
            text={uploading ? "Uploading..." : "Upload"}
            disabled={!file || uploading}
          />
        </div>
      </form>
    </div>
  );
};

export default ImageUpload;
