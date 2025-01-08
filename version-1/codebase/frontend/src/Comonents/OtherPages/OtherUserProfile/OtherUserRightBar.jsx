/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Girl from "../../../assets/headerIcon/girl.jpg";
import Boy1 from "../../../assets/headerIcon/boy1.png";
import Boy2 from "../../../assets/headerIcon/boy2.jpg";
import { useDispatch, useSelector } from "react-redux";
import dummyUserImage from "../../../assets/user_image-removebg-preview.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  addBuddy,
  getOtherUserDetails,
  getSuggestionList,
  getUserBuddies,
  getUserFollowers,
  removeBuddy,
  toWhomUserIsFollowing,
} from "../../../redux/slices/authSlice";
import {
  followUnfollow,
  followUnfollowOnFollowing,
} from "../../../redux/slices/postSlice";

const OtherUserRightBar = ({ userName, userId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  console.log("======location.pathname====>", location.pathname);

  /* getting all the details of other user */
  const { otherUserData } = useSelector((state) => state.auth);

  // console.log("======otherUserData====>", otherUserData);

  useEffect(() => {
    // console.log("useeffect on rightbar");
  }, [dispatch]);

  useEffect(() => {
    // Update the state based on the current route
    if (location.pathname == `/profile/${userName}/${userId}/buddiesdata`) {
      setHideBuddiesList(true);
    } else {
      setHideBuddiesList(false);
    }

    if (location.pathname === `/profile/${userName}/${userId}/followersdata`) {
      setHideFollowerList(true);
    } else {
      setHideFollowerList(false);
    }

    if (location.pathname === `/profile/${userName}/${userId}/followingsdata`) {
      setHideFollowingList(true);
    } else {
      setHideFollowingList(false);
    }
  }, [location.pathname, userId, userName]);

  // State to toggle visibility of more posts
  const [showAllbuddies, setShowAllbuddies] = useState(false);
  const [showAllfollowers, setShowAllfollowers] = useState(false);
  const [showAllfollowing, setShowAllfollowing] = useState(false);

  // states to show buddies, followers, following list when they are opened on left side
  const [hideBuddiesList, setHideBuddiesList] = useState(false);
  const [hideFollowerList, setHideFollowerList] = useState(false);
  const [hideFollowingList, setHideFollowingList] = useState(false);


  /* show user buddies */
  const visiblePostsbuddies = showAllbuddies
    ? otherUserData
      ? otherUserData?.buddies
      : []
    : otherUserData
    ? otherUserData?.buddies?.slice(0, 3)
    : [];

  /* show user followers list */
  const visiblePostsfollowes = showAllfollowers
    ? otherUserData
      ? otherUserData?.followers
      : []
    : otherUserData
    ? otherUserData?.followers.slice(0, 3)
    : [];

  /* show users following list */
  const visiblePostsfollowing = showAllfollowing
    ? otherUserData
      ? otherUserData?.following
      : []
    : otherUserData
    ? otherUserData?.following?.slice(0, 3)
    : [];

  const handleAllBuddiesList = () => {
    setHideBuddiesList(true);
    navigate(`/profile/${userName}/${userId}/buddiesdata`);
  };

  const handleAllFollowers = () => {
    navigate(`/profile/${userName}/${userId}/followersdata`);
  };

  const handleAllFollowing = () => {
    navigate(`/profile/${userName}/${userId}/followingsdata`);
  };

  // to follow and unfollow a user in follower section
  const handleFollowUnfollow = async (followeeID) => {
    try {
      const followUnfollowResponse = await dispatch(
        followUnfollow(followeeID)
      ).unwrap();
      if (followUnfollowResponse) {
        await dispatch(getOtherUserDetails(userId));
        await dispatch(getUserFollowers());
        await dispatch(getUserBuddies());
        await dispatch(toWhomUserIsFollowing());
        await dispatch(getSuggestionList());
      }
    } catch (error) {
      console.log("==error in handleFollowUnfollow==", error);
    }
  };

  // to follow unfollow user in following section
  const handleFollowUnfollowForFollowing = async (followeeID) => {
    console.log("===followeeID===>", followeeID);
    try {
      const followUnfollowResponse = await dispatch(
        followUnfollowOnFollowing(followeeID)
      ).unwrap();
      if (followUnfollowResponse) {
        await dispatch(getOtherUserDetails(userId));
        await dispatch(getUserFollowers());
        await dispatch(toWhomUserIsFollowing());
        await dispatch(getUserBuddies());
        await dispatch(getSuggestionList());
      }
    } catch (error) {
      console.log("==error in handleFollowUnfollowForFollowing==", error);
    }
  };

  // handle add buddy
  const handleAddBuddy = async (buddyId) => {
    try {
      const response = await dispatch(addBuddy(buddyId)).unwrap();
      if (response) {
        await dispatch(getOtherUserDetails(userId));
        await dispatch(getUserFollowers());
        await dispatch(getUserBuddies());
        await dispatch(toWhomUserIsFollowing());
      }
    } catch (error) {
      console.log("==error in handleAddBuddy==", error);
    }
  };

  // handle remove buddy
  const handleBuddyRemove = async (buddyId) => {
    try {
      const response = await dispatch(removeBuddy(buddyId));
      if (response) {
        await dispatch(getOtherUserDetails(userId));
        await dispatch(getUserFollowers());
        await dispatch(getUserBuddies());
        await dispatch(toWhomUserIsFollowing());
      }
    } catch (error) {
      console.log("==error in handleBuddyRemove ===>", error);
    }
  };

  return (
    <>
      {!hideBuddiesList && (
        <div className="w-[340px] bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-4 px-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-poppins font-semibold text-[20px] text-[#212626]">
              Buddies ({otherUserData ? otherUserData?.buddies?.length : "0"})
            </h2>
            <p
              onClick={handleAllBuddiesList}
              className="font-inter font-medium text-[14px] text-[#2DC6BE] cursor-pointer hover:underline"
            >
              See All
            </p>
          </div>
          {/* User List */}
          <div className="mt-4 space-y-4">
            {visiblePostsbuddies.map((buddy) => (
              <div key={buddy.buddies_id} className="flex items-center justify-between">
                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <img
                    src={buddy.profile_image || dummyUserImage}
                    alt={"Profile"}
                    className="w-[44px] h-[44px] rounded-full object-cover"
                  />
                  <Link to={`/profile/${buddy?.user_name}/${buddy?.buddies_id}`}>
                    <div>
                      <p className="font-inter font-medium text-[16px] text-[#212626] text-left">
                        {/* {buddy.full_name} */}
                        {buddy.full_name
                          ? buddy.full_name.length > 9
                            ? `${buddy.full_name.slice(0, 9)}...`
                            : `${buddy.full_name}`
                          : ""}
                      </p>
                      <p className="font-inter font-medium text-[14px] text-[#667877] text-left">
                        {buddy.user_name
                          ? buddy.user_name.length > 9
                            ? `${buddy.user_name.slice(0, 9)}...`
                            : `${buddy.user_name}`
                          : ""}
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    className={`w-[76px] h-[36px] text-[14px] border rounded-[4px] font-medium ${
                      !buddy.is_followed
                        ? "bg-[#2DC6BE] text-white border-[#2DC6BE]"
                        : "text-[#2DC6BE] border-[#2DC6BE]"
                    } hover:bg-[#2DC6BE] hover:text-white`}

                    onClick={() => {
                      if (buddy.is_followed) {
                        const confirmUnfollow = window.confirm(
                          "Are you sure you want to unfollow this user?"
                        );
                        if (confirmUnfollow) {
                          handleFollowUnfollowForFollowing(buddy?.buddies_id); // Call the function to unfollow
                        }
                      } else {
                        const confirmFollow = window.confirm(
                          "Do you want to follow this user?"
                        );
                        if (confirmFollow) {
                          handleFollowUnfollowForFollowing(buddy?.buddies_id); // Call the function to follow
                        }
                      }
                    }}
                  >
                    {!buddy.is_followed ? "Follow" : "Remove"}
                  </button>

                  {/* start buddy */}

                  {!buddy?.is_buddies ? (
                    <>
                      <button
                        className={`w-[36px] h-[36px] text-[20px] text-sm border rounded-[4px] font-medium bg-[#2DC6BE] text-white border-[#2DC6BE] flex items-center justify-center `}

                        onClick={() => {
                          const confirmAddBuddy = window.confirm(
                            "Do you want to add this user as a buddy?"
                          );
                          if (confirmAddBuddy) {
                            handleAddBuddy(buddy?.buddies_id); // Call the function to add the buddy
                          }
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.99984 1.16699V12.8337M1.1665 7.00033H12.8332"
                            stroke="white"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                    className="w-[36px] h-[36px] text-[20px] text-[#2DC6BE] border border-[#2DC6BE] rounded-[4px] font-medium flex items-center justify-center "
                    // onClick={() => handleBuddyRemove(buddy?.id)}
                    onClick={() => {
                      const confirmRemove = window.confirm(
                        "Are you sure you want to remove this buddy?"
                      );
                      if (confirmRemove) {
                        handleBuddyRemove(buddy?.buddies_id); // Call the function to remove the buddy
                      }
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.875278 0.875211L9.12486 9.12479M0.875278 9.12479L9.12486 0.875211"
                        stroke="#2DC6BE"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                    </>
                  )}

                  {/* end buddy */}
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!hideFollowerList && (
        <div className="w-[340px] bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-4 px-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-poppins font-semibold text-[20px] text-[#212626]">
              Followers ({otherUserData ? otherUserData?.followers?.length : "0"})
            </h2>
            <p
              onClick={handleAllFollowers}
              className="font-inter font-medium text-[14px] text-[#2DC6BE] cursor-pointer hover:underline"
            >
              See All
            </p>
          </div>
          {/* User List */}
          <div className="mt-4 space-y-4">
            {visiblePostsfollowes.map((follower) => (
              <div
                key={`${follower.follower_id}_follower`}
                className="flex items-center justify-between"
              >
                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <img
                    src={follower.profile_image || dummyUserImage}
                    alt={"Profile"}
                    className="w-[44px] h-[44px] rounded-full object-cover"
                  />
                  <Link to={`/profile/${follower?.user_name}/${follower?.follower_id}`}>
                    <div>
                      <p className="font-inter font-medium text-[16px] text-[#212626] text-left">
                        {/* {follower.full_name} */}
                        {follower.full_name
                          ? follower.full_name.length > 9
                            ? `${follower.full_name.slice(0, 9)}...`
                            : `${follower.full_name}`
                          : ""}
                      </p>
                      <p className="font-inter font-medium text-[14px] text-[#667877] text-left">
                        {follower.user_name
                          ? follower.user_name.length > 9
                            ? `${follower.user_name.slice(0, 9)}...`
                            : `${follower.user_name}`
                          : ""}
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    className={`w-[76px] h-[36px] text-[14px] border rounded-[4px] font-medium ${
                      !follower.is_followed
                        ? "bg-[#2DC6BE] text-white border-[#2DC6BE]"
                        : "text-[#2DC6BE] border-[#2DC6BE]"
                    } hover:bg-[#2DC6BE] hover:text-white`}
                    // onClick={() => handleFollowUnfollow(follower?.id)}
                    onClick={() => {
                      if (follower.is_followed) {
                        const confirmUnfollow = window.confirm(
                          "Are you sure you want to unfollow this user?"
                        );
                        if (confirmUnfollow) {
                          handleFollowUnfollowForFollowing(follower?.follower_id); // Call the function to unfollow
                        }
                      } else {
                        const confirmFollow = window.confirm(
                          "Do you want to follow this user?"
                        );
                        if (confirmFollow) {
                          handleFollowUnfollowForFollowing(follower?.follower_id); // Call the function to follow
                        }
                      }
                    }}
                  >
                    {follower.is_followed ? "Remove" : "Follow"}
                  </button>
                  {!follower?.is_buddies ? (
                    <>
                      <button
                        className={`w-[36px] h-[36px] text-[20px] text-sm border rounded-[4px] font-medium bg-[#2DC6BE] text-white border-[#2DC6BE] flex items-center justify-center `}

                        onClick={() => {
                          const confirmAddBuddy = window.confirm(
                            "Do you want to add this user as a buddy?"
                          );
                          if (confirmAddBuddy) {
                            handleAddBuddy(follower?.follower_id); // Call the function to add the buddy
                          }
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.99984 1.16699V12.8337M1.1665 7.00033H12.8332"
                            stroke="white"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="w-[36px] h-[36px] text-[20px] text-[#2DC6BE] border border-[#2DC6BE] rounded-[4px] font-medium flex items-center justify-center"
                        // onClick={() => handleBuddyRemove(follower?.id)}
                        onClick={() => {
                          const confirmRemoveBuddy = window.confirm(
                            "Are you sure you want to remove this buddy?"
                          );
                          if (confirmRemoveBuddy) {
                            handleBuddyRemove(follower?.follower_id); // Call the function to remove the buddy
                          }
                        }}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.875278 0.875211L9.12486 9.12479M0.875278 9.12479L9.12486 0.875211"
                            stroke="#2DC6BE"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!hideFollowingList && (
        <div className="w-[340px] bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-4 px-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-poppins font-semibold text-[20px] text-[#212626]">
              Following ({otherUserData ? otherUserData?.following?.length : "0"})
            </h2>
            <p
              onClick={handleAllFollowing}
              className="font-inter font-medium text-[14px] text-[#2DC6BE] cursor-pointer hover:underline"
            >
              See All
            </p>
          </div>
          {/* User List */}
          <div className="mt-4 space-y-4">
            {visiblePostsfollowing.map((userFollowing) => (
              <div
                key={`${userFollowing.followee_id}_following`}
                className="flex items-center justify-between"
              >
                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <img
                    src={userFollowing.profile_image || dummyUserImage}
                    alt={"Profile"}
                    className="w-[44px] h-[44px] rounded-full object-cover"
                  />
                  <Link
                    to={`/profile/${userFollowing?.user_name}/${userFollowing?.followee_id}`}
                  >
                    <div>
                      <p className="font-inter font-medium text-[16px] text-[#212626] text-left">
                        {/* {userFollowing.full_name} */}
                        {userFollowing.full_name
                          ? userFollowing.full_name.length > 9
                            ? `${userFollowing.full_name.slice(0, 9)}...`
                            : `${userFollowing.full_name}`
                          : ""}
                      </p>
                      <p className="font-inter font-medium text-[14px] text-[#667877] text-left">
                        {userFollowing.user_name
                          ? userFollowing.user_name.length > 9
                            ? `${userFollowing.user_name.slice(0, 9)}...`
                            : `${userFollowing.user_name}`
                          : ""}
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    className={`w-[76px] h-[36px] text-[14px] border rounded-[4px] font-medium ${
                      !userFollowing.is_followed
                        ? "bg-[#2DC6BE] text-white border-[#2DC6BE]"
                        : "text-[#2DC6BE] border-[#2DC6BE]"
                    } hover:bg-[#2DC6BE] hover:text-white`}
                    // onClick={() => handleFollowUnfollowForFollowing(userFollowing.id)}
                    onClick={() => {
                      if (!userFollowing.is_followed) {
                        const confirmFollow = window.confirm(
                          "Do you want to follow this user?"
                        );
                        if (confirmFollow) {
                          handleFollowUnfollowForFollowing(userFollowing.followee_id); // Call the function to follow
                        }
                      } else {
                        const confirmUnfollow = window.confirm(
                          "Are you sure you want to unfollow this user?"
                        );
                        if (confirmUnfollow) {
                          handleFollowUnfollowForFollowing(userFollowing.followee_id); // Call the function to unfollow
                        }
                      }
                    }}
                  >
                    {!userFollowing.is_followed ? "Follow" : "Remove"}
                  </button>
                  {!userFollowing?.is_buddies ? (
                    <>
                      <button
                        className={`w-[36px] h-[36px] text-[16px] border rounded-[4px] font-medium bg-[#2DC6BE] text-white border-[#2DC6BE] flex items-center justify-center ${
                          !userFollowing.is_buddies
                            ? "bg-[#2DC6BE] text-white border-[#2DC6BE]"
                            : "text-[#2DC6BE] border-[#2DC6BE]"
                        } hover:bg-[#2DC6BE] hover:text-white`}
                        onClick={() => {
                          const confirmAddBuddy = window.confirm(
                            "Do you want to add this user as a buddy?"
                          );
                          if (confirmAddBuddy) {
                            handleAddBuddy(userFollowing.followee_id); // Call the function to add the buddy
                          }
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.99984 1.16699V12.8337M1.1665 7.00033H12.8332"
                            stroke="white"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="w-[36px] h-[36px] text-[20px] text-[#2DC6BE] border border-[#2DC6BE] rounded-[4px] font-medium flex items-center justify-center"
                        // onClick={() => handleBuddyRemove(userFollowing?.id)}
                        onClick={() => {
                          const confirmRemoveBuddy = window.confirm(
                            "Are you sure you want to remove this buddy?"
                          );
                          if (confirmRemoveBuddy) {
                            handleBuddyRemove(userFollowing?.followee_id); // Call the function to remove the buddy
                          }
                        }}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.875278 0.875211L9.12486 9.12479M0.875278 9.12479L9.12486 0.875211"
                            stroke="#2DC6BE"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default OtherUserRightBar;
