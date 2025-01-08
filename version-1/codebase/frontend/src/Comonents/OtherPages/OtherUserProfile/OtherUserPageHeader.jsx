/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dummyUserImage from "../../../assets/user_image-removebg-preview.png";
import { Link, useParams } from "react-router-dom";
// import StoryPage from "./AllStoriesPages/StoryPage";
// import StoryViewPage from "./AllStoriesPages/StoryViewPage";
import adventureBadge from "../../../assets/Badges/adventurer.svg";
import soloTraveller from "../../../assets/Badges/soloTraveler.svg";
import explorerBadge from "../../../assets/Badges/Explorer.svg";
import foodieBadge from "../../../assets/Badges/Foddie.svg";
import luxuryTravelerBadge from "../../../assets/Badges/Foddie.svg";
import dotThree from "../../../assets/dotThree.png";
import blockIcon from "../../../assets/block-icon.png";
import reportIcon from "../../../assets/report-icon.svg";
// import StoryLoading from "./AllStoriesPages/StoryLoading";
import {
  addBuddy,
  blockAccount,
  getOtherUserDetails,
  getSuggestionList,
  getUserBuddies,
  getUserFollowers,
  removeBuddy,
  toWhomUserIsFollowing,
  unBlockAccount,
} from "../../../redux/slices/authSlice";
import { followUnfollowOnFollowing } from "../../../redux/slices/postSlice";
import OtherUserPostCard from "./OtherUserPostCard";

const OtherUserPageHeader = () => {
  const dispatch = useDispatch();
  const { userName, userId } = useParams();

  const [isExpanded, setIsExpanded] = useState(false);
  const maxWordLimit = 100;
  const checkColor = false;

  /* for story section */
  const [isCreateSocialPopup, setIsCreateSocialPopup] = useState(false);
  const [dropdownOpenStoryViewSetting, setDropdownOpenStoryViewSetting] =
    useState(false);
  const [isCreateSocialPopupUserItself, setIsCreateSocialPopupUserItself] =
    useState(false);
  const [isShowvisibleStoryViewID, setIsShowvisibleStoryViewID] =
    useState(false);
  const [openDropdownIdUser, setOpenDropdownIdUser] = useState(null);
  const [isStoryLoaderOpen, setIsStoryLoaderOpen] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  // console.log("====isCreateSocialPopup===>", isCreateSocialPopup);

  const hadleShowViewStory = (storyId) => {
    setIsShowvisibleStoryViewID(!isShowvisibleStoryViewID);
  };

  const closeStoryPopup = () => {
    setIsCreateSocialPopupUserItself(false);
  };

  const toggleSettingStoryView = (storyId) => {
    setOpenDropdownIdUser(storyId);
  };

  /* get other user details */
  const { otherUserData } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOtherUserDetails(userId));
  }, [dispatch, userId]);

  /* to close story upload popup and open loader */
  const handleStoryPageClose = () => {
    setIsCreateSocialPopup(false);
    setIsStoryLoaderOpen(true);
  };

  /* handle add buddy */
  const handleAddBuddy = async (buddyId) => {
    // console.log("===handleAddBuddy===");
    try {
      const response = await dispatch(addBuddy(buddyId)).unwrap();
      if (response) {
        await dispatch(getOtherUserDetails(userId));
        await dispatch(getUserFollowers());
        await dispatch(getUserBuddies());
        await dispatch(toWhomUserIsFollowing());
      }
    } catch (error) {
      console.log("==error in handleAddBuddy= in otheruserpageheader=", error);
    }
  };

  /* handle remove buddy */
  const handleBuddyRemove = async (buddyId) => {
    // console.log("===handleBuddyRemove===");
    try {
      const response = await dispatch(removeBuddy(buddyId));
      if (response) {
        await dispatch(getOtherUserDetails(userId));
        await dispatch(getUserFollowers());
        await dispatch(getUserBuddies());
        await dispatch(toWhomUserIsFollowing());
      }
    } catch (error) {
      console.log(
        "==error in handleBuddyRemove in otheruserpageheader====>",
        error
      );
    }
  };

  /* to follow unfollow user */
  const handleFollowUnfollowForFollowing = async (followeeID) => {
    // console.log("===handleFollowUnfollowForFollowing===");
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
      console.log(
        "==error in handleFollowUnfollowForFollowing====in otheruserpageheader=",
        error
      );
    }
  };

  /* to open more option popup */
  const openOptionPopup = () => {
    setIsOpenPopup(true);
  };

  /* to block a user */
  const blockTheUser = async (blockId) => {
    console.log("=====userId===header>", userId);
    try {
      // console.log("=====blockId===>", blockId);
      const response = await dispatch(blockAccount(blockId)).unwrap();
      // console.log("===response===>", response);
      if (response) {
        await dispatch(getOtherUserDetails(userId));
        setIsOpenPopup(false);
      }
    } catch (error) {
      console.log("===error in blocktheuser===>", error);
    }
  };

  /* to unblock an account */
  const unBlockTheUser = async (unBlockId) => {
    // console.log("=====unBlockId===>", unBlockId);
    try {
      const response = await dispatch(unBlockAccount(unBlockId)).unwrap();
      // console.log("===response===>", response);
      if (response) {
        await dispatch(getOtherUserDetails(userId));
        setIsOpenPopup(false);
      }
    } catch (error) {
      console.log("===error in unBlockTheUser===>", error);
    }
  };

  return (
    <div className="mt-5 bg-[#F0F7F7] flex justify-center items-center">
      <div className="w-full max-w-[98%] h-full bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col items-center">
        {/* Cover Photo Section */}
        {otherUserData && (
          <div className="flex flex-col justify-center w-full max-w-98% p-4 px-4">
            <div>
              {otherUserData?.cover_image ? (
                <div>
                  <img
                    // src={userDetails?.cover_image}
                    src={otherUserData?.cover_image}
                    alt="Cover"
                    className="w-full h-[340px] object-cover rounded-[12px]"
                  />
                </div>
              ) : (
                <div className="w-full h-[340px] object-cover rounded-[12px] bg-[#F0F7F7]"></div>
              )}

              {
                // Badge mapping and rendering
                (() => {
                  const badges = {
                    Adventurer: adventureBadge,
                    Explorer: explorerBadge,
                    Foodie: foodieBadge,
                    "Solo Traveler": soloTraveller,
                    "Luxury Traveler": luxuryTravelerBadge,
                  };

                  const badgeParts = otherUserData?.badge?.split("-");
                  const badgeName = badgeParts?.[0]?.trim();
                  const badgeDescription = badgeParts?.[1]?.trim();
                  const badgeImage = badges[badgeName];

                  return badgeImage ? (
                    <div className="relative group">
                      <img
                        src={badgeImage}
                        alt={`${badgeName} Badge`}
                        className="absolute -top-[325px] left-[15px] w-[192px] h-[60px]"
                      />
                      <div className="absolute left-[20px] -top-[260px]  mt-1 hidden group-hover:block bg-[#2DC6BE] text-white text-sm p-2 rounded shadow-lg w-[250px] text-left">
                        {badgeDescription}
                      </div>
                    </div>
                  ) : null;
                })()
              }
            </div>
            {/* Profile Photo */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative -top-20 border-4 border-white bg-white rounded-full p-[2px]">
                <div className="border-4 border-[#2DC6BE] rounded-full bg-[#F0F7F7] p-[2px]">
                  {/* {activeStories && activeStories[0].stories.length > 0 ? (
                  <div>
                    <img
                      src={activeStories[0]?.profile_image || dummyUserImage}
                      alt="My Story"
                      className="w-[150px] h-[150px] rounded-full border-4 border-white object-cover"
                      onClick={() => setIsCreateSocialPopupUserItself(true)}
                    />
                    {isCreateSocialPopupUserItself && (
                      <StoryViewPage
                        closeStoryPopup={closeStoryPopup}
                        toggleSettingStoryView={toggleSettingStoryView}
                        dropdownOpenStoryViewSetting={
                          dropdownOpenStoryViewSetting
                        }
                        setDropdownOpenStoryViewSetting={
                          setDropdownOpenStoryViewSetting
                        }
                        hadleShowViewStory={hadleShowViewStory}
                        isShowvisibleStoryViewID={isShowvisibleStoryViewID}
                        storyData={activeStories[0].stories}
                        openDropdownIdUser={openDropdownIdUser}
                        setOpenDropdownIdUser={setOpenDropdownIdUser}
                        setIsShowvisibleStoryViewID={
                          setIsShowvisibleStoryViewID
                        }
                        isCreateSocialPopup={isCreateSocialPopup}
                        setIsCreateSocialPopup={setIsCreateSocialPopup}
                        isOpen={isCreateSocialPopupUserItself}
                      />
                    )}
                  </div>
                ) : ( */}
                  <div>
                    <img
                      src={otherUserData?.profile_image || dummyUserImage}
                      alt="Profile"
                      className="w-[150px] h-[150px] rounded-full border-4 border-white object-cover"
                    />
                  </div>
                  {/* )} */}
                </div>
              </div>
              <div className="md:w-[720px] -mt-[70px] flex flex-col items-center justify-center">
                <h2 className="font-poppins font-medium text-[32px] text-[#212626] tems-center">
                  {otherUserData?.full_name}
                </h2>
                <p className="-mt-2 font-inter font-medium text-[20px] items-center text-[#667877]">
                  {otherUserData?.user_name}
                </p>
                {/* <p className="font-inter font-medium text-[16px] items-center text-[#667877] mt-2">
                {userDetails?.description}
              </p> */}
                <p className="font-inter font-medium text-[16px] items-center text-[#667877] mt-2">
                  {isExpanded
                    ? otherUserData?.description
                    : `${otherUserData?.description?.slice(0, maxWordLimit)}${
                        otherUserData?.description?.length > maxWordLimit
                          ? "..."
                          : ""
                      }`}
                  {otherUserData?.description?.length > maxWordLimit && (
                    <span
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-[#2dc6be] hover:underline cursor-pointer ml-1"
                    >
                      {isExpanded ? "See Less" : "See More"}
                    </span>
                  )}
                </p>
                <div className="md:w-[470px] md:h-[40px] flex items-center justify-center rounded-full bg-[#E5FFFE] mt-3">
                  <p className="font-poppins font-semibold items-center text-center text-[16px] text-[#212626]">
                    {otherUserData && otherUserData?.badge?.split("-")[0]}{" "}
                    &nbsp;•&nbsp; 0 Trip &nbsp;•&nbsp;{" "}
                    {otherUserData?.total_followers || 0}{" "}
                    {otherUserData?.total_followers > 1
                      ? "followers"
                      : "follower"}{" "}
                    &nbsp;•&nbsp; {otherUserData?.total_buddies || 0}{" "}
                    {otherUserData?.total_buddies > 1 ? "Buddies" : "Buddy"}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <button
                    aria-label="Liked Info"
                    className={`flex items-center justify-center w-[131px] h-[40px] ${
                      otherUserData?.is_buddies
                        ? "bg-[#F0F7F7] text-[#667877]"
                        : "bg-[#2DC6BE] text-white"
                    } py-1 px-3 rounded-[4px] hover:bg-[#2DC6BE] hover:text-white`}
                    onClick={
                      otherUserData?.is_buddies
                        ? () => handleBuddyRemove(userId)
                        : () => handleAddBuddy(userId)
                    }
                  >
                    <span className="text-md font-normal">
                      {otherUserData?.is_buddies ? "Added" : "Add as Buddy"}
                    </span>
                  </button>

                  <div>
                    <button
                      aria-label="Liked Info"
                      className={`flex items-center justify-center w-[136px] h-[40px] ${
                        otherUserData?.is_follow
                          ? "bg-[#F0F7F7] text-[#667877]"
                          : "bg-[#2DC6BE] text-white"
                      }  hover:text-gray-800 py-1 px-3 rounded-[4px] hover:bg-[#2DC6BE] hover:text-white`}
                      onClick={() => handleFollowUnfollowForFollowing(userId)}
                    >
                      <span className="text-md font-normal">
                        {otherUserData?.is_follow ? "Following" : "Follow"}
                      </span>
                    </button>
                  </div>

                  <div>
                    <button
                      aria-label="Liked Info"
                      className={`flex items-center justify-center w-[136px] h-[40px] text-[#667877]  hover:text-gray-800 py-1 px-3 rounded-[4px] hover:bg-[#2DC6BE] hover:text-white`}
                    >
                      <span className="text-md font-normal">Message</span>
                    </button>
                  </div>

                  <div>
                    <img
                      src={dotThree}
                      alt="dotThree"
                      className="h-4 object-cover cursor-pointer"
                      onClick={() => openOptionPopup()}
                    />

                    {isOpenPopup && (
                      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white border border-[#ddd] rounded-md rounded-[16px] shadow-md w-[200px]">
                          <div className="flex items-center justify-between p-2 px-4 ">
                            <h6 className="font-poppins font-semibold text-[16px] text-[#212626]">
                              More Options
                            </h6>

                            {/* Close Button (X) */}
                            <button
                              className="hover:text-[#2DC6BE] font-poppins font-semibold text-[16px] text-[#212626]"
                              onClick={() => setIsOpenPopup(false)}
                              aria-label="Close"
                            >
                              &#x2715;
                            </button>
                          </div>
                          <ul>
                            <li className="font-inter font-medium text-[16px] text-[#E30000] px-4 py-2 flex items-center cursor-pointer hover:bg-[#f0f0f0]">
                              <img
                                src={reportIcon}
                                alt="reportIcon"
                                className="w-[20px] h-[20px] cursor-pointer mr-2 "
                              />{" "}
                              Report Account
                            </li>

                            <li
                              className="px-4 py-2 flex items-center cursor-pointer hover:bg-[#f0f0f0]"
                              onClick={() => {
                                const isConfirmed = window.confirm(
                                  `Are you sure you want to ${
                                    otherUserData?.is_blocked
                                      ? "unblock"
                                      : "block"
                                  } this user?`
                                );
                                if (isConfirmed) {
                                  otherUserData?.is_blocked
                                    ? unBlockTheUser(otherUserData?.id)
                                    : blockTheUser(otherUserData?.id);
                                }
                              }}
                            >
                              <img
                                src={blockIcon}
                                alt="alert"
                                className="w-[20px] h-[20px] cursor-pointer mr-2"
                              />{" "}
                              {otherUserData?.is_blocked
                                ? "Unblock Account"
                                : "Block Account"}
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherUserPageHeader;
