
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useAudio } from "@/providers/AudioProvider";
import { PodcastProps, ProfileCardProps } from "@/types";

import LoaderSpinner from "./LoaderSpinner";
import { Button } from "./ui/button";

const ProfileCard = ({
  podcastCount,
  imageUrl,
  userFirstName,
}: ProfileCardProps) => {
  const { setAudio } = useAudio();
  const [imageError, setImageError] = useState(false);

  if (!imageUrl) return <LoaderSpinner />;

  return (
    <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
      {!imageError ? (
        <Image
          src={imageUrl}
          width={250}
          height={250}
          alt="Podcastr"
          className="aspect-square rounded-lg"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-[250px] h-[250px] bg-gray-300 flex items-center justify-center rounded-lg text-4xl font-bold">
          {userFirstName.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex flex-col justify-center max-md:items-center">
        <div className="flex flex-col gap-2.5">
          <figure className="flex gap-2 max-md:justify-center">
            <Image
              src="/icons/verified.svg"
              width={15}
              height={15}
              alt="verified"
            />
            <h2 className="text-14 font-medium text-white-2">
              Verified Creator
            </h2>
          </figure>
          <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
            {userFirstName}
          </h1>
        </div>
        <figure className="flex gap-3 py-6">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphones"
          />
          <h2 className="text-16 font-semibold text-white-1">
            {podcastCount} &nbsp;
            <span className="font-normal text-white-2">podcasts</span>
          </h2>
        </figure>
        {podcastCount > 0 && (
          <Button
            onClick={() => console.log("Play random podcast functionality not implemented")}
            className="text-16 bg-orange-1 font-extrabold text-white-1"
          >
            <Image
              src="/icons/Play.svg"
              width={20}
              height={20}
              alt="random play"
            />{" "}
            &nbsp; Play a random podcast
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
=======
export default ProfileCard;
>>>>>>> 7048a93d524032b87cc5ec5dbe129f1e0e30ec00
