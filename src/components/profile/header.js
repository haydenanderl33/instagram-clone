import { useState, useEffect } from "react";
import propTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

export default function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers = [],
    following = [],
    username: profileUsername,
  },
}) {
  const { user } = useUser();

  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user.username && user.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(!!isFollowing);
    };
    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profileUserId]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        {user.username && (
          <img
            className="rounded-full h-40 w-40 flex"
            alt={`${user.username} profile pic`}
            src={`/images/avatars/${profileUsername}.jpg`}
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {activeBtnFollow && (
            <button
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleToggleFollow();
              }}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {followers === undefined || following === undefined ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}{` `}{photosCount === 1 ? `photo` : `photos`}</span>
              </p>
              <p className="mr-10">
                <span className="font-bold">
                  {followerCount}
                  {` `}
                  {followerCount === 1 ? `follower` : `followers`}
                </span>
              </p>
              <p className="mr-10">
                <span className="font-bold">{following.length} following</span>
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!fullName ? <Skeleton count={1} height={24} /> : fullName}
          </p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  photosCount: propTypes.number.isRequired,
  followerCount: propTypes.number.isRequired,
  setFollowerCount: propTypes.func.isRequired,
  profile: propTypes.shape({
    docId: propTypes.string,
    userId: propTypes.string,
    fullName: propTypes.string,
    followers: propTypes.array,
    following: propTypes.array,
    username: propTypes.string,
  }).isRequired,
};
