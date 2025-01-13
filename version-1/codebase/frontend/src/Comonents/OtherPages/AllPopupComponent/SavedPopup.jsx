/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import Girl from "../../../assets/headerIcon/girl.jpg";
import Boy1 from "../../../assets/headerIcon/boy1.png";
import Boy2 from "../../../assets/headerIcon/boy2.jpg";
import communityafter from "../../../assets/communityafter.png";
import communitybefore from "../../../assets/communitybefore.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ShowBadgeIcon from "../../OtherPages/ShowBadgeIcons";
import CreateBucketListPopup from "./CreateBucketListPopup";
import dummyUserImage from "../../../assets/user_image-removebg-preview.png";
import {
  blockAccount,
  getAllUsers,
  getOnlineFriends,
  getUserDetails,
  getUserPosts,
} from "../../../redux/slices/authSlice";
import SuccessError from "../SuccessError";
import {
  addCountOnStoryView,
  commentOnStory,
  bucketExistingPost,
  getActiveStories,
  getAllPosts,
  LikeUnlikePost,
  likeUnlikeStory,
  getAllBucketListwithBuddies
} from "../../../redux/slices/postSlice";

const SavedPopup = ({ post_id, isOpen, onClose, openBucketPopup }) => {
  const currentPostId = post_id;
 // console.log("currentPostId: " + currentPostId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [flashMessage, setFlashMessage] = useState("");
  const [flashMsgType, setFlashMsgType] = useState("");

  /**create bucket post data */
  const [bucketFormData, setbucketFormData] = useState({
    list_name: "",
    buddies: [],
    buddies_id: [],
    post_id: "",
  });

  const {
    onlineFriends,
    allUsers,
    user: userDetails,
    error: reduxSliceError,
  } = useSelector((state) => state.auth);

  const {
    allPosts,
    activeStories,
    allBucketwithbuddies
  } = useSelector((state) => state.postSlice);

  //console.log("with buddies ", allBucketwithbuddies);
  useEffect(() => {
    if (!allBucketwithbuddies) {
      dispatch(getAllBucketListwithBuddies());
    }
    // if (!allBucketwithoutbuddies) {
    //   dispatch(getAllBucketListwithoutBuddies());
    // }
  }, [dispatch, allBucketwithbuddies]);

  useEffect(() => {
    if (reduxSliceError?.message === "Unauthorized") {
      localStorage.removeItem("token");
      navigate("/login"); // Redirect to login page
    }
  }, [reduxSliceError, navigate]);

  const [joinBucket, setJoinBucket] = useState([
    {
      id: 1,
      name: "Have to Explore List",
      handle: "12+",
      image: Girl,
    },
    {
      id: 2,
      name: "Explorer",
      handle: "12K member",
      image: Boy1,
    },
  ]);

  const handleFlashMessage = (errorMessage, msgType) => {
    setFlashMessage(errorMessage);
    setFlashMsgType(msgType);
    setTimeout(() => {
      setFlashMessage("");
      setFlashMsgType("");
    }, 3000); // Hide the message after 3 seconds
  };

  const handlePostUpload = async () => {
    try {
      //console.log("bucketpostDatanew", bucketFormData);

      const bucketResult = await dispatch(bucketExistingPost(bucketFormData));
      if (bucketResult.payload.status == true) {
        // console.log("=====commentResult===>", commentResult.message);
        await dispatch(getAllBucketListwithBuddies());
        //await dispatch(getAllBucketListwithBuddies());

        // await dispatch(getUserPosts());
        setbucketFormData({
          list_name: "",
          post_id: "",
          buddies: [],
          buddies_id: [],
        });
        handleFlashMessage(bucketResult.payload.message, "success");
      } else {
        handleFlashMessage(bucketResult.payload.message, "error");
      }
    } catch (error) {
      console.log("error in handlePostUpload", error);
    }
  };
  useEffect(() => {
    if (bucketFormData.post_id) {
      //console.log(bucketFormData.post_id);
      handlePostUpload(); // Perform upload when post_id is set
    }
  }, [bucketFormData]);

  const [imageStates, setImageStates] = useState({});

  const handleImageClick = (id, post_id, buddy_id, list_name) => {
    //console.log("handle image click", post_id);
    setbucketFormData((prev) => ({
      ...prev,
      list_name: list_name,
      buddies: [],
      buddies_id: buddy_id,
      post_id: post_id,
    }));

    // Optional: Use useEffect to log the state when it changes
    // setImageStates((prevStates) => {
    //   const newState = { ...prevStates };

    //   newState[post_id] =
    //     newState[post_id] === communitybefore
    //       ? communityafter
    //       : communitybefore;
    //   return newState;
    // });
    setImageStates((prevStates) => ({
      ...prevStates,
      [id]:
        prevStates[id] === communitybefore ? communityafter : communitybefore,
    }));

    // handlePostUpload();
  };

  const [selectedMonth, setSelectedMonth] = useState("December");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Disable body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);
  /* for showing tagged buddies */
  const [isotherDataVisible, setIsotherDataVisible] = useState(false);
  const [showTaggedBuddiesPostId, setShowTaggedBuddiesPostId] = useState(false);

  const togglePopup = (Id) => {
    // setActivePostId((prevId) => (prevId === postId ? null : postId));
    setIsotherDataVisible(!isotherDataVisible);
    setShowTaggedBuddiesPostId(Id);
  };

  const popupRef = useRef(null);

  if (!isOpen) return null;

  return (
    <>
      <style>
        {`
          .no-scroll {
            overflow: hidden;
          }
        `}
      </style>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-[rgba(0,0,0,0.40)]">
        <div className="w-[480px] max-h-[90vh] bg-white border border-gray-200 shadow-lg rounded-3xl p-3 px-7 overflow-hidden">
          {/* Popup Header */}
          <div className="flex justify-between items-center mb-2 border-b border-[#869E9D] py-2 sticky top-0 bg-white z-10">
            <h3 className="font-poppins text-[24px] font-semibold text-[#212626]">
              Bucket List
            </h3>
            <button
              onClick={onClose}
              className="text-black hover:text-[#2DC6BE] font-bold text-lg"
              aria-label="Close"
            >
              &#x2715;
            </button>
          </div>

          {/* Popup Content */}
          <div
            className="overflow-y-auto scrollbar-hidden"
            style={{ maxHeight: "calc(90vh - 70px)" }}
          >
            <div className="mt-4">
              <h2 className="font-poppins text-[20px] font-semibold text-[#212626] text-left">
                When are you planning to visit this place?
              </h2>
              {/* Year and Arrows */}
              <div className="mt-5 mb-4 flex items-center justify-center space-x-10">
                <button className="text-gray-500 text-lg font-bold">
                  &#60;
                </button>
                <span className="text-[16px] font-inter font-medium text-[#212626]">
                  2024
                </span>
                <button className="text-gray-500 text-lg font-bold">
                  &#62;
                </button>
              </div>

              {/* Month Grid */}
              <div className="grid grid-cols-3 gap-4">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                    className={`py-2 px-4 rounded-[4px] text-[16px] font-inter font-medium ${
                      selectedMonth === month
                        ? "bg-teal-500 text-white"
                        : "bg-[#F0F7F7] text-gray-700"
                    } transition-all duration-200`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <h2 className="font-poppins text-[20px] font-semibold text-[#212626] text-left">
                Choose bucket
              </h2>

              <div className="mb-4 space-y-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={() => openBucketPopup()}
                      className="text-white bg-[#1DB2AA] w-[48px] h-[48px] mr-2 rounded-[4px] font-bold text-lg"
                    >
                      <span style={{ fontSize: "35px" }}>&#43;</span>
                    </button>
                    <div>
                      <h2 className="font-inter font-medium text-[16px] text-[#212626] text-left">
                        Create New Bucket List
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button className="text-white bg-[#1DB2AA] w-[48px] h-[48px] mr-2 rounded-[4px] font-bold text-lg">
                      <span style={{ fontSize: "35px" }}>&#43;</span>
                    </button>
                    <div>
                      <h2 className="font-inter font-medium text-[16px] text-[#212626] text-left">
                        Add with a Buddy
                      </h2>
                    </div>
                  </div>
                </div>
                {allBucketwithbuddies?.map((buddy, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    {/* User Info */}
                    <div className="flex items-center space-x-3">
                      <img
                        src={buddy?.media_url ? buddy.media_url : Boy1}
                        alt={buddy.list_name}
                        className="w-[48px] h-[48px] rounded-[4px] object-cover"
                      />
                      <div className="flex items-center">
                        <p className="font-inter font-medium text-[16px] text-[#212626] text-left">
                          {buddy.list_name}
                        </p>
                        <>
                          {buddy?.buddy_id.length > 0 && (
                            <div className="">
                              <p
                                className="relative font-poppins flex items-center font-semibold text-[15px] text-[#212626] cursor-pointer"
                                onClick={() => togglePopup(buddy.id)}
                              >
                                <span className="text-[#869E9D]">
                                  &nbsp;with&nbsp;
                                </span>{" "}
                                {buddy?.buddy_id?.length} others{" "}
                                {isotherDataVisible &&
                                showTaggedBuddiesPostId == buddy?.id && (
                                  <div
                                    ref={popupRef}
                                    className="absolute top-[30px] -left-[50px] w-[370px] p-[12px] bg-white border border-gray-300 rounded-[16px] shadow-lg z-10 flex flex-col gap-[34px]"
                                  >
                                    {buddy?.buddyDetails?.map((buddyItem) => {
                                      return (
                                        <div
                                          className="flex flex-col"
                                          key={buddyItem?.id}
                                        >
                                          <Link
                                            to={`/profile/${buddyItem?.user_name}/${buddyItem?.id}`}
                                          >
                                            <div className="flex items-center space-x-3">
                                              <div>
                                                <img
                                                  src={
                                                    buddyItem?.profile_image ||
                                                    dummyUserImage
                                                  }
                                                  alt="Image"
                                                  className="w-[44px] h-[44px] rounded-full"
                                                />
                                              </div>
                                              <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                  <h5 className="font-poppins font-semibold text-[20px] text-[#212626] text-left">
                                                    {buddyItem?.full_name}
                                                  </h5>
                                                  <div className="relative group">
                                                    {buddyItem?.badge
                                                      ?.split("-")[0]
                                                      ?.trim() ==
                                                      "Solo Traveler" && (
                                                      <ShowBadgeIcon
                                                        badge={buddyItem?.badge}
                                                      />
                                                    )}

                                                    {buddyItem?.badge
                                                      ?.split("-")[0]
                                                      ?.trim() ==
                                                      "Luxury Traveler" && (
                                                      <ShowBadgeIcon
                                                        badge={buddyItem?.badge}
                                                      />
                                                    )}

                                                    {buddyItem?.badge
                                                      ?.split("-")[0]
                                                      ?.trim() ==
                                                      "Adventurer" && (
                                                      <ShowBadgeIcon
                                                        badge={buddyItem?.badge}
                                                      />
                                                    )}

                                                    {buddyItem?.badge
                                                      ?.split("-")[0]
                                                      ?.trim() ==
                                                      "Explorer" && (
                                                      <ShowBadgeIcon
                                                        badge={buddyItem?.badge}
                                                      />
                                                    )}

                                                    {buddyItem?.badge
                                                      ?.split("-")[0]
                                                      ?.trim() == "Foodie" && (
                                                      <ShowBadgeIcon
                                                        badge={buddyItem?.badge}
                                                      />
                                                    )}
                                                  </div>
                                                </div>
                                                <div>
                                                  <p className="-mt-2 font-inter font-medium text-[16px] text-[#667877] text-left">
                                                    {buddyItem?.user_name}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </Link>
                                          <div className="md:w-[338px] md:h-[32px] flex items-center justify-center rounded-full bg-[#E5FFFE] mt-3">
                                            <p className="font-inter font-medium items-center text-center text-[12px] text-[#212626]">
                                              {buddyItem?.badge?.split("-")[0]}{" "}
                                              &nbsp;•&nbsp; 0 Trips
                                              &nbsp;•&nbsp;{" "}
                                              {buddyItem?.followers_count || 0}{" "}
                                              followers &nbsp;•&nbsp;{" "}
                                              {buddyItem?.buddies_count || 0}{" "}
                                              Buddies
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </p>

                              
                            </div>
                          )}
                        </>
                        {/* <p className="font-inter font-medium text-[12px] text-[#667877] text-left">
                        {buddy.handle}
                      </p> */}
                      </div>
                    </div>

                    {/* Show Image Data Section */}
                    <img
                      src={imageStates[buddy.id] || communityafter}
                      alt="Toggleable"
                      onClick={() =>
                        handleImageClick(
                          buddy.id,
                          currentPostId,
                          buddy.buddy_id,
                          buddy.list_name
                        )
                      }
                      className="w-[24px] h-[24px] cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {flashMessage && (
          <SuccessError message={flashMessage} messageType={flashMsgType} />
        )}
      </div>
    </>
  );
};

export default SavedPopup;
