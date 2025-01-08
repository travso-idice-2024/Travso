import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockAccount, getOtherUserDetails, getUserDetails, getUserPosts, unBlockAccount } from "../../../redux/slices/authSlice";
// import ProfilePageHeaderData from "./ProfilePageHeaderData";
import dummyUserImage from "../../../assets/user_image-removebg-preview.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import dotThree from "../../../assets/dotThree.png";
import morePostIcon from "../../../assets/moreposticon.svg";
import trash from "../../../assets/trash.png";
import { deletePost, getAllPosts } from "../../../redux/slices/postSlice";
import OtherUserPageHeader from "./OtherUserPageHeader";
import ShowBadgeIcon from "../ShowBadgeIcons";
import CommentPopup from "../AllPopupComponent/CommentPopup";
import Header from "../Header";

const OtherUserPostDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName, userId } = useParams();

  const [flashMessage, setFlashMessage] = useState("");
  const [flashMsgType, setFlashMsgType] = useState("");

  /* states for open comment */
  const [activePostId, setActivePostId] = useState(null);
  const [isCommentPopup, setIsCommentPopup] = useState(false);

  /* for showing tagged buddies */
  const [isotherDataVisible, setIsotherDataVisible] = useState(false);
  const [showTaggedBuddiesPostId, setShowTaggedBuddiesPostId] = useState(false);

  /* for delete post popup */
  const [openPostPopupId, setOpenPostPopupId] = useState(null);
  const [showPostDotsOption, setShowPostDotsOption] = useState(false);
  const editPostRef = useRef(null);
  const popupRef = useRef(null);

  /* getting all the details of other user */
  const { otherUserData } = useSelector((state) => state.auth);

  useEffect(() => {
    if(!otherUserData) {
        dispatch(getOtherUserDetails(userId));
    }
}, [dispatch, userId]);
  console.log("===otherUserData===>", otherUserData);

  useEffect(() => {
    // if (!userPosts) {
    //   dispatch(getUserPosts());
    // }

    // if (!userDetails) {
    //   dispatch(getUserDetails());
    // }
  }, [dispatch]);

  // format in format for dob like 25 Aug 2002 and for joined Feb 2022
  function formatDate(isoDate) {
    const date = new Date(isoDate);

    // Array of month names
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

    const day = date.getUTCDate(); // Day of the month
    const month = months[date.getUTCMonth()]; // Full month name
    const shortMonth = month.slice(0, 3); // Abbreviated month name
    const year = date.getUTCFullYear(); // Full year

    return `${day} ${shortMonth} ${year}`; // Example: 25 Aug 2002
  }

  // handle flash messages show
  const handleFlashMessage = (errorMessage, msgType) => {
    setFlashMessage(errorMessage);
    setFlashMsgType(msgType);
    setTimeout(() => {
      setFlashMessage("");
      setFlashMsgType("");
    }, 3000); // Hide the message after 3 seconds
  };

  /* when clicked outside it will close the tagged buddies popup */
  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsotherDataVisible(false);
    }
    if (editPostRef.current && !editPostRef.current.contains(event.target)) {
      setOpenPostPopupId(null);
      setShowPostDotsOption(false);
    }
  };

  useEffect(() => {
    if (isotherDataVisible || openPostPopupId) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isotherDataVisible, openPostPopupId]);

  /* open popup on particular post */
  const showDeleteOption = async (post_id) => {
    setOpenPostPopupId(post_id);
    setShowPostDotsOption(true);
  };

  /* option close post dots option */
  const closeDeletePopup = async () => {
    await setOpenPostPopupId(null);
    await setShowPostDotsOption(false);
  };

  /* delete the post */
  const deleteThisPost = async (post_id) => {
    try {
      const deleteResponse = await dispatch(deletePost(post_id)).unwrap();
      // console.log("====deleteResponse===>", deleteResponse);
      if (deleteResponse) {
        handleFlashMessage("Post Deleted Successfully", "success");
        await dispatch(getUserPosts());
        await dispatch(getAllPosts());
      }
    } catch (error) {
      console.log("===error in delete post api===>", error);
    }
  };

  /* to open tagged buddies popup */
  const togglePopup = (postId) => {
    // setActivePostId((prevId) => (prevId === postId ? null : postId));
    setIsotherDataVisible(!isotherDataVisible);
    setShowTaggedBuddiesPostId(postId);
  };

  /* to open comment popup */
  const handleOpenCommentPopup = (postId) => {
    // console.log("===postId==>", postId);
    setActivePostId(postId);
    setIsCommentPopup(true);
  };

  /* to close comment popup */
  const handleCloseCommentPopup = async() => {
    // console.log("running")
    await dispatch(getOtherUserDetails(userId));
    await setIsCommentPopup(false);
    await setActivePostId(null);

  };

  /* to block a user */
    const blockTheUser = async (blockId) => {
      try {
        // console.log("=====blockId===>", blockId);
        const response = await dispatch(blockAccount(blockId)).unwrap();
        // console.log("===response===>", response);
        if (response) {
            await dispatch(getOtherUserDetails(userId));
            setOpenPostPopupId(null);
            setShowPostDotsOption(false);
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
            setOpenPostPopupId(null);
            setShowPostDotsOption(false);
        }
      } catch (error) {
        console.log("===error in unBlockTheUser===>", error);
      }
    };

  return (
    <>
      <Header />
      <OtherUserPageHeader />
      <div className="min-h-screen bg-gray-50 p-4">
        <p className="font-poppins text-[#212626] font-semibold text-[28px] mb-5 text-left flex items-center">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => navigate(`/profile/${userName}/${userId}`)}
          >
            <path
              d="M22.5 27L13.5 18L22.5 9"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          All Posts ({otherUserData ? otherUserData?.posts?.length : "0"})
        </p>
        <div className="container mx-auto flex gap-5">
          {/* Main Content */}
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {otherUserData &&
                otherUserData?.posts?.map(
                  (post, index) =>
                    post.media_url.length > 0 && (
                      <div
                        key={post?.id}
                        className="h-[588px] bg-white relative rounded-[16px] shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-4 mb-4"
                      >
                        <div className="flex items-center mb-4">
                          <img
                            src={post?.profile_image || dummyUserImage}
                            alt="User Avatar"
                            className="w-[44px] h-[44px] rounded-full object-cover aspect-square"
                          />
                          <div className="ml-3 w-full">
                            <div className="flex items-center justify-between">
                              <h4 className="relative font-poppins text-[20px] text-[#212626] font-semibold flex items-center gap-[5px]">
                                {post.full_name}{" "}
                                {post?.buddies_id.length > 0 && (
                                  <>
                                    <span className="text-[#869E9D]">With</span>{" "}
                                    <span
                                      className="relative cursor-pointer"
                                      onClick={() => togglePopup(post.id)}
                                    >
                                      {post?.buddies_id?.length} others{" "}
                                      
                                    </span>
                                    {/* 2 others Section start */}
                                    {isotherDataVisible &&
                                        showTaggedBuddiesPostId == post?.id && (
                                          <div
                                            ref={popupRef}
                                            className="absolute top-[45px] md:ml-48 mt-0 w-[416px] p-[24px] bg-white border border-gray-300 rounded-[16px] shadow-lg z-10 flex flex-col gap-[34px] cursor-pointer"
                                          >
                                            {post?.buddies_id?.map((buddy) => {
                                              // console.log("===buddybadge", buddy?.badge?.split("-")[0])
                                              return (
                                                <div
                                                  className="flex flex-col"
                                                  key={buddy?.id}
                                                >
                                                  <Link to={`/profile/${buddy?.user_name}/${buddy?.id}`} >
                                                    <div className="flex items-center space-x-3">
                                                      <div>
                                                        <img
                                                          src={
                                                            buddy?.profile_image ||
                                                            dummyUserImage
                                                          }
                                                          alt="Image"
                                                          className="w-[44px] h-[44px] rounded-full"
                                                        />
                                                      </div>
                                                      <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                          <h5 className="font-poppins font-semibold text-[20px] text-[#212626] text-left">
                                                            {buddy?.full_name}
                                                          </h5>
                                                          <div className="relative group">
                                                            {/* <img
                                                        src={
                                                          badges[
                                                            buddy?.badge?.split(
                                                              "-"
                                                            )[0]
                                                          ]?.trim() ||
                                                          BadgesIconFirst
                                                        }
                                                        alt="BadgesIconFirst"
                                                        className="w-[24px] h-[24px]"
                                                      /> */}
                                                            {buddy?.badge
                                                              ?.split("-")[0]
                                                              ?.trim() ==
                                                              "Solo Traveler" && (
                                                              // <img
                                                              //   src={badges["Solo Traveler"]?.trim()}
                                                              //   alt="BadgesIconFirst"
                                                              //   className="w-[24px] h-[24px]"
                                                              // />
                                                              <ShowBadgeIcon
                                                                badge={
                                                                  buddy?.badge
                                                                }
                                                              />
                                                            )}

                                                            {buddy?.badge
                                                              ?.split("-")[0]
                                                              ?.trim() ==
                                                              "Luxury Traveler" && (
                                                              <ShowBadgeIcon
                                                                badge={
                                                                  buddy?.badge
                                                                }
                                                              />
                                                            )}

                                                            {buddy?.badge
                                                              ?.split("-")[0]
                                                              ?.trim() ==
                                                              "Adventurer" && (
                                                              <ShowBadgeIcon
                                                                badge={
                                                                  buddy?.badge
                                                                }
                                                              />
                                                            )}

                                                            {buddy?.badge
                                                              ?.split("-")[0]
                                                              ?.trim() ==
                                                              "Explorer" && (
                                                              <ShowBadgeIcon
                                                                badge={
                                                                  buddy?.badge
                                                                }
                                                              />
                                                            )}

                                                            {buddy?.badge
                                                              ?.split("-")[0]
                                                              ?.trim() ==
                                                              "Foodie" && (
                                                              <ShowBadgeIcon
                                                                badge={
                                                                  buddy?.badge
                                                                }
                                                              />
                                                            )}
                                                          </div>
                                                        </div>
                                                        <div>
                                                          <p className="-mt-2 font-inter font-medium text-[16px] text-[#667877] text-left">
                                                            {buddy?.user_name}
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </Link>
                                                  <div className="md:w-[338px] md:h-[32px] flex items-center justify-center rounded-full bg-[#E5FFFE] mt-3">
                                                    <p className="font-inter font-medium items-center text-center text-[12px] text-[#212626]">
                                                      {
                                                        buddy?.badge?.split(
                                                          "-"
                                                        )[0]
                                                      }{" "}
                                                      &nbsp;•&nbsp; 0 Trips
                                                      &nbsp;•&nbsp;{" "}
                                                      {buddy?.followers_count ||
                                                        0}{" "}
                                                      followers &nbsp;•&nbsp;{" "}
                                                      {buddy?.buddies_count ||
                                                        0}{" "}
                                                      Buddies
                                                    </p>
                                                  </div>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        )}
                                      {/* 2 others Section end */}
                                  </>
                                )}
                                {/* Images beside h3 */}
                                <div className="ml-1 flex space-x-1">
                                  {post?.badge?.split("-")[0]?.trim() ==
                                    "Solo Traveler" && (
                                    // <img
                                    //   src={badges["Solo Traveler"]?.trim()}
                                    //   alt="BadgesIconFirst"
                                    //   className="w-[24px] h-[24px]"
                                    // />
                                    <ShowBadgeIcon badge={post?.badge} />
                                  )}

                                  {post?.badge?.split("-")[0]?.trim() ==
                                    "Luxury Traveler" && (
                                    <ShowBadgeIcon badge={post?.badge} />
                                  )}

                                  {post?.badge?.split("-")[0]?.trim() ==
                                    "Adventurer" && (
                                    <ShowBadgeIcon badge={post?.badge} />
                                  )}

                                  {post?.badge?.split("-")[0]?.trim() ==
                                    "Explorer" && (
                                    <ShowBadgeIcon badge={post?.badge} />
                                  )}

                                  {post?.badge?.split("-")[0]?.trim() ==
                                    "Foodie" && (
                                    <ShowBadgeIcon badge={post?.badge} />
                                  )}
                                </div>
                              </h4>
                              <div
                                className="relative cursor-pointer"
                                onClick={() => showDeleteOption(post?.id)}
                              >
                                <img
                                  src={dotThree}
                                  alt="dotThree"
                                  className="h-4 object-cover"
                                />
                                {openPostPopupId === post?.id &&
                                  showPostDotsOption && (
                                    <div
                                      className="bg-white border border-[#ddd] rounded-[8px] shadow-md w-[200px] absolute z-10 right-0"
                                      ref={editPostRef}
                                    >
                                      <div className="flex items-center justify-between p-2 px-4 ">
                                        <h6 className="font-poppins font-semibold text-[16px] text-[#212626]">
                                          More Options
                                        </h6>

                                        {/* Close Button (X) */}
                                        <button
                                          className="hover:text-[#2DC6BE] font-poppins font-semibold text-[16px] text-[#212626]"
                                          // onClick={() => setOpenPostPopupId(null)}
                                          onClick={() => closeDeletePopup()}
                                          aria-label="Close"
                                        >
                                          &#x2715;
                                        </button>
                                      </div>
                                      <ul>
                                          <>
                                            <li
                                              className="px-4 py-2 flex items-center cursor-pointer hover:bg-[#f0f0f0] rounded-[8px]"
                                              onClick={() => {
                                                const isConfirmed = window.confirm(
                                                  `Are you sure you want to ${
                                                    post?.is_blocked ? "unblock" : "block"
                                                  } this user?`
                                                );
                                                if (isConfirmed) {
                                                  post?.is_blocked
                                                    ? unBlockTheUser(post?.user_id)
                                                    : blockTheUser(post?.user_id);
                                                }
                                              }}
                                            >
                                              <img
                                                src={trash}
                                                alt="alert"
                                                className="w-[20px] h-[20px] cursor-pointer mr-2"
                                              />
                                              {post?.is_blocked
                                                ? "Unblock Account"
                                                : "Block Account"}
                                            </li>
                                          </>
                                   
                                      </ul>
                                    </div>
                                  )}
                              </div>
                              {/* <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                  stroke="#212626"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                                  stroke="#212626"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                                  stroke="#212626"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg> */}
                            </div>
                            <p className="text-left text-[14px] text-[#667877] font-inter font-medium -mt-1">
                              {/* {"Solo Traveler"} • {"Rameswaram"} */}
                              {post?.badge.split("-")[0]}{" "}
                              {post?.location &&
                                post?.badge.split("-")[0] &&
                                "•"}{" "}
                              {post?.location}
                            </p>
                          </div>
                        </div>

                        {/* Post Image */}

                        {/* <img
                          src={post.media_url[0]}
                          alt="Post"
                          className="w-full rounded-[5px] h-[432px] object-cover"
                        /> */}

                        <div
                          onClick={() => handleOpenCommentPopup(post?.id)}
                          className="cursor-pointer relative"
                        >
                          {post.media_url[0].match(
                            /\.(mp4|avi|mov|flv|webm|mkv|mpg|mpeg|3gp)$/
                          ) ? (
                            <video
                              src={post.media_url[0]}
                              alt="Post"
                              className="w-full rounded-[5px] h-[432px] object-cover"
                              controls
                              controlsList="nodownload"
                              onClick={(e) => {
                                e.preventDefault(); // Prevent the default play action on click
                              }}
                            />
                          ) : (
                            <img
                              src={post.media_url[0]}
                              alt="Post"
                              className="w-full rounded-[5px] h-[432px] object-cover"
                            />
                          )}

                          {post?.media_url?.length > 1 && (
                            <img src={morePostIcon} className="absolute top-1/2 left-1/2 flex items-center justify-center" />
                          )}

                          {activePostId === post?.id && isCommentPopup && (
                            <CommentPopup
                              isOpen={isCommentPopup}
                              onClose={() => handleCloseCommentPopup()}
                              postId={post?.id}
                            />
                          )}
                        </div>

                        {/* Post Stats */}
                        <div className="mt-4 text-sm flex justify-between items-center text-gray-600">
                          <div className="flex items-center gap-3 text-[12px] text-[#667877] font-inter font-medium">
                            <span>
                              {post.total_likes}{" "}
                              {post?.total_likes > 1 ? "Likes" : "Like"}&nbsp; •
                              &nbsp;
                              {post.total_comments}{" "}
                              {post.total_comments > 1 ? "Comments" : "Comment"}
                              &nbsp; • &nbsp;{post.total_buckets} Bucket
                              listed&nbsp; • &nbsp;{post.total_shared} Shared
                            </span>
                          </div>
                          <div className="text-right text-[12px] text-[#667877] font-inter font-medium">
                            {formatDate(post?.post_created_at)}
                          </div>
                        </div>

                        {/* Footer */}
                      </div>
                    )
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherUserPostDetails;
