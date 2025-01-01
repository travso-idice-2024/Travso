const express = require("express");
const router = express.Router();
const {  allPosts, postWithlikes ,getAllCategoryLists,removeBucketCollection, unArchivePost ,getArchivePosts, getArchiveStory, getBucketListByName, getActiveStories,getAllBucketLists , getPostComments ,getUserPosts, postComment, postLike, likeAnyComment, replyOnComment, storePost,storeBucketPost, deleteComments, deleteReply, followAndUnfollow, likeToReply, followAndUnfollowFollowing, getPostData, sharePostWithFriends, communityPagePosts, likeStory, replyOnStory, storeStory, storeStoryView, deleteStory, shareStoryWithFriends, editComment} = require('../controllers/postController');
const verifyToken = require("../utils/verifyToken");


// // router.get('/allposts', allPosts);
// router.get('/allposts', postWithlikes);
// router.get('/stories', getActiveStories);
// router.get('/comments/:postId', getPostComments);
// // router.get('/userpost/:postId', getUserPosts);
// router.get('/userpost',verifyToken, getUserPosts);

// router.get('/allposts', postWithlikes);
router.post('/unArchivePost', verifyToken, unArchivePost);
router.get('/allposts', verifyToken, communityPagePosts );
router.get('/getArchivePosts', verifyToken, getArchivePosts);
router.get('/getArchiveStory', verifyToken, getArchiveStory);
router.get('/getAllBucketLists',verifyToken,getAllBucketLists);
router.get('/getAllCategoryLists', verifyToken, getAllCategoryLists);
router.get('/getBucketListByName/:bucketTitle',verifyToken, getBucketListByName);
router.delete('/delete-bucket/:bucketTitle',verifyToken, removeBucketCollection);
// router.get('/allposts/:userId', communityPagePosts );   // for testing
router.get('/stories', verifyToken, getActiveStories);
// router.get('/stories/:userid', getActiveStories);  // for testing
router.get('/comments/:postId', getPostComments);
// router.get('/userpost/:postId', getUserPosts);
router.get('/userpost',verifyToken, getUserPosts);
router.post("/comment-on-post", verifyToken, postComment);
router.post("/like-unlike-post", verifyToken, postLike);
router.post("/like-a-comment/:comment_id",verifyToken, likeAnyComment);
router.post("/reply-on-comment",verifyToken, replyOnComment);
router.post("/commit-post",verifyToken, storePost);
router.post("/bucket-post",verifyToken, storeBucketPost);
router.post("/owner-delete-comment/:id",verifyToken, deleteComments);
router.post("/owner-delete-reply/:replyId",verifyToken, deleteReply);
router.post("/follow-unfollow",verifyToken, followAndUnfollow);
router.post("/follow-unfollow-following",verifyToken, followAndUnfollowFollowing);
router.post("/like-unlike-reply/:reply_id",verifyToken, likeToReply);
router.post("/share-post",verifyToken, sharePostWithFriends);
router.get("/post-data/:postId", getPostData);
router.post("/like-unlike-story", verifyToken, likeStory );
router.post("/comment-on-story", verifyToken, replyOnStory );
router.post("/create-story", verifyToken, storeStory );
router.post("/story-view-count/:story_id", verifyToken, storeStoryView );
router.post("/delete-story/:story_id", verifyToken, deleteStory );
router.post("/share-story", verifyToken, shareStoryWithFriends );
router.post("/edit-comment", verifyToken, editComment );


module.exports = router;