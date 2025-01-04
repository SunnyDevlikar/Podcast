
"use client";

import { useQuery } from "convex/react";
//import Image from "next/image";
import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import ProfileCard from "@/components/ProfileCard";
import { api } from "@/convex/_generated/api";

const ProfilePage = ({
  params,
}: {
  params: {
    profileId: string;
  };
}) => {
  console.log("Profile ID:", params.profileId);

  if (!params.profileId || params.profileId.trim() === "") {
    return <EmptyState title="Invalid Profile ID" />;
  }

  const user = useQuery(api.users.getUserById, { clerkId: params.profileId });
  const podcastsData = useQuery(api.podcasts.getPodcastByAuthorId, { authorId: params.profileId });

  console.log("User data:", user);
  console.log("Podcasts data:", podcastsData);

  if (user === undefined || podcastsData === undefined) return <LoaderSpinner />;

  if (user === null) {
    return <EmptyState title="User not found" />;
  }

  const podcastCount = podcastsData?.podcasts?.length ?? 0;
  console.log("Podcast count:", podcastCount);

  return (
    <section className="mt-9 flex flex-col">
      <h1 className="text-20 font-bold text-white-1 max-md:text-center">
        Podcaster Profile
      </h1>
      <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
        <ProfileCard
          podcastCount={podcastCount}
          imageUrl={user.imageUrl ?? ''}
          userFirstName={user.name ?? ''}
        />
      </div>
      <section className="mt-9 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">All Podcasts</h1>
        {podcastsData?.podcasts && podcastsData.podcasts.length > 0 ? (
          <div className="podcast_grid">
            {podcastsData.podcasts
              .slice(0, 4)
              .map((podcast) => (
                <PodcastCard
                  key={podcast._id}
                  imgUrl={podcast.imageUrl ?? ''}
                  title={podcast.podcastTitle ?? ''}
                  description={podcast.podcastDescription ?? ''}
                  podcastId={podcast._id}
                />
              ))}
          </div>
        ) : (
          <EmptyState
            title="No podcasts found for this user"
            buttonLink="/create-podcast"
            buttonText="Create Podcast"
          />
        )}
      </section>
    </section>
  );
};

export default ProfilePage;
