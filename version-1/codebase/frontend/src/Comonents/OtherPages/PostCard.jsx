import React, { useEffect, useRef, useState } from "react";
import Girl from "../../assets/headerIcon/girl.jpg";
import Boy from "../../assets/headerIcon/boy2.jpg";
import Boywithgirl from "../../assets/headerIcon/boywithgirl.png";
import yellowgirl from "../../assets/headerIcon/yellowGirl.png";
import Dialog from "../../assets/headerIcon/Dialog.png";
import like from "../../assets/like.png";
import send from "../../assets/headerIcon/send.png";
import ok from "../../assets/headerIcon/ok.png";
import CommentPopup from "./AllPopupComponent/CommentPopup";
import Saved from "../../assets/headerIcon/archive-minus.png";
import SharePopup from "./AllPopupComponent/SharePopup";
import SavedPopup from "./AllPopupComponent/SavedPopup";
import Travel from "../../assets/travel.png";
import leftIcon from "../../assets/lefticon.png";
import BucketImageSecond from "../../assets/bucketimageSecond.png";
import First from "../../assets/1.png";
import Boy1 from "../../assets/headerIcon/boy1.png";
import p1 from "../../assets/headerIcon/p1.png";
import p2 from "../../assets/headerIcon/p2.png";
import p3 from "../../assets/headerIcon/p3.png";
import dotThree from "../../assets/dotthree.png";
import trash from "../../assets/trash.png";
import entypo_bucket from "../../assets/entypo_bucket.png";
import noto_fire from "../../assets/noto_fire.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../redux/slices/authSlice";
import {
  commitPost,
  deletePost,
  getAllPosts,
  LikeUnlikePost,
  updatePost,
} from "../../redux/slices/postSlice";
import SuccessError from "./SuccessError";
import dummyUserImage from "../../assets/user_image-removebg-preview.png";
import CreateaPostPopup from "./AllPopupComponent/CreateaPostPopup";
import PostDetailPopup from "./AllPopupComponent/PostDetailPopup";
import BadgesIconFirst from "../../assets/BadgesIconFirst.png";

/*badges */
import adventureBadge from "../../assets/Badges/AD.svg";
import soloTraveller from "../../assets/Badges/ST.svg";
import explorerBadge from "../../assets/Badges/EX.svg";
import foodieBadge from "../../assets/Badges/FO.svg";
import luxuryTravelerBadge from "../../assets/Badges/LT.svg";
import ShowBadgeIcon from "./ShowBadgeIcons";
import { Link, useNavigate } from "react-router-dom";
import { getAllTags } from "../../redux/slices/tagSlices";
import PostLoading from "./AllStoriesPages/PostLoading";
import EditPostPopUpDetail from "./AllPopupComponent/EditPostSection/EditPostPopUpDetail";
import EditPostPreview from "./AllPopupComponent/EditPostSection/EditPostPreview";
import CreateBucketListPopup from "./AllPopupComponent/CreateBucketListPopup";

const PostCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCommentPopup, setIsCommentPopup] = useState(false);
  const [isCommentWithSavedPopup, setIsCommentWithSavedPopup] = useState(false);
  const [isSharePopup, setIsSharePopup] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");
  const [flashMsgType, setFlashMsgType] = useState("");
  const [activePostId, setActivePostId] = useState(null);
  const [isCreatePostPopup, setIsCreatePostPopup] = useState(false);
  const [isPostDetailPopup, setIsPostDetailPopup] = useState(false);
  const [isPostLoaderOpen, setIsPostLoaderOpen] = useState(false);
  const [currentIndices, setCurrentIndices] = useState({});

  /* for edit and delete post popup */
  const [openPostPopupId, setOpenPostPopupId] = useState(null);
  const [showPostDotsOption, setShowPostDotsOption] = useState(false);
  const [isEditPostPopup, setIsEditPostPopup] = useState(false);
  const [isEditPreviewOpen, setIsEditPreviewOpen] = useState(false);

  /* for bucket list */
  const [isCreateBucketPopup, setIsCreateBucketPopup] = useState(false);

   /**create bucket post data */
    const [bucketpostData, setbucketpostData] = useState({
          list_name:'',
          buddies: [],
          buddies_id: [],
          post_id:''
    });

  /* used when we are editing any post */
  const [editPostData, setEditPostData] = useState({
    description: "",
    location: "",
    buddies: [],
    tags: [],
    media_url: [],
    is_public: true,
    buddies_id: [],
    post_id: "",
  });

  /* used when we are uploading a post */
  const [postData, setPostData] = useState({
    description: "",
    location: "",
    buddies: [],
    tags: [],
    media_url: [],
    is_public: true,
    buddies_id: [],
  });

  const triggerRef = useRef(null);

  // const { allPosts } = useSelector((state) => state.postSlice);
  const {
    user: userDetails,
    userPosts: allPosts,
    error: reduxSliceError,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!allPosts) {
      // dispatch(getAllPosts());
      dispatch(getUserPosts());
    }
  }, [dispatch]);

  useEffect(() => {
    if (reduxSliceError?.message === "Unauthorized") {
      localStorage.removeItem("token");
      navigate("/login"); // Redirect to login page
    }
  }, [reduxSliceError, navigate]);

  // handle flash messages show
  const handleFlashMessage = (errorMessage, msgType) => {
    setFlashMessage(errorMessage);
    setFlashMsgType(msgType);
    setTimeout(() => {
      setFlashMessage("");
      setFlashMsgType("");
    }, 3000); // Hide the message after 3 seconds
  };

  const handleLikeUnlike = async (postId) => {
    try {
      const likeUnlikeResult = await dispatch(
        LikeUnlikePost({ post_id: postId })
      ).unwrap();
      if (likeUnlikeResult) {
        // await dispatch(getAllPosts());
        await dispatch(getUserPosts());
        // handleFlashMessage(likeUnlikeResult.message, 'success');
      }
    } catch (error) {
      console.log("error in likeunlike api", error);
      const errorMessage = error.error || "Unexpected Error Occured";
      // handleFlashMessage(errorMessage, 'error')
    }
  };

  // Sample data for the popup
  const postDetails = {
    title: "Pankaj Reet Tech",
    subtitle: "Solo Traveler",
    subtitleData: "Rameswaram",
    description:
      "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas. Et integer eget porttitor venenatis sed turpis ut eu. Viverra malesuada lorem sagittis risus aliquam urna duis.",
    image: [Travel, BucketImageSecond, First],
    avtar: Boy1,
    hastag: "#arsitek #art #creative",
  };

  const postDetailsData = {
    title: "Ramesh",
    subtitle: "Tracking",
    subtitleData: "Indore",
    description:
      "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas. Et integer eget porttitor venenatis sed turpis ut eu. Viverra malesuada lorem sagittis risus aliquam urna duis.",
    image: [Travel, BucketImageSecond, First],
    avtar: Girl,
    hastag: "#arsitek #art #creative",
  };

  const images = postDetails.image;
  const imagesData = postDetailsData.image;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);

  /* for showing tagged buddies */
  const [isotherDataVisible, setIsotherDataVisible] = useState(false);
  const [showTaggedBuddiesPostId, setShowTaggedBuddiesPostId] = useState(false);

  const popupRef = useRef(null);
  const editPostRef = useRef(null);

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

  // Function to toggle the full text
  const toggleFullText = () => {
    setIsFullTextVisible(!isFullTextVisible);
  };

  // const goToPrevious = (imgArrLength) => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? imgArrLength - 1 : prevIndex - 1
  //   );
  // };

  // const goToNext = (imgArrLength) => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === imgArrLength - 1 ? 0 : prevIndex + 1
  //   );
  // };

  // const goToSlide = (index) => {
  //   setCurrentIndex(index);
  // };

  /* for changing the image through slider starts */

  // Go to Previous Slide
  const goToPrevious = (postId, imgArrLength) => {
    setCurrentIndices((prevIndices) => ({
      ...prevIndices,
      [postId]:
        prevIndices[postId] !== undefined
          ? prevIndices[postId] === 0
            ? imgArrLength - 1
            : prevIndices[postId] - 1
          : imgArrLength - 1,
    }));
  };

  // Go to Next Slide
  const goToNext = (postId, imgArrLength) => {
    setCurrentIndices((prevIndices) => ({
      ...prevIndices,
      [postId]:
        prevIndices[postId] !== undefined
          ? prevIndices[postId] === imgArrLength - 1
            ? 0
            : prevIndices[postId] + 1
          : 1,
    }));
  };

  // Go to Specific Slide
  const goToSlide = (postId, index) => {
    setCurrentIndices((prevIndices) => ({
      ...prevIndices,
      [postId]: index,
    }));
  };

  /* for changing the image through slider ends */

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

  const handlePostDetailPopup = () => {
    setIsPostDetailPopup(false);
    setIsCreatePostPopup(true);
    // isOpen();
  };

  /* to upload a post */
  const handlePostUpload = async () => {
    try {
      const uploadResult = await dispatch(commitPost(postData)).unwrap();
      if (uploadResult) {
        await dispatch(getUserPosts());
        await dispatch(getAllPosts());
        await dispatch(getAllTags());
        setPostData({
          description: "",
          location: "",
          buddies: [],
          tags: [],
          media_url: [],
          is_public: true,
          buddies_id: [],
        });
        setIsPostDetailPopup(false);
        setIsPostLoaderOpen(true);
        handleFlashMessage("Post Uploaded Successfully", "success");
      }
    } catch (error) {
      console.log("error in handlePostUpload", error);
    }
  };

  // to close share popup
  const handleSharePopupClose = () => {
    setIsSharePopup(false);
    setActivePostId(null);
    dispatch(getUserPosts());
  };

  // to open share popup
  const handleOpenSharePopup = (postId) => {
    setActivePostId(postId);
    setIsSharePopup(true);
  };

  // to close bucket saved popup
  const handleBucketSavedPopupClose = () => {
    setIsCommentWithSavedPopup(false);
    setActivePostId(null);
  };

  // to open share popup
  const handleOpenBucketSavedPopup = (postId) => {
    setActivePostId(postId);
    setIsCommentWithSavedPopup(true);
  };

  // to open comment popup
  const handleOpenCommentPopup = (postId) => {
    // console.log("===postId===>", postId);
    setActivePostId(postId);
    setIsCommentPopup(true);
  };

  // to close comment popup
  const handleCloseCommentPopup = () => {
    setIsCommentPopup(false);
    setActivePostId(null);
  };

  // Simplified badge image logic (coming from backend and svg set from frontend)
  const badges = {
    Adventurer: adventureBadge,
    Explorer: explorerBadge,
    Foodie: foodieBadge,
    "Solo Traveler": soloTraveller,
    "Luxury Traveler": luxuryTravelerBadge,
  };

  const togglePopup = (postId) => {
    // setActivePostId((prevId) => (prevId === postId ? null : postId));
    setIsotherDataVisible(!isotherDataVisible);
    setShowTaggedBuddiesPostId(postId);
  };

  // console.log("===allPosts===on====postcard===>", allPosts);

  /* open popup on particular post */
  const showDeleteEdit = async (post_id) => {
    setOpenPostPopupId(post_id);
    setShowPostDotsOption(true);
  };

  /* option close post dots option */
  const closeDeleteEditPopup = async () => {
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

  /* to open popup for edit post */
  const openEditPostPopup = async (postFullData) => {
    // console.log("===postFullData====>", postFullData);
    await setEditPostData({
      description: postFullData?.description || "",
      location: postFullData?.location || "",
      buddies: postFullData?.buddies_id || [],
      tags: postFullData?.tag_id || [],
      media_url: postFullData?.media_url || [],
      post_id: postFullData?.id || "",
      buddies_id: postFullData?.my_buddies_id || [],
      is_public: postFullData?.is_public,
    });
    await setIsEditPostPopup(true);
  };

  const closeEditPostPopup = async () => {
    setPostData({
      description: "",
      location: "",
      buddies: [],
      tags: [],
      media_url: [],
      is_public: true,
    });
    setIsEditPostPopup(false);
  };

  /* to open editable popup on edit click in edit preview section */
  const handleEditPostDetailPopup = () => {
    setIsEditPreviewOpen(false);
    setIsEditPostPopup(true);
  };

  /* to update a post */
  const handlePostUpdate = async () => {
    console.log("==handlePostUpdate called==", editPostData);
    // return;
    try {
      const updateResult = await dispatch(updatePost(editPostData)).unwrap();
      if (updateResult) {
        await dispatch(getAllPosts());
        await dispatch(getUserPosts());
        setEditPostData({
          description: "",
          location: "",
          buddies: [],
          tags: [],
          media_url: [],
          is_public: true,
          buddies_id: [],
          post_id: "",
        });
        setIsEditPreviewOpen(false);
        setIsPostLoaderOpen(true);
        handleFlashMessage("Post Updated Successfully", "success");
      }
    } catch (error) {
      console.log("===error in handlePostUpdate===>", error);
      handleFlashMessage("Something went wrong", "error");
    }
  };

  const openBucketPopup = ()=>{
    setIsCreateBucketPopup(true);
  }

  const onCloseBucket =()=>{
    setIsCreateBucketPopup(false);
    setIsCommentWithSavedPopup(false);
  }

  // console.log("====openpostpopupid=====", openPostPopupId);

  return (
    <>
      {flashMessage && (
        <SuccessError message={flashMessage} messageType={flashMsgType} />
      )}
      <div className="bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] p-4 px-4 mb-4">
        <h5 className="text-left font-poppins font-semibold text-[20px] text-[#212626]">
          Create a post
        </h5>
        <div className="flex items-center gap-1 mt-4 mb-1">
          {/* Profile Image */}
          <img
            src={userDetails?.profile_image || dummyUserImage}
            alt="Profile"
            className="w-[44px] h-[44px] rounded-full"
          />

          {/* Input Field */}
          <input
            type="text"
            placeholder="Post a story about your travel..."
            className="h-[44px] flex-1 bg-[#F0F7F7] border border-[#F0F7F7] rounded-[24px] outline-none placeholder:text-[#869E9D] pl-3 placeholder:text-[14px] placeholder:font-medium placeholder:font-inter"
            onClick={() => setIsCreatePostPopup(true)}
          />
          {isCreatePostPopup && (
            <CreateaPostPopup
              isOpen={isCreatePostPopup}
              onClose={() => setIsCreatePostPopup(false)}
              openPostDetail={() => setIsPostDetailPopup(true)}
              postData={postData}
              setPostData={setPostData}
            />
          )}

          {isPostDetailPopup && (
            <>
              <PostDetailPopup
                isOpen={isPostDetailPopup}
                onClose={handlePostDetailPopup}
                postData={postData}
                handlePostUpload={handlePostUpload}
              />
            </>
          )}

          {isPostLoaderOpen && (
            <PostLoading
              isOpenLoader={isPostLoaderOpen}
              onCloseLoader={() => setIsPostLoaderOpen(false)}
            />
          )}

          {/* open filled popup from backend data */}
          {isEditPostPopup && (
            <EditPostPopUpDetail
              isOpen={isEditPostPopup}
              onClose={() => setIsEditPostPopup(false)}
              // onClose={() => closeEditPostPopup()}
              openPostDetail={() => setIsEditPreviewOpen(true)}
              editPostData={editPostData}
              setEditPostData={setEditPostData}
            />
          )}

          {/* show edited post preview */}
          {isEditPreviewOpen && (
            <>
              <EditPostPreview
                isOpen={isEditPreviewOpen}
                onClose={() => handleEditPostDetailPopup()}
                editPostData={editPostData}
                handlePostUpdate={handlePostUpdate}
              />
            </>
          )}
        </div>
      </div>

      {/* First Data */}
      {allPosts &&
        allPosts?.map?.((post, index) => {
          return (
            <div key={post?.id}>
              <div className="bg-white rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.10)] p-5 mb-4">
                {/* Top Fixed Section */}
                <div className="flex items-center justify-between space-x-4 mb-1 pb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={post?.profile_image || dummyUserImage}
                      alt="Avatar"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <h3 className="font-poppins font-semibold text-left text-[20px] text-[#212626]">
                            {post?.full_name}
                          </h3>
                          <div>
                            {post?.buddies_id.length > 0 && (
                              <div className="">
                                <p
                                  className="font-poppins font-semibold text-[20px] text-[#212626] cursor-pointer"
                                  onClick={() => togglePopup(post.id)}
                                >
                                  <span className="text-[#869E9D]">
                                    &nbsp;with
                                  </span>{" "}
                                  {post?.buddies_id?.length} others{" "}
                                </p>

                                {isotherDataVisible &&
                                  showTaggedBuddiesPostId == post?.id && (
                                    <div
                                      ref={popupRef}
                                      className="absolute mt-0 w-[416px] p-[24px] bg-white border border-gray-300 rounded-[16px] shadow-lg z-10 flex flex-col gap-[34px]"
                                    >
                                      {post?.buddies_id?.map((buddy) => {
                                        // console.log("===buddybadge", buddy)
                                        return (
                                          <div
                                            className="flex flex-col"
                                            key={buddy?.id}
                                          >
                                            <Link
                                              to={`/profile/${buddy?.user_name}/${buddy?.id}`}
                                            >
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
                                                          badge={buddy?.badge}
                                                        />
                                                      )}

                                                      {buddy?.badge
                                                        ?.split("-")[0]
                                                        ?.trim() ==
                                                        "Luxury Traveler" && (
                                                        <ShowBadgeIcon
                                                          badge={buddy?.badge}
                                                        />
                                                      )}

                                                      {buddy?.badge
                                                        ?.split("-")[0]
                                                        ?.trim() ==
                                                        "Adventurer" && (
                                                        <ShowBadgeIcon
                                                          badge={buddy?.badge}
                                                        />
                                                      )}

                                                      {buddy?.badge
                                                        ?.split("-")[0]
                                                        ?.trim() ==
                                                        "Explorer" && (
                                                        <ShowBadgeIcon
                                                          badge={buddy?.badge}
                                                        />
                                                      )}

                                                      {buddy?.badge
                                                        ?.split("-")[0]
                                                        ?.trim() ==
                                                        "Foodie" && (
                                                        <ShowBadgeIcon
                                                          badge={buddy?.badge}
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
                                                {buddy?.badge?.split("-")[0]}{" "}
                                                &nbsp;•&nbsp; 0 Trips
                                                &nbsp;•&nbsp;{" "}
                                                {buddy?.followers_count || 0}{" "}
                                                followers &nbsp;•&nbsp;{" "}
                                                {buddy?.buddies_count || 0}{" "}
                                                Buddies
                                              </p>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Images beside h3 */}
                        <div className="flex space-x-1">
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

                          {post?.badge?.split("-")[0]?.trim() == "Explorer" && (
                            <ShowBadgeIcon badge={post?.badge} />
                          )}

                          {post?.badge?.split("-")[0]?.trim() == "Foodie" && (
                            <ShowBadgeIcon badge={post?.badge} />
                          )}
                        </div>
                      </div>
                      <p className="-mt-1 font-inter font-medium text-left text-[12px] text-[#667877]">
                        {/* {post?.badge.split("-")[0]} • {post?.location} */}
                        {post?.badge?.split("-")[0]}{" "}
                        {post?.location && post?.badge?.split("-")[0] && "•"}{" "}
                        {post?.location}
                      </p>
                    </div>
                  </div>
                  <div
                    className="relative cursor-pointer"
                    onClick={() => showDeleteEdit(post?.id)}
                  >
                    <img
                      src={dotThree}
                      alt="dotThree"
                      className="h-4 object-cover"
                    />
                    {openPostPopupId === post?.id && showPostDotsOption && (
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
                            onClick={() => closeDeleteEditPopup()}
                            aria-label="Close"
                          >
                            &#x2715;
                          </button>
                        </div>
                        <ul>
                          {post?.user_id === userDetails?.id && (
                            <>
                              <li
                                className="px-4 py-2 flex items-center cursor-pointer hover:bg-[#f0f0f0] rounded-[8px]"
                                onClick={() => {
                                  const isConfirmed = window.confirm(
                                    "Are you sure you want to delete this post?"
                                  );
                                  if (isConfirmed) {
                                    deleteThisPost(post?.id);
                                  }
                                }}
                              >
                                <img
                                  src={trash}
                                  alt="alert"
                                  className="w-[20px] h-[20px] cursor-pointer mr-2"
                                />
                                Delete Post
                              </li>
                              {/* Edit Post */}
                              <li
                                className="px-4 py-2 flex items-center cursor-pointer hover:bg-[#f0f0f0] rounded-[8px]"
                                onClick={() => openEditPostPopup(post)}
                              >
                                <img
                                  src={trash}
                                  alt="alert"
                                  className="w-[20px] h-[20px] cursor-pointer mr-2"
                                />
                                Edit Post
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                {/* Top Fixed Section */}

                {/*---------- Scrollable Part ---------*/}
                <div className="flex-1 overflow-y-auto scrollbar-hidden">
                  {post?.media_url?.length === 1 && (
                    <>
                      <div className="relative w-full max-w-4xl mx-auto">
                        {/* Slider */}
                        <div className="overflow-hidden relative mb-4">
                          <div>
                            {post?.media_url[0]?.match(
                              /\.(mp4|mov|webm|avi|mkv|flv|wmv|ogv|3gp)$/i
                            ) ? (
                              <video
                                controls
                                src={post?.media_url[0]}
                                className="rounded-lg w-full h-[432px] object-cover transition duration-500"
                                onClick={(e) =>
                                  e.target.paused
                                    ? e.target.play()
                                    : e.target.pause()
                                }
                                controlsList="nodownload"
                              >
                                {/* <source
                                  src={post?.media_url[0]}
                                  type="video/mp4"
                                /> */}
                                Your browser does not support the video tag.
                              </video>
                            ) : (
                              <img
                                src={post?.media_url[0]}
                                alt={`Post Image`}
                                className="rounded-lg w-full h-[432px] object-cover transition duration-500"
                                onClick={() => handleOpenCommentPopup(post?.id)}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {post?.media_url?.length > 1 && (
                    <>
                      <div className="relative w-full max-w-4xl mx-auto">
                        {/* Slider Content */}
                        <div className="overflow-hidden relative mb-4">
                          <div>
                            {post?.media_url[
                              currentIndices[post.id] || 0
                            ]?.match(
                              /\.(mp4|mov|webm|avi|mkv|flv|wmv|ogv|3gp)$/i
                            ) ? (
                              <video
                                controls
                                preload="auto"
                                className="rounded-lg w-full h-[432px] object-cover transition duration-500"
                                controlsList="nodownload"
                              >
                                <source
                                  src={
                                    post?.media_url[
                                      currentIndices[post.id] || 0
                                    ]
                                  }
                                  type="video/mp4"
                                />
                                Your browser does not support the video tag.
                              </video>
                            ) : (
                              <img
                                src={
                                  post?.media_url[currentIndices[post.id] || 0]
                                }
                                alt={`Slide ${currentIndices[post.id] || 0}`}
                                className="rounded-lg w-full h-[432px] object-cover transition duration-500"
                                onClick={() => handleOpenCommentPopup(post?.id)}
                              />
                            )}
                          </div>
                        </div>

                        {/* Left Button */}
                        <button
                          onClick={() =>
                            goToPrevious(post.id, post?.media_url?.length)
                          }
                          className="absolute top-1/2 left-4 w-9 h-9 transform -translate-y-1/2 bg-[#EEF0F299] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center"
                        >
                          <svg
                            width="8"
                            height="14"
                            viewBox="0 0 8 14"
                            fill="none"
                          >
                            <path
                              d="M7 13L1 7L7 1"
                              stroke="#212626"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>

                        {/* Right Button */}
                        <button
                          onClick={() =>
                            goToNext(post.id, post?.media_url?.length)
                          }
                          className="absolute top-1/2 right-4 w-9 h-9 transform -translate-y-1/2 bg-[#EEF0F299] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center rotate-180"
                        >
                          <svg
                            width="8"
                            height="14"
                            viewBox="0 0 8 14"
                            fill="none"
                          >
                            <path
                              d="M7 13L1 7L7 1"
                              stroke="#212626"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[68px] h-[16px] rounded-[16px] bg-[#FFFFFFBF]">
                          {post?.media_url?.map((_, index) => (
                            <div
                              key={index}
                              onClick={() => goToSlide(post.id, index)}
                              className={`w-2 h-2 mx-1 rounded-full transform transition-transform duration-300 ${
                                index === (currentIndices[post.id] || 0)
                                  ? "bg-[#2DC6BE] scale-150"
                                  : "bg-[#869E9D] hover:bg-[#2DC6BE] scale-100"
                              } cursor-pointer`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Post Description */}
                  <p className="font-inter font-medium text-[14px] text-[#212626] text-left text-justify mb-1 mt-3">
                    {isFullTextVisible
                      ? post.description
                      : post?.description?.length > 170
                      ? `${post.description.slice(0, 170)}...`
                      : post?.description}
                    <span
                      onClick={toggleFullText}
                      className="text-[#2DC6BE] cursor-pointer"
                    >
                      {post?.description?.length < 170
                        ? ""
                        : isFullTextVisible
                        ? " See less"
                        : "  See more"}
                    </span>
                  </p>

                  {/* Hashtags */}
                  <p className="text-left text-[#1DB2AA] mb-4">
                    {post?.tag_id?.join(" ")}
                  </p>
                </div>

                {/*---------- Scrollable Part ---------*/}

                {/* Bottom Fixed Section */}
                <div className="flex items-center justify-between mb-2">
                  <ul className="flex gap-2">
                    <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                      {/* 72K Love &nbsp; &nbsp;{" "} */}
                      {post?.total_likes}&nbsp;
                      {post?.total_likes > 1 ? "Likes" : "Like"} &nbsp; &nbsp;{" "}
                      <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                    </li>
                    <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                      {post?.total_comments}&nbsp;
                      {post?.total_comments > 1 ? "comments" : "comment"} &nbsp;
                      &nbsp;{" "}
                      <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                    </li>
                    <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                      {post?.total_buckets}&nbsp;
                      {post?.total_buckets > 1
                        ? "Buckets listed"
                        : "Bucket listed"}
                      &nbsp; &nbsp;{" "}
                      <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                    </li>
                    <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                      {post?.total_shared}&nbsp; Shared &nbsp; &nbsp;
                    </li>
                  </ul>
                  <p className="font-inter font-medium text-[12px] text-[#667877] ">
                    {" "}
                    {/* 12 Oct 2024{" "} */}
                    {formatDate(post?.post_created_at)}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <button
                    aria-label="Edit Info"
                    className={`flex items-center justify-center w-[144px] h-[36px] py-1 px-2 rounded-full ${
                      post?.user_liked_post == 1
                        ? "bg-[#2DC6BE] text-white"
                        : "bg-[#F0F7F7] text-[#434C50]"
                    }`}
                    onClick={() => handleLikeUnlike(post.id)}
                  >
                    <img
                      src={noto_fire}
                      alt="like"
                      className="mr-2 w-[20px] h-[20px]"
                    />
                    {/* <span className="font-inter font-medium text-[14px] text-[#212626] "> */}
                    {post?.user_liked_post == 0 ? "Like" : "Liked"}
                    {/* </span> */}
                  </button>

                  <button
                    aria-label="Edit Info"
                    className="flex items-center justify-center w-[144px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full "
                    // onClick={() => setActivePostId(post?.id)}
                    onClick={() => handleOpenCommentPopup(post?.id)}
                  >
                    <img
                      src={Dialog}
                      alt="dialog"
                      className="mr-1 w-[20px] h-[20px]"
                    />
                    <span className="font-inter font-medium text-[14px] text-[#212626]">
                      Comment
                    </span>
                  </button>

                  <button
                    aria-label="Edit Info"
                    className="flex items-center justify-center w-[144px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full relative"
                    // onClick={() => setIsCommentWithSavedPopup(true)}
                    onClick={() => handleOpenBucketSavedPopup(post?.id)}
                  >
                    <img
                      src={entypo_bucket}
                      alt="saved"
                      className="mr-1 w-[20px] h-[20px]"
                    />
                    <span className="font-inter font-medium text-[14px] text-[#212626]">
                      Bucket List
                    </span>
                  </button>

                  <button
                    aria-label="Edit Info"
                    className="flex items-center justify-center w-[144px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full "
                    // onClick={() => setIsSharePopup(true)}
                    onClick={() => handleOpenSharePopup(post?.id)}
                  >
                    <img
                      src={send}
                      alt="send"
                      className="mr-2 w-[20px] h-[20px]"
                    />
                    <span className="font-inter font-medium text-[14px] text-[#212626] ">
                      {postDetails.share} Share
                    </span>
                  </button>

                  {activePostId === post?.id && isCommentPopup && (
                    <CommentPopup
                      isOpen={isCommentPopup}
                      onClose={() => handleCloseCommentPopup()}
                      postId={post?.id}
                    />
                  )}

                  {activePostId === post?.id && isSharePopup && (
                    <SharePopup
                      isOpen={isSharePopup}
                      // onClose={() => setIsSharePopup(false)}
                      onClose={() => handleSharePopupClose()}
                      postId={activePostId}
                      userName={post?.user_name}
                    />
                  )}

                  {/* {activePostId === post?.id && isCommentWithSavedPopup && (
                    <SavedPopup
                      post_id={post.id}
                      isOpen={isCommentWithSavedPopup}
                      // onClose={() => setIsCommentWithSavedPopup(false)}
                      onClose={() => handleBucketSavedPopupClose()}
                    />
                  )} */}

                  {activePostId === post?.id && isCommentWithSavedPopup && (
                    <SavedPopup
                      post_id={post.id}
                      isOpen={isCommentWithSavedPopup}
                      // onClose={() => setIsCommentWithSavedPopup(false)}
                      onClose={() => handleBucketSavedPopupClose()}
                      openBucketPopup={openBucketPopup}
                    />
                  )}

                  {isCreateBucketPopup && (
                    <CreateBucketListPopup
                      post_id={post.id}
                      isOpen={isCreateBucketPopup}
                      onCloseBucket={onCloseBucket}
                      //openPostDetail={() => setIsPostDetailPopup(true)}
                      bucketpostData={bucketpostData}
                      setbucketpostData={setbucketpostData}
                    />
                  )}
                </div>
                {/* Bottom Fixed Section */}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default PostCard;
