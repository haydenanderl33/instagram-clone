import { useReducer, useEffect } from "react";
import propTypes from "prop-types";
import Header from "./header";
import Photos from './photos';
import { getUserPhotosByUsername } from "../../services/firebase";

export default function Profile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUsername(user.username);
      dispatch({profile: user, photosCollection: photos, followerCount:user.followers.length})
    }
      getProfileInfoAndPhotos();
  }, [user, user.username]);
  return (
    <>
      <Header photosCount={photosCollection ? photosCollection.length : 0} profile={profile} followerCount={followerCount} setFollowerCount={dispatch}/>
      <Photos photos={photosCollection}/>
    </>
  );
}

Profile.propTypes = {
  user: propTypes.shape({
    dateCreated: propTypes.number.isRequired,
    emailAddress: propTypes.string.isRequired,
    followers: propTypes.array.isRequired,
    following: propTypes.array.isRequired,
    fullName: propTypes.string.isRequired,
    userId: propTypes.string.isRequired,
    username: propTypes.string.isRequired,
  }).isRequired,
};
