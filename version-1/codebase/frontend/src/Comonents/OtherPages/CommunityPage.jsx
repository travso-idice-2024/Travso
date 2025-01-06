import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import CommunityLeftSidebar from "./CommunityLeftSidebar";
import CommunityRightSidebar from "./CommunityRightSidebar";
import Boy1 from "../../assets/headerIcon/boy1.png";
import Girl from "../../assets/headerIcon/girl.jpg";
import story from "../../assets/story.png";
import Travel from "../../assets/travel.png";
import First from "../../assets/1.png";
import BucketImageSecond from "../../assets/bucketimageSecond.png";
import dotThree from "../../assets/dotThree.png";
import trash from "../../assets/trash.png";
import leftIcon from "../../assets/lefticon.png";
import like from "../../assets/like.png";
import Dialog from "../../assets/Dialog.png";
import entypo_bucket from "../../assets/entypo_bucket.png";
import send from "../../assets/headerIcon/send.png";
import blockIcon from "../../assets/block-icon.png";
import p1 from "../../assets/headerIcon/p1.png";
import p2 from "../../assets/headerIcon/p2.png";
import p3 from "../../assets/headerIcon/p3.png";
import floxy from "../../assets/floxy.png";
import noto_fire from "../../assets/noto_fire.png";
import { useDispatch, useSelector } from "react-redux";
// import BadgesIconFirst from "../../../assets/BadgesIconFirst.png";
import BadgesIconFirst from "../../assets/BadgesIconFirst.png";
import {
  blockAccount,
  getAllUsers,
  getOnlineFriends,
  getUserDetails,
  getUserPosts,
  unBlockAccount,
} from "../../redux/slices/authSlice";
import CreateaPostPopup from "./AllPopupComponent/CreateaPostPopup";
import PostDetailPopup from "./AllPopupComponent/PostDetailPopup";
import {
  addCountOnStoryView,
  commentOnStory,
  commitPost,
  deletePost,
  getActiveStories,
  getAllPosts,
  LikeUnlikePost,
  likeUnlikeStory,
  updatePost,
} from "../../redux/slices/postSlice";
import dummyUserImage from "../../assets/user_image-removebg-preview.png";
import SavedPopup from "./AllPopupComponent/SavedPopup";
import SharePopup from "./AllPopupComponent/SharePopup";
import CommentPopup from "./AllPopupComponent/CommentPopup";
import { formatePostDate } from "../../utils/formatPostDate";
import logo from "../../assets/headerIcon/logo.png";
import Background from "../../assets/Background.png";
import EmojiPicker from "emoji-picker-react";
import ShareStoryPopup from "./AllPopupComponent/ShareStoryPopup";
import StoryPage from "./AllStoriesPages/StoryPage";
import StoryViewPage from "./AllStoriesPages/StoryViewPage";
import StoryViewPageUser from "./AllStoriesPages/StoryViewPageUser";
import ShowBadgeIcon from "./ShowBadgeIcons";
import { Link, useNavigate } from "react-router-dom";
import StoryLoading from "./AllStoriesPages/StoryLoading";
import PostLoading from "./AllStoriesPages/PostLoading";
import { getAllTags } from "../../redux/slices/tagSlices";
import SuccessError from "./SuccessError";
import EditPostPreview from "./AllPopupComponent/EditPostSection/EditPostPreview";
import EditPostPopUpDetail from "./AllPopupComponent/EditPostSection/EditPostPopUpDetail";

const CommunityPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  let isDragging = false;
  let startX;
  let scrollLeft;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndices, setCurrentIndices] = useState({}); // to track slider effect on post images
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);
  const [isCreatePostPopup, setIsCreatePostPopup] = useState(false);
  const [isPostDetailPopup, setIsPostDetailPopup] = useState(false);
  const [isPostLoaderOpen, setIsPostLoaderOpen] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");
  const [flashMsgType, setFlashMsgType] = useState("");

  /* for comment popup and saved popup */
  const [isCommentPopup, setIsCommentPopup] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const [isCommentWithSavedPopup, setIsCommentWithSavedPopup] = useState(false);
  const [isSharePopup, setIsSharePopup] = useState(false);

  /* for showing tagged buddies */
  const [isotherDataVisible, setIsotherDataVisible] = useState(false);
  const [showTaggedBuddiesPostId, setShowTaggedBuddiesPostId] = useState(false);

  /* for story section */
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isShareStoryPopup, setIsShareStoryPopup] = useState(false);
  const [activeStoryId, setActiveStoryId] = useState(null);
  const [isCreateSocialPopup, setIsCreateSocialPopup] = useState(false);
  const [dropdownOpenStoryViewSetting, setDropdownOpenStoryViewSetting] =
    useState(false);
  const [isCreateSocialPopupUserItself, setIsCreateSocialPopupUserItself] =
    useState(false);
  const [isShowvisibleStoryViewID, setIsShowvisibleStoryViewID] =
    useState(false);
  const [openDropdownIdUser, setOpenDropdownIdUser] = useState(null);

  /* for edit and delete post popup */
  const editPostRef = useRef(null);
  const [openPostPopupId, setOpenPostPopupId] = useState(null);
  const [showPostDotsOption, setShowPostDotsOption] = useState(false);
  const [isEditPostPopup, setIsEditPostPopup] = useState(false);
  const [isEditPreviewOpen, setIsEditPreviewOpen] = useState(false);

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

  const popupRef = useRef(null);

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

  const hadleShowViewStory = (storyId) => {
    setIsShowvisibleStoryViewID(!isShowvisibleStoryViewID);
  };

  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging = false;
  };

  const [popupBuddiesReelVisible, setPopupBuddiesReelVisible] = useState(false);
  const [currentBuddiesReelIndex, setCurrentBuddiesReelIndex] = useState(null);
  const [dropdownOpenSetting, setDropdownOpenSetting] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // working on reply on comment
  const [showEmojiPickerStory, setShowEmojiPickerStory] = useState(false); // working on reply on comment
  const [activeEmojiStoryId, setActiveEmojiStoryId] = useState(null); // To track the active story
  const [storyReply, setStoryReply] = useState({});
  const [isStoryLoaderOpen, setIsStoryLoaderOpen] = useState(false);
  const storyReplyRef = useRef({});

  const toggleSetting = () => {
    setDropdownOpenSetting(!dropdownOpenSetting);
  };

  /* to see next story */
  const handleBuddiesStoryNext = () => {
    setStoryReply({});
    // console.log("====currentBuddiesReelIndex====>", currentBuddiesReelIndex);
    if (currentBuddiesReelIndex < activeStories.length - 1) {
      setCurrentBuddiesReelIndex(currentBuddiesReelIndex + 1);
    }
  };

  /* to see previous story */
  const handleBuddiesStoryPrevious = () => {
    setStoryReply({});
    // console.log("===currentBuddiesReelIndex===", currentBuddiesReelIndex)
    if (currentBuddiesReelIndex > 1) {
      setCurrentBuddiesReelIndex(currentBuddiesReelIndex - 1);
    } else {
      setCurrentBuddiesReelIndex(1);
    }
  };

  //   const handleBuddiesStoryNext = () => {
  //   setCurrentBuddiesReelIndex((prevIndex) =>
  //     prevIndex < activeStories.length - 1 ? prevIndex + 1 : prevIndex
  //   );
  // };

  // const handleBuddiesStoryPrevious = () => {
  //   setCurrentBuddiesReelIndex((prevIndex) =>
  //     prevIndex > 0 ? prevIndex - 1 : prevIndex
  //   );
  // };

  /* This function is running when clicked on any active story */
  const handleItemBuddiesStoryClick = async (itemId, index) => {
    // console.log("===itemId====>", itemId);
    // console.log("===index====>", index + 1);
    // setCurrentBuddiesReelIndex(itemId-1);
    setCurrentBuddiesReelIndex(index + 1);
    setPopupBuddiesReelVisible(true); // Show the popup
  };

  /* to close story popup */
  const closeBuddiesStoryPopup = () => {
    setCurrentBuddiesReelIndex(null);
    setPopupBuddiesReelVisible(false); // Hide the popup
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

  const images = postDetails.image;

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
  /* redux state data starts */

  const {
    onlineFriends,
    allUsers,
    user: userDetails,
    error: reduxSliceError,
  } = useSelector((state) => state.auth);
  const { allPosts, activeStories } = useSelector((state) => state.postSlice);

  //console.log("=====allPosts===>", allPosts);

  useEffect(() => {
    if (!onlineFriends) {
      dispatch(getOnlineFriends());
    }

    if (!allUsers) {
      dispatch(getAllUsers());
    }

    if (!userDetails) {
      dispatch(getUserDetails());
    }

    if (!activeStories) {
      dispatch(getActiveStories());
    }
  }, [dispatch]);

  useEffect(() => {
    if (reduxSliceError?.message === "Unauthorized") {
      localStorage.removeItem("token");
      navigate("/login"); // Redirect to login page
    }
  }, [reduxSliceError, navigate]);

  /* redux state data ends */

  // Function to toggle the full text
  const toggleFullText = () => {
    setIsFullTextVisible(!isFullTextVisible);
  };

  // const goToPrevious = (mediaLength) => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? mediaLength - 1 : prevIndex - 1
  //   );
  // };

  // const goToNext = (mediaLength) => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === mediaLength - 1 ? 0 : prevIndex + 1
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

  // Sixth Section of Sample data for the popup
  const postDetails1 = {
    title: "Floxy",
    subtitle: "Sponsored",
    subtitleData: "🌍",
    description:
      "Adipiscing sapien felis in semper porttitor massa senectus nunc. Non ac cursus nisl luctus diam dignissim. Cras tincidunt etiam morbi egestas. Et integer eget porttitor venenatis sed turpis ut eu. Viverra malesuada lorem sagittis risus aliquam urna duis.",
    image: [BucketImageSecond, Travel, First],
    avtar: floxy,
    hastag: "#arsitek #art #creative",
  };

  const images1 = postDetails1.image;

  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [isFullTextVisible1, setIsFullTextVisible1] = useState(false);

  // Function to toggle the full text
  const toggleFullText1 = () => {
    setIsFullTextVisible(!isFullTextVisible);
  };

  const goToPrevious1 = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext1 = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide1 = (index) => {
    setCurrentIndex(index);
  };

  const ReelData = [
    {
      title: "Pankaj Reet Tech",
      subtitle: "Solo Traveler",
      subtitleData: "Rameswaram",
      image: BucketImageSecond, // Single image per object
      avtar: Boy1,
    },
    {
      title: "Another Traveler",
      subtitle: "Adventurous Spirit",
      subtitleData: "New York",
      image: Travel, // Single image per object
      avtar: Girl,
    },
    {
      title: "Tech Explorer",
      subtitle: "Gadget Geek",
      subtitleData: "San Francisco",
      image: BucketImageSecond, // Single image per object
      avtar: Boy1,
    },
    {
      title: "Food Lover",
      subtitle: "Chef in the Making",
      subtitleData: "Paris",
      image: Travel, // Single image per object
      avtar: Boy1,
    },
    {
      title: "Nature Enthusiast",
      subtitle: "Wilderness Seeker",
      subtitleData: "Amazon Rainforest",
      image: BucketImageSecond,
      avtar: Boy1,
    },
  ];

  const [ReelIndex, setReelIndex] = useState(0);

  const goToPreviousReel = () => {
    setReelIndex((prevIndex) =>
      prevIndex === 0 ? ReelData.length - 1 : prevIndex - 1
    );
  };

  const goToNextReel = () => {
    setReelIndex((prevIndex) =>
      prevIndex === ReelData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlideReel = (index) => {
    setReelIndex(index);
  };

  const handlePostDetailPopup = () => {
    setIsPostDetailPopup(false);
    setIsCreatePostPopup(true);
    // isOpen();
  };

  // handle flash messages show
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
      // console.log("postData", postData)
      const uploadResult = await dispatch(commitPost(postData)).unwrap();
      if (uploadResult) {
        // console.log("=====uploadResult===>", uploadResult.message);
        await dispatch(getAllPosts());
        await dispatch(getAllTags());
        // await dispatch(getUserPosts());
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
        handleFlashMessage("Post uploaded successfully", "success");
      }
    } catch (error) {
      console.log("error in handlePostUpload", error);
    }
  };

  // to like and unlike post
  const handleLikeUnlike = async (postId) => {
    // console.log("====postId===>", postId);
    try {
      const likeUnlikeResult = await dispatch(
        LikeUnlikePost({ post_id: postId })
      ).unwrap();
      if (likeUnlikeResult) {
        await dispatch(getAllPosts());
        // await dispatch(getUserPosts());
        // handleFlashMessage(likeUnlikeResult.message, 'success');
      }
    } catch (error) {
      console.log("error in likeunlike api", error);
      const errorMessage = error.error || "Unexpected Error Occured";
      // handleFlashMessage(errorMessage, 'error')
    }
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

  // to open share popup
  const handleOpenBucketSavedPopup = (postId) => {
    setActivePostId(postId);
    setIsCommentWithSavedPopup(true);
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

  // to close share popup
  const handleSharePopupClose = () => {
    setIsSharePopup(false);
    setActivePostId(null);
    dispatch(getUserPosts());
  };

  // Simplified badge image logic
  const badges = {
    Adventurer: BadgesIconFirst,
    Explorer: BadgesIconFirst,
    Foodie: BadgesIconFirst,
    "Solo Traveler": BadgesIconFirst,
    "Luxury Traveler": BadgesIconFirst,
  };

  const togglePopup = (postId) => {
    // setActivePostId((prevId) => (prevId === postId ? null : postId));
    setIsotherDataVisible(!isotherDataVisible);
    setShowTaggedBuddiesPostId(postId);
  };

  /* handle input change on story reply input */
  // const handleStoryReplyInputChange = (e, storyId) => {
  //   const { value } = e.target;
  //   setStoryReply((prev) => ({
  //     ...prev,
  //     [storyId]: value,
  //   }));
  // };

  const handleStoryReplyInputChange = (e, storyId) => {
    const { value } = e.target;
    setStoryReply((prev) => ({
      ...prev,
      [storyId]: value,
    }));
    // Optional: If you need state for rendering
  };

  /* Runs when user selects a emoji, then updates emoji in value */
  // const handleEmojiClickStory = (emojiObject, storyId) => {
  //   //  console.log("===storyId===>", storyId);
  //   setStoryReply((prevReplies) => ({
  //     ...prevReplies,
  //     [storyId]: (prevReplies[storyId] || "") + emojiObject.emoji,
  //   }));
  //   // setShowEmojiPicker(false); // Close the emoji picker after selection
  //   setShowEmojiPickerStory(false); // Close the emoji picker after selection
  // };

  const handleEmojiClickStory = (emojiObject, storyId) => {
    setStoryReply((prevReplies) => ({
      ...prevReplies,
      [storyId]: (prevReplies[storyId] || "") + emojiObject.emoji, // Append the selected emoji to the story's reply
    }));

    setShowEmojiPickerStory(false); // Close the emoji picker after selection
    setActiveEmojiStoryId(null); // Reset the active story ID
    setShowEmojiPicker(true);
  };

  /* when user press enters on comment section after writing comment in story */
  // const handleStoryCommentEnter = async (e, storyId, userId) => {
  //   // console.log("=====storyId====>", storyId, "====userId===>", userId);
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     try {
  //       const commentPayload = {
  //         story_id: storyId,
  //         reply_text: storyReply[storyId], // Full comment text
  //       };
  //       // console.log("==commentPayload==>", commentPayload);
  //       const replyResponse = await dispatch(
  //         commentOnStory(commentPayload)
  //       ).unwrap();
  //       // console.log("==replyResponse===>", replyResponse);
  //       if (replyResponse) {
  //         setStoryReply({});
  //       }
  //     } catch (error) {
  //       console.log("error in handleStoryCommentEnter ", error);
  //       const errorMessage = error.error || "Unexpected Error Occured";
  //       // handleFlashMessage(errorMessage, 'error')
  //     }
  //   }
  // };

  const handleStoryCommentEnter = async (
    e,
    storyId,
    storyOwnerId,
    imageUrl,
    userFullName
  ) => {
    // console.log("=======storyOwnerId===>", storyOwnerId);
    if (e.key === "Enter" && !e.shiftKey) {
      try {
        // console.log("====story", storyReply);
        // Retrieve the reply text from the ref
        // const replyText = storyReplyRef.current[storyId];
        // if (!replyText || replyText.trim() === "") return; // Prevent empty submissions

        const commentPayload = {
          story_id: storyId,
          reply_text: storyReply[storyId], // Use the ref value
          story_owner_id: storyOwnerId,
          image_url: imageUrl,
          user_full_name: userFullName,
        };

        const replyResponse = await dispatch(
          commentOnStory(commentPayload)
        ).unwrap();

        if (replyResponse) {
          // Clear the reply for this story ID in the ref
          storyReplyRef.current[storyId] = "";
          // Optionally trigger UI update if needed
          setStoryReply({ ...storyReplyRef.current });
        }
      } catch (error) {
        console.log("Error in handleStoryCommentEnter:", error);
        const errorMessage = error.error || "Unexpected error occurred";
        // handleFlashMessage(errorMessage, 'error');
      }
    }
  };

  /* to send any reply on story */
  const sendReplyToStory = async (storyId, userId) => {
    try {
      const commentPayload = {
        story_id: storyId,
        content: storyReply[storyId], // Full comment text
      };
      // console.log("==commentPayload==>", commentPayload);
      const replyResponse = await dispatch(
        commentOnStory(commentPayload)
      ).unwrap();
      if (replyResponse) {
        setStoryReply({});
      }
    } catch (error) {
      console.log("error in sendReplyToStory", error);
    }
  };

  /* handle like and unlike on a story */
  const handleLikeUnlikeStory = async (storyId) => {
    try {
      // console.log("=====storyId====>", storyId);
      const likeUnlikeResult = await dispatch(
        likeUnlikeStory({ story_id: storyId })
      ).unwrap();
      console.log("===likeUnlikeResult===>", likeUnlikeResult);
    } catch (error) {
      console.log("error in handleLikeUnlikeStory", error);
    }
  };

  /* to block an account */
  const blockTheUser = async (blockId) => {
    // console.log("=====blockId===>", blockId);
    try {
      const response = await dispatch(blockAccount(blockId)).unwrap();
      // console.log("===response===>", response);
      if (response) {
        setOpenPostPopupId(null);
        setShowPostDotsOption(false);
        await dispatch(getAllPosts());
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
        setOpenPostPopupId(null);
        setShowPostDotsOption(false);
        await dispatch(getAllPosts());
      }
    } catch (error) {
      console.log("===error in unBlockTheUser===>", error);
    }
  };

  // to open share popup
  const handleOpenShareStoryPopup = (storyId) => {
    // console.log("===storyId==>", storyId);
    setActiveStoryId(storyId);
    setIsShareStoryPopup(true);
  };

  // to close share popup
  const handleShareStoryPopupClose = () => {
    setIsShareStoryPopup(false);
    setActiveStoryId(null);
    // dispatch(getUserPosts());
  };

  // console.log("=====activeStories===>", activeStories);

  /* showing story of user itself only starts */
  const closeStoryPopup = () => {
    setIsCreateSocialPopupUserItself(false);
  };

  // console.log("===currentBuddiesReelIndex====>", currentBuddiesReelIndex)
  // console.log("===popupBuddiesReelVisible====>", popupBuddiesReelVisible)

  const toggleSettingStoryView = (storyId) => {
    // console.log("=====storyId====>", storyId);
    setOpenDropdownIdUser(storyId);
    // setDropdownOpenStoryViewSetting(!dropdownOpenStoryViewSetting);
  };
  /* showing story of user itself only ends */

  const increaseViewersCount = async (storyId) => {
    try {
      const response = await dispatch(addCountOnStoryView(storyId)).unwrap();
      // console.log("===response=increaseViewersCount=", response);
    } catch (error) {
      console.log("==error in add story count==increaseViewersCount==>", error);
    }
  };

  // const handleEmojiSelectUserID = (id) => {
  //   setActiveEmojiStoryId((prevId) => (prevId === id ? null : id)); // Toggle the picker for the selected story
  // };

  const handleEmojiSelectUserID = (id) => {
    setShowEmojiPicker(true); // Open the emoji picker
    setActiveEmojiStoryId((prevId) => (prevId === id ? null : id)); // Toggle the picker for the selected story
    setShowEmojiPickerStory((prevId) => (prevId === id ? false : true)); // Ensure the picker state is consistent
  };

  // Handle Emoji Picker Close (Cancel)
  const handleCloseEmojiPicker = () => {
    setShowEmojiPicker(false); // Close the emoji picker
  };

  // console.log("===activestories", activeStories)

  /* to close story popup and open loader */
  const handleStoryPopupClose = () => {
    setIsCreateSocialPopup(false);
    setIsStoryLoaderOpen(true);
  };

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
        await dispatch(getUserPosts());
        await dispatch(getAllPosts());
        handleFlashMessage("Post deleted successfully", "success");
      }
    } catch (error) {
      handleFlashMessage("Something went wrong", "success");
      console.log("===error in delete post api===>", error);
    }
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
      // console.log("======updateResult=====>", updateResult);
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

  /* to open popup for edit post */
  const openEditPostPopup = async (postFullData) => {
    // console.log("===postFullData====>", postFullData);
    await setEditPostData({
      description: postFullData?.description || "",
      location: postFullData?.location || "",
      buddies: postFullData?.buddies_id || [],
      tags: postFullData?.tag_id || [],
      media_url: postFullData?.media_url || [],
      post_id: postFullData?.id,
      buddies_id: postFullData?.my_buddies_id || [],
      is_public: postFullData?.is_public,
    });
    await setIsEditPostPopup(true);
  };

  return (
    <>
      <Header />
      {flashMessage && (
        <SuccessError message={flashMessage} messageType={flashMsgType} />
      )}
      <div className="bg-gray-50 py-3 px-3 flex justify-center items-center">
        <div className="container mx-auto flex gap-3">
          {/*-------- Left Section -------*/}
          <div className="w-[340px] flex flex-col">
            <CommunityLeftSidebar />
          </div>
          {/*-------- Left Section -------*/}
          {/*-------- Middle Section -------*/}
          <div className="w-[696px] flex-grow flex flex-col">
            {/*-------- First Section --------*/}
            <div className="bg-white rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.10)] p-5">
              <h2 className="mb-4 font-poppins text-[20px] font-semibold text-[#212626] text-left">
                TravSo Moments
              </h2>
              <div
                ref={sliderRef}
                className="flex overflow-x-auto scroll-smooth no-scrollbar scrollbar-hidden"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onTouchStart={(e) => handleMouseDown(e.touches[0])}
                onTouchMove={(e) => handleMouseMove(e.touches[0])}
                onTouchEnd={handleMouseUpOrLeave}
              >
                <div
                  className="flex flex-col items-center mb-2 mr-2 cursor-pointer"
                  style={{ flex: "0 0 auto" }}
                >
                  {activeStories && activeStories[0].stories.length > 0 ? (
                    <div>
                      <img
                        src={activeStories[0]?.profile_image || dummyUserImage}
                        alt="My Story"
                        className="w-[64px] h-[64px] object-cover rounded-full border-2 border-[#2DC6BE] p-[2px]"
                        onClick={() => setIsCreateSocialPopupUserItself(true)}
                      />
                      <p
                        className="font-inter font-medium text-[14px] mt-2 text-[#212626]"
                        onClick={() => setIsCreateSocialPopupUserItself(true)}
                      >
                        My Story
                      </p>
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
                  ) : (
                    <div>
                      <img
                        src={story}
                        alt="My Story"
                        className="w-[64px] h-[64px] object-cover rounded-full border-2 border-[#2DC6BE] p-[2px]"
                        onClick={() => setIsCreateSocialPopup(true)}
                      />
                      <p
                        className="font-inter font-medium text-[14px] mt-2 text-[#212626]"
                        onClick={() => setIsCreateSocialPopup(true)}
                      >
                        My Story
                      </p>

                      <StoryPage
                        isOpen={isCreateSocialPopup}
                        // onClose={() => setIsCreateSocialPopup(false)}
                        onClose={() => handleStoryPopupClose()}
                        closeThroughCancel={() => setIsCreateSocialPopup(false)}
                      />
                    </div>
                  )}
                  {isStoryLoaderOpen && (
                    <StoryLoading
                      isOpenLoader={isStoryLoaderOpen}
                      onCloseLoader={() => setIsStoryLoaderOpen(false)}
                    />
                  )}
                </div>
                {activeStories &&
                  activeStories.slice(1).map((user, index) => {
                    return (
                      // index > 0 && (
                      <div
                        key={user.id}
                        className="flex flex-col items-center mb-2 mr-2"
                        style={{ flex: "0 0 auto" }}
                        onClick={() =>
                          handleItemBuddiesStoryClick(user.id, index)
                        }
                      >
                        <img
                          src={user.profile_image || dummyUserImage}
                          alt={"Profile"}
                          className="w-[64px] h-[64px] object-cover rounded-full border-2 border-[#2DC6BE] p-[2px]"
                        />
                        <p className="font-inter font-medium text-[14px] mt-2 text-[#212626]">
                          {/* {user.full_name} */}
                          {user.full_name.length > 7
                            ? user.full_name.slice(0, 7) + "..."
                            : user.full_name}
                        </p>
                      </div>
                      // )
                    );
                  })}

                {popupBuddiesReelVisible && currentBuddiesReelIndex && (
                  // <StoryViewPageUser
                  //    closeStoryPopup = {closeStoryPopup}
                  //    toggleSettingStoryView={toggleSettingStoryView}
                  //    dropdownOpenStoryViewSetting={
                  //        dropdownOpenStoryViewSetting
                  //    }
                  //    setDropdownOpenStoryViewSetting={
                  //      setDropdownOpenStoryViewSetting
                  //    }
                  //    storyData = {activeStories[currentBuddiesReelIndex].stories}
                  //    currentBuddiesReelIndex = {currentBuddiesReelIndex}

                  //    isShowvisibleStoryViewID = {isShowvisibleStoryViewID}
                  //    closeBuddiesStoryPopup = {closeBuddiesStoryPopup}
                  //    handleBuddiesStoryPrevious = {handleBuddiesStoryPrevious}
                  //    handleBuddiesStoryNext = {handleBuddiesStoryNext}
                  // />
                  <StoryViewPageUser
                    closeBuddiesStoryPopup={closeBuddiesStoryPopup}
                    currentBuddiesReelIndex={currentBuddiesReelIndex}
                    isShowvisibleStoryViewID={isShowvisibleStoryViewID}
                    storyData={activeStories[currentBuddiesReelIndex].stories}
                    handleBuddiesStoryPrevious={handleBuddiesStoryPrevious}
                    handleBuddiesStoryNext={handleBuddiesStoryNext}
                    handleStoryCommentEnter={handleStoryCommentEnter}
                    handleStoryReplyInputChange={handleStoryReplyInputChange}
                    storyReply={storyReply}
                    handleShareStoryPopupClose={handleShareStoryPopupClose}
                    handleEmojiSelectUserID={handleEmojiSelectUserID}
                    activeEmojiStoryId={activeEmojiStoryId}
                    showEmojiPickerStory={showEmojiPickerStory}
                    handleEmojiClickStory={handleEmojiClickStory}
                    handleLikeUnlikeStory={handleLikeUnlikeStory}
                    increaseViewersCount={increaseViewersCount}
                    showEmojiPicker={showEmojiPicker}
                    handleCloseEmojiPicker={handleCloseEmojiPicker}
                  />
                )}
              </div>
              <div className="flex items-center justify-between gap-2 mt-5 w-full">
                {/* Profile Image */}
                <img
                  src={userDetails?.profile_image || dummyUserImage}
                  alt="Profile"
                  className="w-[48px] h-[44px] rounded-full object-cover"
                />

                <div className="flex items-center bg-[#F0F7F7] p-2 rounded-full h-[44px] w-full">
                  {/* Input Field */}
                  <input
                    type="text"
                    placeholder="Post a story about your travel..."
                    className="flex-1 bg-transparent border-none outline-none placeholder:font-inter font-medium text-[14px] text-[#869E9D] ml-2 "
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
            </div>
            {/*-------- First Section --------*/}

            {/*-------- Second Section --------*/}

            {allPosts &&
              allPosts.map?.((post, index) => {
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
                                {post?.user_id !== userDetails?.id ? (
                                  <>
                                    <Link to={`/profile/${post?.user_name}/${post?.user_id}`}>
                                      <h3 className="font-poppins font-semibold text-left text-[20px] text-[#212626]">
                                        {post?.full_name}
                                      </h3>
                                    </Link>
                                  </>
                                ) : (
                                  <>
                                    <h3 className="font-poppins font-semibold text-left text-[20px] text-[#212626]">
                                      {post?.full_name}
                                    </h3>
                                  </>
                                )}

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
                                                            {buddy?.badge
                                                              ?.split("-")[0]
                                                              ?.trim() ==
                                                              "Solo Traveler" && (
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
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Images beside h3 */}
                              <div className="flex space-x-1">
                                {/* <img
                                  src={
                                    badges[
                                      userDetails?.badge?.split("-")[0]?.trim()
                                    ] || null
                                  }
                                  alt="Badge"
                                  className="w-[24px] h-[24px]"
                                /> */}
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
                            </div>

                            <p className="-mt-1 font-inter font-medium text-left text-[12px] text-[#667877]">
                              {/* {post?.badge.split("-")[0]} • {post?.location} */}
                              {post?.badge.split("-")[0]}{" "}
                              {post?.location &&
                                post?.badge.split("-")[0] &&
                                "•"}{" "}
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
                                        // onClick={() =>
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

                                  {post?.user_id !== userDetails?.id && (
                                    <li
                                      className="px-4 py-2 flex items-center cursor-pointer hover:bg-[#f0f0f0] rounded-[8px]"
                                      onClick={() => {
                                        const isConfirmed = window.confirm(
                                          `Are you sure you want to ${
                                            post?.is_blocked
                                              ? "unblock"
                                              : "block"
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
                                        src={blockIcon}
                                        alt="alert"
                                        className="w-[20px] h-[20px] cursor-pointer mr-2"
                                      />
                                      {post?.is_blocked
                                        ? "Unblock Account"
                                        : "Block Account"}
                                    </li>
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
                                      controlsList="nodownload"
                                    >
                                      {/* <source
                                  src={post?.media_url[0]}
                                  type="video/mp4"
                                /> */}
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                  ) : (
                                    <img
                                      src={post?.media_url[0]}
                                      alt={`Post Image`}
                                      className="rounded-lg w-full h-[432px] object-cover transition duration-500"
                                      onClick={() =>
                                        handleOpenCommentPopup(post?.id)
                                      }
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
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                  ) : (
                                    <img
                                      src={
                                        post?.media_url[
                                          currentIndices[post.id] || 0
                                        ]
                                      }
                                      alt={`Slide ${
                                        currentIndices[post.id] || 0
                                      }`}
                                      className="rounded-lg w-full h-[432px] object-cover transition duration-500"
                                      onClick={() =>
                                        handleOpenCommentPopup(post?.id)
                                      }
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
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[68px] h-[16px] rounded-[16px] bg-[#FFFFFFBF] rounded-[16px]">
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
                            {post?.description?.length < 250
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
                            {post?.total_likes > 1 ? "Likes" : "Like"} &nbsp;
                            &nbsp;{" "}
                            <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                          </li>
                          <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                            {post?.total_comments}&nbsp;
                            {post?.total_comments > 1
                              ? "comments"
                              : "comment"}{" "}
                            &nbsp; &nbsp;{" "}
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
                          {formatePostDate(post?.post_created_at)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <button
                          aria-label="Edit Info"
                          className={`flex items-center justify-center w-[144px] h-[36px] py-1 px-2 rounded-full ${
                            post?.is_liked
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
                          {!post?.is_liked ? "Like" : "Liked"}
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

                        {activePostId === post?.id &&
                          isCommentWithSavedPopup && (
                            <SavedPopup
                              post_id={post.id}
                              isOpen={isCommentWithSavedPopup}
                              // onClose={() => setIsCommentWithSavedPopup(false)}
                              onClose={() => handleBucketSavedPopupClose()}
                            />
                          )}
                      </div>
                      {/* Bottom Fixed Section */}
                    </div>
                  </div>
                );
              })}

            {/*-------- Second Section --------*/}

            {/*-------- Fourth Section --------*/}
            <div className="bg-white rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.10)] p-5 mt-4  ">
              {/* Top Fixed Section */}
              <h2 className="mb-4 font-poppins text-[32px] font-semibold text-[#212626] text-left">
                Reels
              </h2>

              {/* Top Fixed Section */}

              {/*---------- Slider Part ---------*/}
              <div className="relative w-full max-w-4xl mx-auto">
                {/* Slider */}
                <div className="flex justify-between mb-4 overflow-hidden">
                  {Array.from({ length: 3 }).map((_, index) => {
                    const currentIndex = (ReelIndex + index) % ReelData.length; // Loop through data
                    const reel = ReelData[currentIndex];
                    return (
                      <div key={currentIndex} className="flex-shrink-0">
                        <img
                          src={reel.image}
                          alt={`Slide ${currentIndex}`}
                          className="rounded-lg"
                          style={{
                            width: "300px",
                            height: "400px",
                            objectFit: "cover",
                            marginRight: index < 2 ? "20px" : "0",
                          }}
                        />
                        <div className="flex items-center gap-2 mt-2">
                          <img
                            src={reel.avtar}
                            alt="Avatar"
                            className="w-[44px] h-[44px] object-cover rounded-full"
                          />
                          <div>
                            <h3 className="font-poppins text-left font-semibold text-[#212626] text-[16px]">
                              {reel.title}
                            </h3>
                            <p className="font-inter font-medium text-left text-[#212626] text-[14px]">
                              {reel.subtitle} • {reel.subtitleData}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Left Button */}
                <button
                  onClick={goToPreviousReel}
                  className="absolute top-1/2 left-4 w-9 h-9 transform -translate-y-1/2 bg-[#EEF0F299] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center"
                >
                  <img src={leftIcon} alt="leftIcon" />
                </button>

                {/* Right Button */}
                <button
                  onClick={goToNextReel}
                  className="absolute top-1/2 right-4 w-9 h-9 transform -translate-y-1/2 bg-[#EEF0F299] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center rotate-180"
                >
                  <img src={leftIcon} alt="leftIcon" />
                </button>

                {/* Dots */}
                <div className="flex justify-center">
                  {ReelData.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => goToSlideReel(index)}
                      className={`w-2 h-2 mx-1 rounded-full ${
                        index === ReelIndex
                          ? "bg-[#2DC6BE]"
                          : "bg-[#364045] hover:bg-[#2DC6BE]"
                      } cursor-pointer`}
                    ></div>
                  ))}
                </div>
              </div>
              {/*---------- Slider Part ---------*/}
            </div>
            {/*-------- Fourth Section --------*/}

            {/*-------- Fifth Section --------*/}
            <div className="bg-white rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.10)] p-5 mt-4">
              {/* Top Fixed Section */}
              <div className="flex items-center justify-between space-x-4 mb-1 pb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={postDetails.avtar}
                    alt="Avatar"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-poppins font-semibold text-left text-[16px] text-[#212626]">
                        {postDetails.title}
                      </h3>
                      {/* Images beside h3 */}
                      <div className="flex space-x-1">
                        <img
                          src={p1}
                          alt="Image 1"
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <img
                          src={p2}
                          alt="Image 2"
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <img
                          src={p3}
                          alt="Image 3"
                          className="w-4 h-4 rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <p className="-mt-1 font-inter font-medium text-left text-[12px] text-[#667877]">
                      {postDetails.subtitle} • {postDetails.subtitleData}
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    src={dotThree}
                    alt="dotThree"
                    className="h-4 object-cover"
                  />
                </div>
              </div>
              {/* Top Fixed Section */}

              {/*---------- Scrollable Part ---------*/}
              <div className="flex-1 overflow-y-auto scrollbar-hidden">
                <div className="relative w-full max-w-4xl mx-auto">
                  {/* Slider */}
                  <div className="overflow-hidden relative mb-4">
                    <div>
                      <img
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex}`}
                        className="rounded-lg w-full h-[432px] object-cover transition duration-500"
                      />
                    </div>
                  </div>

                  {/* Left Button */}
                  <button
                    onClick={goToPrevious}
                    className="absolute top-1/2 left-4 w-9 h-9 transform -translate-y-1/2 bg-[#EEF0F299] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center"
                  >
                    <img src={leftIcon} alt="leftIcon" className="" />
                  </button>

                  {/* Right Button */}
                  <button
                    onClick={goToNext}
                    className="absolute top-1/2 right-4 w-9 h-9 transform -translate-y-1/2 bg-[#EEF0F299] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center rotate-180"
                  >
                    <img src={leftIcon} alt="leftIcon" className="" />
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[68px] h-[16px] bg-[#FFFFFFBF] rounded-[16px]">
                    {images.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 mx-1 rounded-full ${
                          index === currentIndex
                            ? "bg-[#2DC6BE]"
                            : "bg-[#364045] hover:bg-[#2DC6BE]"
                        } cursor-pointer`}
                      ></div>
                    ))}
                  </div>
                </div>
                {/* Post Description */}
                <p className="font-inter font-medium text-[14px] text-[#212626] text-left text-justify mb-1 mt-3">
                  {isFullTextVisible
                    ? postDetails.description
                    : `${postDetails.description.slice(0, 170)}...`}
                  <span
                    onClick={toggleFullText}
                    className="text-[#2DC6BE] cursor-pointer"
                  >
                    {isFullTextVisible ? " Show less" : " See more"}
                  </span>
                </p>

                {/* Hashtags */}
                <p className="text-left text-[#1DB2AA] mb-2">
                  {postDetails.hastag}
                </p>
              </div>
              {/*---------- Scrollable Part ---------*/}

              {/* Bottom Fixed Section */}
              <div className="flex items-center justify-between">
                <ul className="flex gap-2">
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                    72K Love &nbsp; &nbsp;{" "}
                    <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                  </li>
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                    50K comments &nbsp; &nbsp;{" "}
                    <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                  </li>
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                    2.3K Bucket listed &nbsp; &nbsp;{" "}
                    <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                  </li>
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                    1K Shared &nbsp; &nbsp;
                  </li>
                </ul>
                <p className="font-inter font-medium text-[12px] text-[#667877] ">
                  {" "}
                  12 Oct 2024{" "}
                </p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <button
                  aria-label="Edit Info"
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#2DC6BE] text-white text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full hover:bg-[#2DC6BE] hover:text-white"
                >
                  <img
                    src={like}
                    alt="like"
                    className="mr-2 w-[20px] h-[20px]"
                  />
                  <span className="font-inter font-medium text-[14px] text-[#212626] hover:text-white">
                    Liked
                  </span>
                </button>

                <button
                  aria-label="Edit Info"
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full "
                >
                  <img
                    src={Dialog}
                    alt="dialog"
                    className="mr-1 w-[20px] h-[20px]"
                  />
                  <span className="font-inter font-medium text-[14px] text-[#212626] ">
                    Comment
                  </span>
                </button>

                <button
                  aria-label="Edit Info"
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full relative"
                >
                  <img
                    src={entypo_bucket}
                    alt="saved"
                    className="mr-1 w-[20px] h-[20px]"
                  />
                  <span className="font-inter font-medium text-[14px] text-[#212626] ">
                    Bucket List
                  </span>
                </button>

                <button
                  aria-label="Edit Info"
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full "
                >
                  <img
                    src={send}
                    alt="send"
                    className="mr-2 w-[20px] h-[20px]"
                  />
                  <span className="font-inter font-medium text-[14px] text-[#212626]">
                    {postDetails.share} Share
                  </span>
                </button>
              </div>
              {/* Bottom Fixed Section */}
            </div>
            {/*-------- Fifth Section --------*/}

            {/*-------- Sixth Section --------*/}
            <div className="bg-white rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.10)] p-5 mt-4  ">
              {/* Top Fixed Section */}
              <div className="flex items-center justify-between space-x-4 mb-1 pb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={postDetails1.avtar}
                    alt="Avatar"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-poppins font-semibold text-left text-[16px] text-[#212626]">
                        {postDetails1.title}
                      </h3>
                      {/* Images beside h3 */}
                      <div className="flex space-x-1">
                        <img
                          src={p1}
                          alt="Image 1"
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <img
                          src={p2}
                          alt="Image 2"
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <img
                          src={p3}
                          alt="Image 3"
                          className="w-4 h-4 rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <p className="-mt-1 font-inter font-medium text-left text-[12px] text-[#667877]">
                      {postDetails1.subtitle} • {postDetails1.subtitleData}
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    src={dotThree}
                    alt="dotThree"
                    className="h-4 object-cover"
                  />
                </div>
              </div>
              {/* Top Fixed Section */}

              {/*---------- Scrollable Part ---------*/}
              <div className="flex-1 overflow-y-auto scrollbar-hidden">
                <div className="relative w-full max-w-4xl mx-auto">
                  {/* Slider */}
                  <div className="overflow-hidden relative mb-4">
                    <div>
                      <img
                        src={images1[currentIndex1]}
                        alt={`Slide ${currentIndex1}`}
                        className="rounded-lg w-full h-[432px] object-cover transition duration-500"
                      />
                    </div>
                  </div>

                  {/* Left Button */}
                  <button
                    onClick={goToPrevious1}
                    className="absolute top-1/2 left-4 w-9 h-9 transform -translate-y-1/2 bg-[#EEF0F299] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center"
                  >
                    <img src={leftIcon} alt="leftIcon" className="" />
                  </button>

                  {/* Right Button */}
                  <button
                    onClick={goToNext1}
                    className="absolute top-1/2 right-4 w-9 h-9 transform -translate-y-1/2 bg-[#EEF0F299] text-white rounded-full hover:bg-[#2DC6BE] flex items-center justify-center rotate-180"
                  >
                    <img src={leftIcon} alt="leftIcon" className="" />
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[68px] h-[16px] rounded-[16px] bg-[#FFFFFFBF]">
                    {images1.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => goToSlide1(index)}
                        className={`w-2 h-2 mx-1 rounded-full ${
                          index === currentIndex1
                            ? "bg-[#2DC6BE]"
                            : "bg-[#364045] hover:bg-[#2DC6BE]"
                        } cursor-pointer`}
                      ></div>
                    ))}
                  </div>
                </div>
                {/* Post Description */}
                <p className="font-inter font-medium text-[14px] text-[#212626] text-left text-justify mb-1 mt-3">
                  {isFullTextVisible1
                    ? postDetails1.description
                    : `${postDetails1.description.slice(0, 170)}...`}
                  <span
                    onClick={toggleFullText1}
                    className="text-[#2DC6BE] cursor-pointer"
                  >
                    {isFullTextVisible1 ? " Show less" : " See more"}
                  </span>
                </p>

                {/* Hashtags */}
                <p className="text-left text-[#1DB2AA] mb-2">
                  {postDetails1.hastag}
                </p>
              </div>
              {/*---------- Scrollable Part ---------*/}

              {/* Bottom Fixed Section */}
              <div className="flex items-center justify-between">
                <ul className="flex gap-2">
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                    72K Love &nbsp; &nbsp;{" "}
                    <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                  </li>
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                    50K comments &nbsp; &nbsp;{" "}
                    <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                  </li>
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                    2.3K Bucket listed &nbsp; &nbsp;{" "}
                    <div className="w-[4px] h-[4px] bg-[#869E9D] rounded-full"></div>
                  </li>
                  <li className="flex items-center font-inter font-medium text-[12px] text-[#667877] ">
                    1K Shared &nbsp; &nbsp;
                  </li>
                </ul>
                <p className="font-inter font-medium text-[12px] text-[#667877] ">
                  {" "}
                  12 Oct 2024{" "}
                </p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <button
                  aria-label="Edit Info"
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#2DC6BE] text-white text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full hover:bg-[#2DC6BE] hover:text-white"
                >
                  <img
                    src={like}
                    alt="like"
                    className="mr-2 w-[20px] h-[20px]"
                  />
                  <span className="font-inter font-medium text-[14px] text-[#212626] hover:text-white">
                    Liked
                  </span>
                </button>

                <button
                  aria-label="Edit Info"
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full "
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
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full relative"
                >
                  <img
                    src={entypo_bucket}
                    alt="saved"
                    className="mr-1 w-[20px] h-[20px]"
                  />
                  <span className="font-inter font-medium text-[14px] text-[#212626] ">
                    Bucket List
                  </span>
                </button>

                <button
                  aria-label="Edit Info"
                  className="flex items-center justify-center w-[130px] h-[36px] bg-[#F0F7F7] text-[#434C50] hover:text-gray-800 py-1 px-2 rounded-full "
                >
                  <img
                    src={send}
                    alt="send"
                    className="mr-2 w-[20px] h-[20px]"
                  />
                  <span className="font-inter font-medium text-[14px] text-[#212626]">
                    Share
                  </span>
                </button>
              </div>
              {/* Bottom Fixed Section */}
              <div className="flex items-center justify-center rounded-full gap-[4px] padding-[8px] h-[36px] bg-[#F0F7F7] mt-4">
                <img
                  src={Dialog}
                  alt="Dialog"
                  className="w-[20px] h-[20px] cursor-pointer"
                />
                <p className="font-inter font-medium text-[14px] text-[#212626] hover:text-[#2DC6BE] cursor-pointer">
                  Visit link
                </p>
              </div>
            </div>
            {/*-------- Sixth Section --------*/}
          </div>
          {/*-------- Middle Section -------*/}
          {/*-------- Right Section -------*/}
          <div className="w-[340px] flex flex-col">
            <CommunityRightSidebar />
          </div>
          {/*-------- Right Section -------*/}
        </div>
      </div>
    </>
  );
};

export default CommunityPage;
