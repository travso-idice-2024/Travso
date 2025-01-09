-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2025 at 12:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travso-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `bkt_lists`
--

CREATE TABLE `bkt_lists` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `list_name` varchar(255) NOT NULL,
  `is_default` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `block_user`
--

CREATE TABLE `block_user` (
  `id` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
  `blocked_id` int(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `block_user`
--

INSERT INTO `block_user` (`id`, `user_id`, `blocked_id`, `created_at`, `updated_at`) VALUES
(1, 1, 2, '2024-12-12 10:48:26', '2024-12-12 10:48:26'),
(2, 27, 13, '2024-12-12 11:58:08', '2024-12-12 11:58:08'),
(3, 27, 9, '2024-12-15 11:12:35', '2024-12-15 11:12:35'),
(4, 27, 9, '2024-12-15 11:12:39', '2024-12-15 11:12:39'),
(9, 27, 50, '2024-12-31 13:34:24', '2024-12-31 13:34:24'),
(18, 27, 52, '2025-01-03 10:02:36', '2025-01-03 10:02:36'),
(37, 57, 27, '2025-01-07 10:31:39', '2025-01-07 10:31:39');

-- --------------------------------------------------------

--
-- Table structure for table `bucket_category_list`
--

CREATE TABLE `bucket_category_list` (
  `id` int(10) NOT NULL,
  `user_id` int(255) NOT NULL,
  `post_id` int(255) NOT NULL,
  `buddy_id` varchar(255) DEFAULT NULL,
  `list_name` varchar(255) DEFAULT NULL,
  `is_default` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bucket_category_list`
--

INSERT INTO `bucket_category_list` (`id`, `user_id`, `post_id`, `buddy_id`, `list_name`, `is_default`, `created_at`, `updated_at`) VALUES
(31, 27, 5, '[68]', 'profilebucket', 0, '2025-01-08 13:04:59', '2025-01-08 13:04:59'),
(35, 27, 5, '[68]', 'profilebucket', 0, '2025-01-08 19:45:04', '2025-01-08 19:45:04'),
(44, 27, 4, '[68]', 'firstbucket', 0, '2025-01-09 10:50:12', '2025-01-09 10:50:12'),
(45, 27, 4, '[]', 'testnamebucket', 0, '2025-01-09 10:51:03', '2025-01-09 10:51:03'),
(46, 27, 5, '[50]', 'travel', 0, '2025-01-09 14:02:21', '2025-01-09 14:02:21');

-- --------------------------------------------------------

--
-- Table structure for table `bucket_list`
--

CREATE TABLE `bucket_list` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bucket_list`
--

INSERT INTO `bucket_list` (`id`, `post_id`, `user_id`, `created_at`) VALUES
(1, 1, 27, '2024-11-26 06:39:04'),
(2, 4, 27, '2024-11-26 06:39:04');

-- --------------------------------------------------------

--
-- Table structure for table `buddies`
--

CREATE TABLE `buddies` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `buddies_id` int(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buddies`
--

INSERT INTO `buddies` (`id`, `user_id`, `buddies_id`, `created_at`) VALUES
(32, 13, 27, '2024-12-13 05:15:31'),
(35, 27, 23, '2024-12-18 11:51:50'),
(44, 27, 26, '2024-12-18 13:37:07'),
(48, 51, 27, '2024-12-19 13:04:23'),
(67, 55, 27, '2025-01-01 07:53:28'),
(70, 56, 27, '2025-01-01 07:53:28'),
(74, 59, 27, '2025-01-01 07:53:28'),
(86, 50, 27, '2025-01-03 08:01:18'),
(95, 57, 55, '2025-01-07 11:29:16'),
(98, 57, 19, '2025-01-07 11:48:58'),
(106, 57, 68, '2025-01-08 05:06:02'),
(107, 57, 13, '2025-01-08 05:14:37'),
(108, 57, 30, '2025-01-08 05:15:07'),
(109, 57, 11, '2025-01-08 05:15:15'),
(111, 50, 27, '2025-01-08 05:28:18'),
(113, 50, 51, '2025-01-08 05:40:24'),
(114, 27, 50, '2025-01-08 10:15:42'),
(115, 27, 57, '2025-01-08 10:29:07'),
(120, 77, 9, '2025-01-09 04:31:52'),
(121, 78, 11, '2025-01-09 05:15:30'),
(122, 78, 13, '2025-01-09 05:15:37');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `user_id`, `content`, `created_at`) VALUES
(4, 4, 11, 'Where are you?', '2024-11-26 07:46:22'),
(8, 4, 27, 'dsdhjh', '2024-11-27 11:37:35'),
(15, 4, 27, 'hello', '2024-11-28 12:17:09'),
(16, 4, 27, 'second time hello', '2024-11-28 12:18:49'),
(17, 4, 27, '😅', '2024-11-28 12:29:26'),
(18, 4, 27, 'hello bhai kya haalchaal😀', '2024-11-28 12:30:23'),
(20, 4, 27, 'testing comment', '2024-11-28 13:30:58'),
(21, 4, 27, 'rishabh thank you bhaiya', '2024-11-28 13:33:42'),
(22, 1, 27, 'hello', '2024-11-29 06:03:27'),
(23, 1, 27, 'hii', '2024-11-29 06:05:02'),
(24, 1, 27, 'test comment 15', '2024-11-29 06:05:43'),
(25, 4, 27, 'hello', '2024-11-29 06:17:34'),
(26, 4, 27, 'kkk', '2024-11-29 06:18:20'),
(28, 1, 27, 'new comment', '2024-11-29 09:52:31'),
(29, 1, 27, 'test again', '2024-11-29 09:55:33'),
(30, 1, 27, 'nikhil testing', '2024-11-29 09:57:04'),
(31, 1, 27, 'hello', '2024-12-02 14:09:14'),
(32, 1, 27, '🙃', '2024-12-02 14:15:36'),
(33, 5, 27, 'hello', '2024-12-02 17:26:02'),
(34, 1, 27, 'hello', '2024-12-02 17:54:57'),
(35, 1, 27, 'final comment on button click', '2024-12-02 17:59:35'),
(36, 1, 27, 'without button', '2024-12-02 17:59:43'),
(37, 1, 27, '😀', '2024-12-02 18:55:48'),
(38, 1, 27, 'k22', '2024-12-03 08:35:54'),
(39, 1, 27, 'test comment 3', '2024-12-03 10:34:27'),
(41, 8, 27, 'hello', '2024-12-03 17:24:31'),
(42, 8, 27, 'how are you', '2024-12-03 17:24:40'),
(43, 1, 27, '😁', '2024-12-04 05:38:52'),
(44, 1, 27, 'hii', '2024-12-04 06:00:01'),
(46, 1, 27, 'Hello buddy', '2024-12-04 06:59:42'),
(47, 1, 27, 'hello buddy 2', '2024-12-04 07:01:19'),
(48, 8, 27, '🙋', '2024-12-04 10:42:30'),
(49, 9, 27, '🤪', '2024-12-04 11:54:54'),
(50, 4, 27, 'hii', '2024-12-04 12:01:37'),
(52, 9, 27, 'hello bhai', '2024-12-05 12:43:13'),
(53, 9, 27, 'hello bbai 2', '2024-12-05 12:44:17'),
(54, 9, 27, 'hello bhai 3', '2024-12-05 12:44:44'),
(58, 9, 27, 'hello', '2024-12-07 12:05:27'),
(61, 14, 27, 'hello', '2024-12-09 12:40:04'),
(62, 14, 27, 'Hello 5', '2024-12-10 06:13:39'),
(63, 14, 27, '@krishna hello', '2024-12-10 08:47:28'),
(64, 14, 27, '@Nikhil hello bhai', '2024-12-10 08:50:30'),
(66, 14, 27, 'nikhil bhai hello', '2024-12-10 09:55:55'),
(67, 15, 27, 'comment 1', '2024-12-14 05:06:16'),
(68, 1, 27, 'comment from community', '2024-12-14 06:42:08'),
(70, 17, 27, 'hello', '2024-12-18 05:28:55'),
(71, 1, 27, 'new comment', '2024-12-18 05:57:04'),
(72, 1, 27, 'new comment added', '2024-12-18 06:40:59'),
(73, 8, 27, 'hello everyone', '2024-12-18 06:45:17'),
(74, 7, 27, 'first comment', '2024-12-18 06:47:50'),
(75, 7, 27, 'second comment', '2024-12-18 06:50:47'),
(76, 7, 27, 'third comment', '2024-12-18 06:57:05'),
(77, 1, 50, 'comment from tendulkar', '2024-12-18 11:23:46'),
(78, 1, 50, 'new comment from tendulkar', '2024-12-18 11:37:31'),
(79, 1, 27, 'test comment', '2024-12-19 10:49:35'),
(80, 19, 52, 'first comment😅', '2024-12-19 13:17:33'),
(83, 4, 52, 'hello', '2024-12-20 08:04:10'),
(91, 25, 27, 'dsdnnjnd', '2024-12-24 14:08:26'),
(92, 25, 27, 'removed all edited comment', '2024-12-25 13:49:51'),
(93, 25, 51, 'dshgdhsgdhg', '2024-12-26 06:16:18'),
(97, 40, 27, 'hello', '2024-12-31 05:37:29'),
(98, 40, 27, 'hii', '2024-12-31 05:51:44'),
(99, 40, 27, 'hi', '2024-12-31 06:06:59'),
(103, 25, 57, 'hiii', '2025-01-01 06:49:13'),
(106, 27, 27, 'hii', '2025-01-02 09:54:30'),
(111, 19, 27, 'hello daksh', '2025-01-03 10:02:50'),
(113, 50, 27, 'hii', '2025-01-04 12:14:07'),
(114, 50, 27, 'hello 2', '2025-01-04 12:22:06'),
(115, 51, 68, 'First comment on raman post', '2025-01-06 05:24:36'),
(116, 52, 68, 'hiii', '2025-01-06 06:07:19'),
(121, 6, 57, 'hii', '2025-01-06 13:26:25'),
(122, 53, 57, 'hiii', '2025-01-07 09:09:04'),
(123, 53, 57, 'hello', '2025-01-07 10:20:28'),
(125, 56, 75, 'Hello', '2025-01-07 13:46:47');

-- --------------------------------------------------------

--
-- Table structure for table `comments_like`
--

CREATE TABLE `comments_like` (
  `id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments_like`
--

INSERT INTO `comments_like` (`id`, `comment_id`, `user_id`, `created_at`) VALUES
(5, 1, 44, '2024-12-02 12:28:06'),
(8, 1, 27, '2024-12-02 17:41:24'),
(13, 2, 27, '2024-12-03 10:26:48'),
(23, 45, 27, '2024-12-04 07:00:58'),
(24, 5, 27, '2024-12-05 06:04:05'),
(30, 61, 27, '2024-12-10 06:11:47'),
(31, 62, 27, '2024-12-10 06:13:42'),
(32, 78, 50, '2024-12-18 11:37:37'),
(33, 80, 52, '2024-12-19 13:17:38'),
(37, 112, 66, '2025-01-03 10:27:33');

-- --------------------------------------------------------

--
-- Table structure for table `comment_reply`
--

CREATE TABLE `comment_reply` (
  `id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment_reply`
--

INSERT INTO `comment_reply` (`id`, `comment_id`, `user_id`, `content`, `created_at`) VALUES
(15, 42, 27, '😆', '2024-12-04 10:53:35'),
(16, 42, 27, '😄', '2024-12-04 11:17:00'),
(24, 42, 27, 'first reply', '2024-12-05 11:48:44'),
(30, 49, 27, 'hello', '2024-12-09 10:02:49'),
(32, 61, 27, 'hello2', '2024-12-09 12:40:12'),
(33, 61, 27, '😆', '2024-12-09 12:40:43'),
(34, 61, 27, 'hello 3', '2024-12-10 06:12:49'),
(35, 61, 27, '@Nikhil replied', '2024-12-10 08:51:14'),
(36, 61, 27, 'hii', '2024-12-10 08:53:33'),
(38, 78, 27, '2nd tendulkar', '2024-12-18 11:38:18'),
(39, 80, 52, 'main hi reply kr rha hu', '2024-12-19 13:17:54'),
(41, 91, 27, '👋hello😁hello2', '2024-12-25 13:48:39'),
(42, 91, 27, 'kdgk😆', '2024-12-25 13:48:47'),
(43, 91, 27, 'GAKCGAKCG😁', '2024-12-25 13:49:29'),
(44, 91, 51, 'reply from akash😁', '2024-12-27 11:55:28'),
(46, 97, 27, 'hello ka reply', '2024-12-31 05:59:36'),
(47, 97, 27, 'reply 1', '2024-12-31 06:07:22'),
(50, 113, 27, 'hii', '2025-01-04 12:24:51'),
(55, 122, 27, 'hello', '2025-01-08 10:02:19');

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `id` int(11) NOT NULL,
  `follower_id` int(11) NOT NULL,
  `followee_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`id`, `follower_id`, `followee_id`, `created_at`) VALUES
(665, 51, 50, '2024-12-19 13:03:53'),
(705, 52, 9, '2024-12-20 09:12:00'),
(781, 19, 57, '2025-01-07 07:45:28'),
(789, 57, 19, '2025-01-07 11:48:58'),
(793, 57, 55, '2025-01-07 11:57:57'),
(818, 27, 50, '2025-01-07 14:23:41'),
(819, 27, 57, '2025-01-07 14:23:53'),
(823, 57, 13, '2025-01-08 05:14:37'),
(824, 57, 11, '2025-01-08 05:14:43'),
(825, 57, 30, '2025-01-08 05:15:07'),
(830, 50, 51, '2025-01-08 05:40:24'),
(834, 27, 51, '2025-01-08 11:20:54'),
(840, 77, 9, '2025-01-09 04:31:34'),
(841, 78, 11, '2025-01-09 05:15:26'),
(842, 78, 13, '2025-01-09 05:15:37'),
(843, 27, 13, '2025-01-09 05:18:12'),
(845, 50, 27, '2025-01-09 05:22:51'),
(846, 27, 68, '2025-01-09 08:11:12');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `post_id`, `user_id`, `created_at`) VALUES
(1, 1, 26, '2024-11-25 07:13:42'),
(2, 1, 13, '2024-11-25 07:13:42'),
(3, 1, 19, '2024-11-25 07:14:05'),
(5, 4, 28, '2024-11-26 05:15:51'),
(99, 14, 27, '2024-12-13 11:00:05'),
(104, 12, 27, '2024-12-14 08:27:18'),
(107, 6, 27, '2024-12-16 08:22:43'),
(110, 9, 27, '2024-12-18 05:10:29'),
(113, 7, 27, '2024-12-18 06:57:10'),
(135, 16, 27, '2024-12-18 11:36:18'),
(137, 1, 50, '2024-12-18 11:37:22'),
(140, 5, 27, '2024-12-18 11:48:24'),
(141, 19, 52, '2024-12-19 13:17:14'),
(143, 17, 27, '2024-12-19 14:12:46'),
(146, 11, 27, '2024-12-19 14:14:58'),
(147, 1, 27, '2024-12-20 07:07:47'),
(148, 10, 27, '2024-12-20 07:08:01'),
(149, 1, 52, '2024-12-20 07:28:48'),
(150, 4, 52, '2024-12-20 07:33:56'),
(161, 22, 27, '2024-12-25 10:09:26'),
(166, 26, 27, '2024-12-25 13:47:59'),
(168, 28, 27, '2024-12-25 14:06:32'),
(170, 39, 27, '2024-12-28 05:50:25'),
(174, 25, 27, '2025-01-01 08:45:18'),
(177, 27, 27, '2025-01-02 09:57:49'),
(181, 19, 27, '2025-01-03 10:02:54'),
(182, 51, 66, '2025-01-03 10:27:36'),
(200, 50, 57, '2025-01-06 13:18:50'),
(204, 32, 57, '2025-01-06 13:20:23'),
(205, 5, 57, '2025-01-06 13:25:33'),
(207, 53, 57, '2025-01-07 10:34:20'),
(208, 56, 75, '2025-01-07 13:43:04'),
(209, 34, 27, '2025-01-07 14:21:15'),
(212, 59, 77, '2025-01-08 14:49:48'),
(213, 60, 78, '2025-01-09 05:16:09'),
(215, 50, 27, '2025-01-09 07:42:28');

-- --------------------------------------------------------

--
-- Table structure for table `list_posts`
--

CREATE TABLE `list_posts` (
  `id` int(11) NOT NULL,
  `list_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `saved_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_public` tinyint(1) DEFAULT 1,
  `description` text DEFAULT NULL,
  `buddies_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`buddies_id`)),
  `tag_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tag_id`)),
  `location` varchar(255) DEFAULT NULL,
  `media_url` longtext NOT NULL DEFAULT '[]',
  `status` enum('active','inactive','deleted') DEFAULT 'active',
  `block_post` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_archive` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `is_public`, `description`, `buddies_id`, `tag_id`, `location`, `media_url`, `status`, `block_post`, `created_at`, `updated_at`, `is_archive`) VALUES
(1, 27, 1, 'An application designed and developed to serve the purpose of traveling, like planning, booking, and managing is a travel app. An application has various other features, such as saving all the travel-related information and managing travel apps.', '2', '[\"#posttag\",\"#testtag\"]', 'Indore', '[\"https://images.unsplash.com/photo-1521575107034-e0fa0b594529?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBvc3R8ZW58MHx8MHx8fDA%3D\",\"https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D\"]', 'active', 0, '2024-11-25 06:29:48', '2024-12-13 09:48:33', 1),
(2, 13, 1, 'Post description 2', '1', '[]', 'Pune', '[\"https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D\"]', 'inactive', 0, '2024-11-25 06:29:48', '2024-12-16 08:46:25', 1),
(3, 27, 1, 'Post description 3', '1', '[]', 'Bhopal', '[\"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg\"]', 'deleted', 1, '2024-11-25 06:29:48', '2024-12-13 09:48:49', 1),
(4, 27, 1, 'Post description 4', '3', '[]', 'Mumbai', '[\"https://image-processor-storage.s3.us-west-2.amazonaws.com/images/866759932dc5358cee86f6552d1250f2/inside-bubble-spheres.jpg\"]', 'active', 1, '2024-11-25 06:29:48', '2024-12-13 09:48:57', 1),
(5, 27, 0, 'Post description 5', '1', '[]', 'Goa', '[\"https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg\"]', 'active', 0, '2024-11-25 06:29:48', '2024-12-13 09:49:12', 1),
(6, 27, 1, 'My First Post', NULL, NULL, NULL, '[]', 'active', 0, '2024-12-03 13:19:58', '2024-12-03 13:19:58', 1),
(7, 27, 1, 'Second Post😀', NULL, NULL, NULL, '[]', 'active', 0, '2024-12-03 13:28:55', '2024-12-03 13:28:55', 1),
(8, 27, 1, 'Third Post', NULL, NULL, NULL, '[]', 'active', 0, '2024-12-03 13:40:10', '2024-12-03 13:40:10', 1),
(9, 27, 1, 'Fourth Post', NULL, NULL, NULL, '[]', 'active', 0, '2024-12-03 13:41:14', '2024-12-03 13:41:14', 1),
(10, 27, 1, 'This is first test comment', '[19,23]', '[\"#travel\",\"#posttag\"]', NULL, '[]', 'active', 0, '2024-12-07 11:04:26', '2024-12-07 11:05:21', 1),
(11, 27, 1, 'Test Post for images', '[]', '[]', NULL, '[\"http://localhost:3000/uploads/post_img/post_1733721996316.webp\"]', 'active', 0, '2024-12-09 05:26:36', '2024-12-09 05:26:36', 1),
(12, 27, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', '[19]', '[]', NULL, '[\"http://localhost:3000/uploads/post_img/post_1733722360997.webp\",\"http://localhost:3000/uploads/post_img/post_1733722361000.jpeg\"]', 'active', 0, '2024-12-09 05:32:41', '2024-12-09 08:50:42', 1),
(13, 27, 1, 'Uploading Post from Profile Section', '[23]', '[\"#travelprofile\"]', NULL, '[\"http://localhost:3000/uploads/post_img/post_1733746079858.webp\",\"http://localhost:3000/uploads/post_img/post_1733746079870.webp\"]', 'active', 0, '2024-12-09 12:07:59', '2024-12-09 12:07:59', 1),
(14, 27, 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '[19]', '[\"#traveltest\"]', 'Nashik', '[\"http://localhost:3000/uploads/post_img/post_1733747951307.jpeg\",\"http://localhost:3000/uploads/post_img/post_1733747951309.jpeg\"]', 'active', 0, '2024-12-09 12:39:11', '2024-12-13 09:50:00', 1),
(15, 27, 1, 'test story for location', '[13]', '[]', 'Rameshwaram', '[]', 'active', 0, '2024-12-13 09:45:21', '2024-12-13 09:45:21', 1),
(16, 27, 1, 'Travel is the act of moving from one place to another, often for leisure, work, or to visit family and friends. It can involve short stays between movements, such as tourism. ', '[13]', '[]', NULL, '[]', 'active', 0, '2024-12-13 11:26:09', '2024-12-13 11:26:09', 1),
(17, 27, 1, 'Travel is the movement of people between distant geographical locations. Travel can be done by foot, bicycle, automobile, train, boat, bus, airplane, ship or other means, with or without luggage, and can be one way or round trip.', '[]', '[]', NULL, '[\"http://localhost:3000/uploads/post_img/post_1734091243065.webp\",\"http://localhost:3000/uploads/post_img/post_1734091243074.webp\",\"http://localhost:3000/uploads/post_img/post_1734091243076.jpeg\"]', 'active', 0, '2024-12-13 12:00:43', '2024-12-13 12:00:43', 1),
(18, 50, 1, 'First post from tendulkar', '[]', '[]', NULL, '[\"http://localhost:3000/uploads/post_img/post_1734522101217.jpeg\"]', 'active', 0, '2024-12-18 11:41:41', '2024-12-18 11:41:41', 1),
(19, 52, 1, 'Lorem ipsum has been used in typesetting since the 1960s, and was popularized by Letraset transfer sheets. It was introduced to the digital world in the mid-1980s by Aldus, and is now included in many popular word processors, web content managers, and CSS libraries.', '[]', '[]', NULL, '[]', 'active', 0, '2024-12-19 13:16:31', '2024-12-19 13:16:31', 1),
(20, 27, 1, 'Lorem ipsum is a placeholder text used in graphic design, publishing, and web development to show the visual form of a document or typeface without meaningful content. It\'s also known as \"lipsum\".', '[13,50]', '[\"#indore\",\"#1\",\"#2\",\"#3\",\"#4\",\"#5\",\"#6\",\"#7\"]', 'Indore', '[\"http://localhost:3000/uploads/post_img/post_1734618515151.jpeg\"]', 'active', 0, '2024-12-19 14:28:35', '2024-12-19 14:28:35', 1),
(21, 27, 1, 'Lorem ipsum is a placeholder text used in graphic design, publishing, and web development to show the visual form of a document or typeface without meaningful content. It\'s also known as \"lipsum\".', '[]', '[\"#harda\"]', 'Indore', '[\"http://localhost:3000/uploads/post_img/post_1734773827775.mp4\"]', 'active', 0, '2024-12-21 09:37:07', '2024-12-21 11:04:01', 1),
(23, 27, 1, 'Hello we are uploading one video and one image. Get ready for a magic.', '[]', '[]', NULL, '[\"http://localhost:3000/uploads/post_img/post_1734779799228.webp\",\"http://localhost:3000/uploads/post_img/post_1734779799257.mp4\"]', 'active', 0, '2024-12-21 11:16:39', '2024-12-21 11:16:39', 1),
(25, 27, 1, 'Test Description for images upload', '[]', '[\"#1\\\\\",\"#2\",\"#3\",\"#4\",\"#5\",\"#6\",\"#7\",\"#8\",\"#9\",\"#10\",\"#11\"]', NULL, '[\"http://localhost:3000/uploads/post_img/post_1735048924003.jpeg\",\"http://localhost:3000/uploads/post_img/post_1735048924023.png\"]', 'active', 0, '2024-12-24 14:02:04', '2024-12-24 14:02:04', 1),
(26, 27, 1, 'Test Description for buddies ', '[57,52]', '[]', NULL, '[\"http://localhost:3000/uploads/post_img/post_1735049417119.jpeg\"]', 'active', 0, '2024-12-24 14:10:17', '2024-12-24 14:10:17', 1),
(27, 27, 1, 'This is description for video upload', '[]', '[]', NULL, '[\"http://localhost:3000/uploads/post_img/post_1735122468509.mp4\"]', 'active', 0, '2024-12-25 10:27:48', '2024-12-25 10:27:48', 1),
(28, 27, 1, 'cavkgfcqgfo ofyoryo;y 3r', '[52,51,57]', '[\"#1\",\"#2\",\"#3\",\"#4\",\"#5\",\"#6\",\"#7\",\"#8\",\"#9\",\"#10\"]', '.kgr ilu1r;ot ', '[\"http://localhost:3000/uploads/post_img/post_1735135584670.png\",\"http://localhost:3000/uploads/post_img/post_1735135584686.jpeg\"]', 'active', 0, '2024-12-25 14:06:24', '2024-12-25 14:06:24', 1),
(29, 27, 1, 'Post Description for Testing', '[52]', '[]', 'Indore', '[\"http://localhost:3000/uploads/post_img/post_1735192589668.jpeg\",\"http://localhost:3000/uploads/post_img/post_1735192589685.png\"]', 'active', 0, '2024-12-26 05:56:29', '2024-12-26 05:56:29', 1),
(30, 27, 1, '\"Discover the perfect blend of style and functionality with [Product/Service Name]. Elevate your everyday experience—available now! 🚀✨\"', '[52]', '[\"#rajasthan\",\"#travel\",\"#fun\"]', 'Indore', '[\"http://localhost:3000/uploads/post_img/post_1735280923406.jpeg\"]', 'active', 0, '2024-12-27 06:28:43', '2024-12-27 06:28:43', 1),
(31, 27, 1, 'Test Description for storing tags in different table', '[]', '[\"#travel\",\"#1\",\"#2\"]', NULL, '[\"http://localhost:3000/uploads/post_img/post_1735287388362.jpeg\"]', 'active', 0, '2024-12-27 08:16:28', '2024-12-27 08:16:28', 1),
(32, 27, 1, 'Description for tag store', '[]', '[\"#rajasthan\",\"#travel\",\"#indorejourney\"]', NULL, '[\"http://localhost:3000/uploads/post_img/post_1735288714009.jpeg\"]', 'active', 0, '2024-12-27 08:38:34', '2024-12-27 08:38:34', 1),
(33, 27, 1, 'Description for tag store', '[]', '[\"#rajasthan\",\"#travel\",\"#indorejourney\"]', NULL, '[\"http://localhost:3000/uploads/post_img/post_1735288718722.jpeg\"]', 'active', 0, '2024-12-27 08:38:38', '2024-12-27 08:38:38', 1),
(34, 27, 1, 'Description for tag store', '[]', '[\"#rajasthan\",\"#travel\",\"#indorejourney\"]', NULL, '[\"http://localhost:3000/uploads/post_img/post_1735288847355.jpeg\"]', 'active', 0, '2024-12-27 08:40:47', '2024-12-27 08:40:47', 1),
(50, 27, 1, '\"What\'s the one thing you can’t live without when it comes to [specific topic]? Drop your answer in the comments section, now it is final testing ! 💬👇\"', '[57,56]', '[\"#ak1\",\"#mysoretrip\",\"#addtag\",\"#beforefinaltest\",\"#finaltest\",\"#communitycheck\"]', 'Indore', '[\"http://localhost:3000/uploads/post_img/post_1735800567904.jpeg\",\"http://localhost:3000/uploads/post_img/post_1735804411473.jpeg\",\"http://localhost:3000/uploads/post_img/post_1735804411506.mp4\"]', 'active', 0, '2025-01-01 12:57:51', '2025-01-03 09:57:50', 1),
(51, 66, 1, 'Test Post for post loader from Raman', '[]', '[]', 'Mysore', '[\"http://localhost:3000/uploads/post_img/post_1735899956537.png\",\"http://localhost:3000/uploads/post_img/post_1735899956567.mp4\"]', 'active', 0, '2025-01-03 10:25:56', '2025-01-03 10:25:56', 1),
(52, 68, 1, 'Adept in SQL, Redux Toolkit, and secure authentication. Committed to delivering seamless user experiences while continuously exploring cutting-edge technologies. Open to collaboration', '[]', '[\"#firsttag\",\"#secondtag\"]', 'Indore', '[\"http://localhost:3000/uploads/post_img/post_1736141679868.mp4\",\"http://localhost:3000/uploads/post_img/post_1736141679913.png\"]', 'active', 0, '2025-01-06 05:34:39', '2025-01-06 06:28:00', 1),
(53, 27, 1, 'fadhfbfhjbchjbc', '[56]', '[\"#travel1\"]', 'Indore', '[\"http://localhost:3000/uploads/post_img/post_1736145679423.png\",\"http://localhost:3000/uploads/post_img/post_1736145679510.mp4\"]', 'active', 0, '2025-01-06 06:41:19', '2025-01-06 06:41:19', 1),
(56, 75, 1, 'Select skills, experiences, special knowledge, and accomplishments that you want to highlight in your proﬁle selection. ', '[]', '[]', 'Mumbai', '[\"http://localhost:3000/uploads/post_img/post_1736257355494.png\",\"http://localhost:3000/uploads/post_img/post_1736257355535.mp4\"]', 'active', 0, '2025-01-07 13:42:35', '2025-01-07 13:42:35', 1),
(57, 57, 1, 'New arrivals are here! 🌟 Discover the latest styles and make a statement wherever you go. 😎 Tap to shop now! #NewCollection #StyleGoals\"', '[]', '[\"#product\",\"#productlisting\",\"#travso\"]', 'Pune', '[\"http://localhost:3000/uploads/post_img/post_1736313660123.jpeg\"]', 'active', 0, '2025-01-08 05:21:00', '2025-01-08 05:21:00', 1),
(58, 51, 1, '\"Elevate your skincare routine with our all-natural products. 🌱 Give your skin the love it deserves! 💖 #GlowUp #SkincareRoutine\"', '[]', '[\"#trip\",\"#mobile\"]', 'Ahemdabad', '[\"http://localhost:3000/uploads/post_img/post_1736313916632.webp\"]', 'active', 0, '2025-01-08 05:25:16', '2025-01-08 05:25:16', 1),
(59, 50, 1, '\"Sun, sea, and serenity. 🌊 There\'s nothing like a beach getaway to recharge. 🏖️ #VacationVibes #TropicalEscape\"', '[]', '[\"#sun\",\"#moon\",\"#stars\"]', 'Betul', '[\"http://localhost:3000/uploads/post_img/post_1736314038796.webp\",\"http://localhost:3000/uploads/post_img/post_1736314038864.mp4\"]', 'active', 0, '2025-01-08 05:27:18', '2025-01-08 05:27:18', 1),
(60, 77, 1, 'I am an enthusiastic, self-motivated, reliable, responsible and hard working person. I am a mature team worker and adaptable to all challenging situations. I am able to work well both in a team environment as well as using own initiative. I am able to work well under pressure and adhere to strict de', '[]', '[\"#1\",\"#2\",\"#3\",\"#4\",\"#5\",\"#6\",\"#7\",\"#8\",\"#9\",\"#10\"]', 'Indore', '[\"http://localhost:3000/uploads/post_img/post_1736349019504.jpeg\",\"http://localhost:3000/uploads/post_img/post_1736349019507.jpeg\",\"http://localhost:3000/uploads/post_img/post_1736349019513.webp\"]', 'active', 0, '2025-01-08 15:10:19', '2025-01-08 15:14:27', 0);

-- --------------------------------------------------------

--
-- Table structure for table `recent_search`
--

CREATE TABLE `recent_search` (
  `id` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
  `searched_id` int(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recent_search`
--

INSERT INTO `recent_search` (`id`, `user_id`, `searched_id`, `created_at`, `updated_at`) VALUES
(1, 42, 27, '2024-11-30 10:14:58', '2024-11-30 10:14:58'),
(2, 27, 9, '2025-01-03 06:36:27', '2025-01-03 06:36:27');

-- --------------------------------------------------------

--
-- Table structure for table `reply_comment`
--

CREATE TABLE `reply_comment` (
  `id` int(11) NOT NULL,
  `reply_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `content` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reply_comment`
--

INSERT INTO `reply_comment` (`id`, `reply_id`, `user_id`, `content`) VALUES
(1, 19, 13, 'reply of reply- kuch nahi'),
(4, 19, 23, 'This is my reply'),
(5, 6, 3, 'This is my replyss'),
(7, 6, 3, 'This is my 3 reply'),
(8, 7, 3, 'Reply ka reply');

-- --------------------------------------------------------

--
-- Table structure for table `reply_like`
--

CREATE TABLE `reply_like` (
  `id` int(11) NOT NULL,
  `reply_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reply_like`
--

INSERT INTO `reply_like` (`id`, `reply_id`, `user_id`, `created_at`) VALUES
(1, 6, 3, '2024-12-06 09:47:29'),
(15, 38, 27, '2024-12-18 11:38:35');

-- --------------------------------------------------------

--
-- Table structure for table `shared_post`
--

CREATE TABLE `shared_post` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `shared_to_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`shared_to_id`)),
  `thoughts` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `shared_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shared_post`
--

INSERT INTO `shared_post` (`id`, `post_id`, `user_id`, `shared_to_id`, `thoughts`, `link`, `shared_at`) VALUES
(1, 1, 26, '', NULL, NULL, '2024-11-26 06:23:29'),
(2, 1, 13, '', NULL, NULL, '2024-11-26 06:24:46'),
(3, 4, 28, '', NULL, NULL, '2024-11-26 06:24:46'),
(4, 14, 27, '[1,2,3,6,7,8]', '', NULL, '2024-12-10 08:01:20'),
(5, 14, 27, '[19,23]', 'hello first thought with nikhil and krishna', NULL, '2024-12-10 08:13:06'),
(6, 14, 27, '[19,23]', 'Second thought', NULL, '2024-12-10 08:14:58'),
(7, 14, 27, '[23]', 'share with nikhil', NULL, '2024-12-10 08:26:21'),
(8, 14, 27, '[23]', 'hello from comment section', NULL, '2024-12-10 09:54:33'),
(9, 14, 27, '[19,23]', 'share from comment section 2', NULL, '2024-12-10 09:55:13'),
(10, 15, 27, '[13]', '', NULL, '2024-12-13 11:08:23'),
(11, 16, 27, '[13]', '', 'http://localhost:5173/Krishna005/16', '2024-12-13 11:40:47'),
(12, 15, 27, '[13]', '', 'http://localhost:5173/undefined/15', '2024-12-14 05:06:25'),
(13, 15, 27, '[13]', '', 'http://localhost:5173/undefined/15', '2024-12-14 05:06:40'),
(14, 17, 27, '[13]', '', 'http://localhost:5173/Krishna005/17', '2024-12-19 07:23:47'),
(15, 17, 27, '[13]', '', 'http://localhost:5173/Krishna005/17', '2024-12-19 13:29:59'),
(16, 17, 27, '[13,50]', '', 'http://localhost:5173/Krishna005/17', '2024-12-19 13:30:16'),
(17, 40, 27, '[52]', '', 'http://localhost:5173/undefined/40', '2024-12-28 06:28:01'),
(18, 40, 27, '[52]', 'share check', 'http://localhost:5173/undefined/40', '2024-12-28 07:38:09'),
(19, 40, 27, '[57]', 'check share 2', 'http://localhost:5173/Krishna005/40', '2024-12-28 07:39:33'),
(20, 40, 51, '[27]', 'check share 3', 'http://localhost:5173/Krishna005/40', '2024-12-28 07:40:44'),
(21, 40, 51, '[27]', 'check share 4', 'http://localhost:5173/Krishna005/40', '2024-12-28 07:41:04'),
(22, 18, 27, '[52]', 'check share 5', 'http://localhost:5173/nik-07/18', '2024-12-28 07:42:07'),
(23, 18, 27, '[52]', 'check share last', 'http://localhost:5173/nik-07/18', '2024-12-28 07:42:34'),
(24, 60, 27, '[68]', '', 'http://localhost:5173/post/aman/60', '2025-01-09 05:20:44');

-- --------------------------------------------------------

--
-- Table structure for table `stories`
--

CREATE TABLE `stories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `media_url` longtext DEFAULT NULL,
  `caption` text DEFAULT NULL,
  `tag` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`tag`)),
  `view` enum('Public','Buddies','Followers','') NOT NULL,
  `story_text` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_archive` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stories`
--

INSERT INTO `stories` (`id`, `user_id`, `media_url`, `caption`, `tag`, `view`, `story_text`, `type`, `expires_at`, `created_at`, `is_archive`) VALUES
(67, 45, 'http://localhost:3000/uploads/story_img/story_1735032423680.jpeg_45_arti07', NULL, '[]', 'Public', '[]', 'image', '2025-01-08 05:54:59', '2024-12-24 09:27:03', 1),
(68, 45, 'http://localhost:3000/uploads/story_img/story_1735032423664.jpeg_45_arti07', NULL, '[]', 'Public', '[]', 'image', '2025-01-10 05:55:08', '2024-12-24 09:27:03', 1),
(69, 13, 'http://localhost:3000/uploads/story_img/story_1734932246252.png_27_Krishna005', NULL, '[]', 'Public', '[]', 'image', '2025-01-06 05:55:17', '2024-12-23 05:37:26', 1),
(70, 54, 'http://localhost:3000/uploads/story_img/story_1735036507437.webp_54_arpit-07', NULL, '[]', 'Public', '[]', 'image', '2025-01-06 05:55:22', '2024-12-24 10:35:07', 1),
(71, 54, 'http://localhost:3000/uploads/story_img/story_1735036507449.webp_54_arpit-07', NULL, '[]', 'Public', '[]', 'image', '2025-01-10 05:55:27', '2024-12-24 10:35:07', 1),
(72, 55, 'http://localhost:3000/uploads/story_img/story_1735036871138.jpeg_55_akshay-07', NULL, '[]', 'Public', '[]', 'image', '2025-01-10 05:55:31', '2024-12-24 10:41:11', 1),
(73, 56, 'http://localhost:3000/uploads/story_img/story_1735037494953.jpeg_56_jaydeep-07', NULL, '[]', 'Public', '[]', 'image', '2025-01-10 05:55:36', '2024-12-24 10:51:34', 1),
(74, 56, 'http://localhost:3000/uploads/story_img/story_1735037494957.jpeg_56_jaydeep-07', NULL, '[]', 'Public', '[]', 'image', '2025-01-10 05:55:43', '2024-12-24 10:51:34', 1),
(75, 57, 'http://localhost:3000/uploads/story_img/story_1735038124743.jpeg_57_mahesh-07', NULL, '[]', 'Public', '[]', 'image', '2025-01-11 05:56:00', '2024-12-24 11:02:04', 1),
(76, 58, 'http://localhost:3000/uploads/story_img/story_1735038497081.png_58_kritika-07', NULL, '[]', 'Public', '[]', 'image', '2025-01-10 05:56:05', '2024-12-24 11:08:17', 1),
(77, 59, 'http://localhost:3000/uploads/story_img/story_1735038743999.jpeg_59_nitin-07', NULL, '[]', 'Public', '[]', 'image', '2025-01-10 05:56:09', '2024-12-24 11:12:23', 1),
(78, 60, 'http://localhost:3000/uploads/story_img/story_1735038896320.jpeg_60_jatin-07', NULL, '[]', 'Public', '[]', 'image', '2025-01-10 05:56:13', '2024-12-24 11:14:56', 1),
(79, 61, 'http://localhost:3000/uploads/story_img/story_1735039058608.jpeg_61_sachin-07', NULL, '[]', 'Public', '[]', 'image', '2025-01-07 05:56:21', '2024-12-24 11:17:38', 1),
(80, 62, 'http://localhost:3000/uploads/story_img/story_1735039236850.png_62_chandan-07', NULL, '[]', 'Public', '[]', 'image', '2025-01-06 05:56:37', '2024-12-24 11:20:36', 1),
(81, 62, 'http://localhost:3000/uploads/story_img/story_1735039236840.jpeg_62_chandan-07', NULL, '[]', 'Public', '[]', 'image', '2025-01-08 05:56:51', '2024-12-24 11:20:36', 1),
(82, 13, 'http://localhost:3000/uploads/story_img/story_1735039236840.jpeg_62_chandan-07', NULL, '[]', 'Public', '[]', 'image', '2025-01-10 05:56:55', '2024-12-24 11:20:36', 1),
(108, 27, 'http://localhost:3000/uploads/story_img/story_1735131993273.jpeg_27_Krishna005', NULL, '[]', 'Public', '[]', 'image', '2025-01-06 05:56:59', '2024-12-25 13:06:33', 1),
(129, 27, 'http://localhost:3000/uploads/story_img/story_1735302753269_27_Krishna005.png', NULL, '[]', 'Public', '[]', 'image', '2025-01-06 05:57:04', '2024-12-27 12:32:33', 1),
(130, 27, 'http://localhost:3000/uploads/story_img/story_1735306809707.png_27_Krishna005', NULL, '[]', 'Public', '[]', 'image', '2025-01-06 05:57:09', '2024-12-27 13:40:09', 1),
(131, 27, 'http://localhost:3000/uploads/story_img/story_1735363466795.png_27_Krishna005', NULL, '[]', 'Public', '[]', 'image', '2025-01-06 05:57:14', '2024-12-28 05:24:26', 1),
(132, 27, 'http://localhost:3000/uploads/story_img/story_1735363466790.jpeg_27_Krishna005', NULL, '[]', 'Public', '[]', 'image', '2025-01-06 05:57:19', '2024-12-28 05:24:26', 1),
(133, 27, 'http://localhost:3000/uploads/story_img/story_1735363466792.jpeg_27_Krishna005', NULL, '[]', 'Public', '[]', 'image', '2025-01-06 05:57:23', '2024-12-28 05:24:26', 1),
(134, 27, 'http://localhost:3000/uploads/story_img/story_1735363466762.jpeg_27_Krishna005', NULL, '[]', 'Public', '[]', 'image', '2025-01-06 05:57:27', '2024-12-28 05:24:26', 1),
(135, 27, 'http://localhost:3000/uploads/story_img/story_1735649367077.png_27_Krishna005', NULL, '[]', 'Public', '[]', 'image', '2025-01-06 05:56:46', '2024-12-31 12:49:27', 1),
(136, 27, 'http://localhost:3000/uploads/story_img/story_1735649367063.jpeg_27_Krishna005', NULL, '[]', 'Public', '[]', 'image', '2025-01-06 05:56:43', '2024-12-31 12:49:27', 1),
(137, 27, 'http://localhost:3000/uploads/story_img/story_1735898414166_27_Krishna005.png', NULL, '[]', 'Public', '[]', 'image', '2025-01-03 22:00:14', '2025-01-03 10:00:14', 1),
(138, 27, 'http://localhost:3000/uploads/story_img/story_1735898414164_27_Krishna005.jpeg', NULL, '[]', 'Public', '[]', 'image', '2025-01-03 22:00:14', '2025-01-03 10:00:14', 1),
(139, 68, 'http://localhost:3000/uploads/story_img/story_1736141014691_68_gyanesh-07.mp4', NULL, '[]', 'Public', '[]', 'video', '2025-01-06 17:23:34', '2025-01-06 05:23:34', 1),
(140, 68, 'http://localhost:3000/uploads/story_img/story_1736141014686_68_gyanesh-07.jpeg', NULL, '[]', 'Public', '[]', 'image', '2025-01-06 17:23:34', '2025-01-06 05:23:34', 1),
(141, 68, 'http://localhost:3000/uploads/story_img/story_1736141343837_68_gyanesh-07.jpeg', NULL, '[]', 'Public', '[]', 'image', '2025-01-06 17:29:03', '2025-01-06 05:29:03', 1),
(142, 27, 'http://localhost:3000/uploads/story_img/story_1736143214971_27_Krishna005.jpeg', NULL, '[]', 'Public', '[]', 'image', '2025-01-06 18:00:14', '2025-01-06 06:00:14', 1),
(143, 27, 'http://localhost:3000/uploads/story_img/story_1736143214980_27_Krishna005.mp4', NULL, '[]', 'Public', '[]', 'video', '2025-01-06 18:00:14', '2025-01-06 06:00:14', 1),
(144, 27, 'http://localhost:3000/uploads/story_img/story_1736143245063_27_Krishna005.png', NULL, '[]', 'Public', '[]', 'image', '2025-01-06 18:00:45', '2025-01-06 06:00:45', 1),
(145, 68, 'http://localhost:3000/uploads/story_img/story_1736143372429_68_gyanesh-07.jpeg', NULL, '[]', 'Public', '[]', 'image', '2025-01-06 18:02:52', '2025-01-06 06:02:52', 1),
(146, 27, 'http://localhost:3000/uploads/story_img/story_1736143422389_27_Krishna005.png', NULL, '[]', 'Public', '[]', 'image', '2025-01-06 18:03:42', '2025-01-06 06:03:42', 1),
(147, 57, 'http://localhost:3000/uploads/story_img/story_1736240126771_57_mahesh-07.png', NULL, '[]', 'Public', '[]', 'image', '2025-01-07 20:55:26', '2025-01-07 08:55:26', 1),
(148, 27, 'http://localhost:3000/uploads/story_img/story_1736259347960_27_Krishna005.png', NULL, '[]', 'Public', '[]', 'image', '2025-01-08 02:15:47', '2025-01-07 14:15:47', 1),
(149, 27, 'http://localhost:3000/uploads/story_img/story_1736345900282_27_Krishna005.jpeg', NULL, '[]', 'Public', '[]', 'image', '2025-01-09 02:18:20', '2025-01-08 14:18:20', 1),
(150, 77, 'http://localhost:3000/uploads/story_img/story_1736347709826_77_aman.jpeg', NULL, '[]', 'Public', '[]', 'image', '2025-01-09 02:48:29', '2025-01-08 14:48:29', 1),
(151, 77, 'http://localhost:3000/uploads/story_img/story_1736347709814_77_aman.webp', NULL, '[]', 'Public', '[]', 'image', '2025-01-09 02:48:29', '2025-01-08 14:48:29', 1),
(152, 77, 'http://localhost:3000/uploads/story_img/story_1736347709822_77_aman.jpeg', NULL, '[]', 'Public', '[]', 'image', '2025-01-09 02:48:29', '2025-01-08 14:48:29', 1),
(153, 77, 'http://localhost:3000/uploads/story_img/story_1736395584823_77_aman.jpeg', NULL, '[]', 'Public', '[]', 'image', '2025-01-09 16:06:24', '2025-01-09 04:06:24', 1);

-- --------------------------------------------------------

--
-- Table structure for table `story_likes`
--

CREATE TABLE `story_likes` (
  `id` int(11) NOT NULL,
  `story_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `story_likes`
--

INSERT INTO `story_likes` (`id`, `story_id`, `user_id`, `created_at`) VALUES
(1, 4, 1, '2024-12-16 10:33:22'),
(5, 1, 27, '2024-12-16 11:36:26'),
(6, 2, 27, '2024-12-16 11:37:55'),
(46, 82, 27, '2024-12-26 18:55:01');

-- --------------------------------------------------------

--
-- Table structure for table `story_replies`
--

CREATE TABLE `story_replies` (
  `id` int(11) NOT NULL,
  `story_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reply_text` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `story_replies`
--

INSERT INTO `story_replies` (`id`, `story_id`, `user_id`, `reply_text`, `created_at`) VALUES
(1, 3, 3, 'This is a reply to the story.', '2024-12-16 11:27:00'),
(2, 2, 27, 'hello 1st reply to story', '2024-12-16 11:40:03'),
(3, 35, 27, '🤪hello', '2024-12-21 11:11:12'),
(4, 39, 27, '😀rishabh', '2024-12-21 11:11:50'),
(5, 39, 27, '😀', '2024-12-21 11:17:58'),
(6, 35, 27, '😄', '2024-12-21 11:18:33'),
(7, 39, 27, 'hello', '2024-12-24 14:15:39'),
(8, 35, 27, 'hello1', '2024-12-24 14:41:11'),
(9, 35, 27, 'comment on arti mam story', '2024-12-24 14:51:30'),
(10, 67, 27, 'ello 67', '2024-12-24 14:58:10'),
(11, 68, 27, 'hell', '2024-12-24 14:59:45'),
(12, 67, 27, 'hello 67', '2024-12-24 15:19:07'),
(13, 68, 27, 'o', '2024-12-24 15:30:34'),
(14, 82, 27, 'hello rishabh', '2024-12-27 16:07:03');

-- --------------------------------------------------------

--
-- Table structure for table `story_shares`
--

CREATE TABLE `story_shares` (
  `id` int(11) NOT NULL,
  `story_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `thoughts` varchar(255) DEFAULT NULL,
  `shared_to_id` longtext NOT NULL,
  `link` varchar(255) NOT NULL,
  `shared_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `story_views`
--

CREATE TABLE `story_views` (
  `id` int(11) NOT NULL,
  `story_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `viewed_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `story_views`
--

INSERT INTO `story_views` (`id`, `story_id`, `user_id`, `viewed_at`) VALUES
(5, 2, 27, '2024-12-18 12:08:24'),
(6, 6, 27, '2024-12-18 15:56:39'),
(7, 9, 27, '2024-12-18 15:56:55'),
(8, 11, 27, '2024-12-18 15:57:54'),
(9, 9, 50, '2024-12-18 16:50:57'),
(10, 13, 50, '2024-12-18 16:51:05'),
(11, 14, 27, '2024-12-18 16:52:33'),
(12, 6, 50, '2024-12-18 16:53:11'),
(13, 27, 27, '2024-12-19 13:13:22'),
(14, 26, 27, '2024-12-19 13:40:35'),
(15, 29, 27, '2024-12-19 14:03:36'),
(16, 30, 27, '2024-12-19 20:06:13'),
(17, 35, 27, '2024-12-20 09:25:01'),
(18, 34, 27, '2024-12-20 09:32:03'),
(19, 36, 27, '2024-12-20 09:36:41'),
(20, 39, 27, '2024-12-20 10:26:45'),
(21, 41, 27, '2024-12-20 17:24:14'),
(22, 35, 52, '2024-12-20 17:27:31'),
(23, 39, 52, '2024-12-20 19:01:09'),
(24, 39, 51, '2024-12-21 11:28:16'),
(25, 35, 51, '2024-12-21 11:30:56'),
(26, 56, 51, '2024-12-21 17:53:26'),
(27, 57, 51, '2024-12-21 17:53:26'),
(28, 91, 51, '2024-12-21 17:53:26'),
(29, 94, 51, '2024-12-21 17:53:26'),
(30, 107, 51, '2024-12-21 17:53:26');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `post_id`, `name`) VALUES
(1, 1, '#posttag'),
(2, 1, '#testtag'),
(3, 0, '#new_post'),
(4, 0, '#nature_love'),
(5, 31, '#travel'),
(6, 31, '#1'),
(7, 31, '#2'),
(8, 32, '#rajasthan'),
(12, 35, '#rajasthan'),
(13, 35, '#travel'),
(14, 35, '#indorejourney'),
(15, 36, '#manalivisit'),
(16, 36, '#officechill'),
(17, 37, '#season'),
(18, 37, '#weather'),
(19, 37, '#winter'),
(20, 38, '#answer'),
(21, 38, '#question'),
(22, 38, '#topics'),
(23, 39, '#newfeature'),
(24, 39, '#mobile'),
(25, 40, '#hellotag'),
(26, 40, '#hello2'),
(27, 40, '#3'),
(28, 40, '#4'),
(29, 40, '#5'),
(30, 40, '#6'),
(31, 40, '#7'),
(32, 40, '#8'),
(33, 40, '#9'),
(34, 40, '#10'),
(35, 48, '#mysoretirp'),
(36, 48, '#newyear'),
(37, 48, '#nature'),
(38, 49, '#ak1'),
(39, 49, '#ak2'),
(40, 50, '#ak1'),
(41, 50, '#mysoretrip'),
(42, 52, '#firsttag'),
(43, 52, '#secondtag'),
(44, 53, '#travel1'),
(45, 57, '#product'),
(46, 57, '#productlisting'),
(47, 57, '#travso'),
(48, 58, '#trip'),
(49, 58, '#mobile'),
(50, 59, '#sun'),
(51, 59, '#moon'),
(52, 59, '#stars'),
(53, 60, '#1'),
(54, 60, '#2'),
(55, 60, '#3'),
(56, 60, '#4'),
(57, 60, '#5'),
(58, 60, '#6'),
(59, 60, '#7'),
(60, 60, '#8'),
(61, 60, '#9'),
(62, 60, '#10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_number` varchar(15) NOT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `isOtpVerified` tinyint(1) NOT NULL DEFAULT 0,
  `is_influencer` tinyint(1) NOT NULL DEFAULT 0,
  `user_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `user_type` varchar(255) DEFAULT NULL,
  `smlink1` longtext DEFAULT NULL,
  `smlink2` longtext DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_logged_in` tinyint(1) NOT NULL DEFAULT 0,
  `is_follow_selected` tinyint(1) NOT NULL DEFAULT 0,
  `is_online` tinyint(1) NOT NULL DEFAULT 1,
  `badge` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `first_name`, `last_name`, `gender`, `dob`, `state`, `city`, `email`, `mobile_number`, `otp`, `isOtpVerified`, `is_influencer`, `user_name`, `description`, `password`, `is_active`, `user_type`, `smlink1`, `smlink2`, `profile_image`, `cover_image`, `created_at`, `is_logged_in`, `is_follow_selected`, `is_online`, `badge`) VALUES
(9, 'krishna', NULL, NULL, 'male', '1990-11-15', 'Madhya Pradesh', 'Indore', 'kk14@kk.com', '1234567892', '7619', 1, 0, 'kanha-07', 'Test Account Description', NULL, 1, NULL, NULL, NULL, NULL, NULL, '2024-11-26 11:37:50', 0, 0, 1, 'Adventurer - Adventurers explore uncharted places, gather information, and share their experiences. They can also raise funds to support their travels'),
(11, 'Krishna', NULL, NULL, 'male', '2024-11-01', 'Madhya Pradesh', 'Indore', 'krishnakant0795@gmail.com', '9977195275', '8884', 0, 0, 'Krishna002', 'Test Account Description', '$2b$10$OW4ZCAzq3XiY2n/Yb1TSBu1zY1EOyO.yiUIHkMzpu.xC3b0LLhqiC', 1, 'traveler', 'https://www.instagram.com/krishnakant7947/profilecard/?igsh=MXhieDRyZjhmdHhpZQ==', NULL, NULL, NULL, '2024-11-26 11:37:50', 0, 0, 1, 'Adventurer - Adventurers explore uncharted places, gather information, and share their experiences. They can also raise funds to support their travels'),
(13, 'Rishabh', NULL, NULL, 'male', '2024-11-01', 'Madhya Pradesh', 'Indore', 'rishabh@rishabh.com', '8720096458', '3198', 0, 0, 'rishabh-07', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ', NULL, 1, NULL, NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1732948983049.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1733745929342.webp', '2024-11-26 11:37:50', 0, 0, 1, 'Adventurer - Adventurers explore uncharted places, gather information, and share their experiences. They can also raise funds to support their travels'),
(19, 'krishna', NULL, NULL, 'male', '1995-03-07', 'Madhya Pradesh', 'Indore', 'kk19@kk.com', '9977194285', '1466', 0, 0, 'Krish003', NULL, NULL, 1, 'traveler', NULL, NULL, NULL, NULL, '2024-11-26 11:37:50', 0, 0, 1, 'Adventurer - Adventurers explore uncharted places, gather information, and share their experiences. They can also raise funds to support their travels'),
(23, 'Nikhil', NULL, NULL, 'male', '2007-02-25', 'Madhya Pradesh', 'Indore', 'kktest@kk.com', '1212121212', '3725', 0, 0, 'niky', NULL, NULL, 1, 'traveler', NULL, NULL, NULL, NULL, '2024-11-26 11:37:50', 0, 0, 1, 'Adventurer - Adventurers explore uncharted places, gather information, and share their experiences. They can also raise funds to support their travels'),
(26, 'Nikhil Sir', NULL, NULL, 'male', '2006-02-26', 'Madhya Pradesh', 'Indore', 'nikhil02.1998@gmail.com', '7415872603', '0640', 0, 0, 'nikhil-02', NULL, NULL, 1, 'traveler', NULL, NULL, NULL, NULL, '2024-11-26 11:37:50', 0, 0, 1, 'Adventurer - Adventurers explore uncharted places, gather information, and share their experiences. They can also raise funds to support their travels'),
(27, 'Krishna Kant Malviya', 'Krishna Kant', 'Malviya', 'female', '2006-01-30', 'Madhya Pradesh', 'Hatta', 'learncoding299@gmail.com', '9755895314', '0325', 0, 0, 'Krishna005', 'In today’s rapidly evolving technological landscape, businesses must adapt quickly to stay competitive. One of the most significant drivers of change is the increasing reliance on digital tools and platforms, which have transformed the way businesses operate, engage with customers nature.', '$2b$10$OW4ZCAzq3XiY2n/Yb1TSBu1zY1EOyO.yiUIHkMzpu.xC3b0LLhqiC', 1, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1734770694664.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1734770990758.webp', '2024-11-26 11:37:50', 0, 1, 1, 'Solo Traveler - Enjoys the freedom of exploring alone, meeting new people, and creating personal stories.'),
(30, 'Test', NULL, NULL, 'male', '2007-02-27', 'Madhya Pradesh', 'Indore', 'test@test.com', '1212121211', '5133', 0, 0, NULL, NULL, NULL, 1, 'traveler', NULL, NULL, NULL, NULL, '2024-11-27 01:54:23', 0, 0, 1, NULL),
(31, 'bdh', NULL, NULL, 'female', '2004-02-28', 'Andhra Pradesh', 'Ādoni', 'emai@email.com', '9340169945', '1929', 0, 0, NULL, NULL, NULL, 1, 'traveler', NULL, NULL, NULL, NULL, '2024-11-27 12:19:35', 0, 0, 1, NULL),
(32, 'Prashant', NULL, NULL, 'male', '2003-01-28', 'Madhya Pradesh', 'Indore', 'prashant@prashant.com', '9340169920', '7723', 0, 0, NULL, NULL, NULL, NULL, 'traveler', NULL, NULL, NULL, NULL, '2024-11-28 13:52:29', 0, 0, 1, NULL),
(33, 'hhh', NULL, NULL, 'male', '2005-01-29', 'Madhya Pradesh', 'Indore', 'ss@ss.com', '1212121213', '9578', 0, 0, NULL, NULL, NULL, NULL, 'traveler', NULL, NULL, NULL, NULL, '2024-11-29 10:23:17', 0, 0, 1, NULL),
(34, 'sd', NULL, NULL, 'male', '1998-02-28', 'Andhra Pradesh', 'Ādoni', 'dsd@sd.com', '1234567890', '7315', 0, 0, NULL, NULL, NULL, NULL, 'traveler', NULL, NULL, NULL, NULL, '2024-11-29 12:22:56', 0, 0, 1, NULL),
(35, 'sd', NULL, NULL, 'male', '2008-01-29', 'Andhra Pradesh', 'Ādoni', 'kk@ll.com', '1234567898', '7639', 0, 0, NULL, NULL, NULL, NULL, 'traveler', NULL, NULL, NULL, NULL, '2024-11-29 13:05:44', 0, 0, 1, NULL),
(36, 'sd', NULL, NULL, 'male', '2007-03-29', 'Andhra Pradesh', 'Addanki', 'kk@kk.com', '1212454572', '4903', 0, 0, 'test001', 'Test description', '$2b$10$RO2fWhAGEnZX49Cq6pR1.uJjrLsZm.wYD0Ftvfe/RfYPgeTt8BHGe', NULL, 'traveler', NULL, NULL, NULL, NULL, '2024-11-29 13:09:12', 0, 0, 1, NULL),
(41, 'Test Account1', 'Test', 'Account1', 'male', '2008-02-29', 'Madhya Pradesh', 'Harda', 'test1@test.com', '1233211231', '4918', 0, 0, 'test1', 'Test Description  Test 1', '$2b$10$3G1LH/D8IwgmJKsI4SWWWuFaksMjm3Bpl4ZMVY7LkgPXwkz2vA5KK', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1732948983049.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1732951028576.jpeg', '2024-11-30 06:28:10', 0, 0, 1, NULL),
(42, 'Test Account2', 'Test', 'Account2', 'male', '2008-02-29', 'Madhya Pradesh', 'Indore', 'test2@test.com', '1234563215', '6859', 0, 0, 'test2', 'Test Description new', '$2b$10$CJXPEs91RUyfX9f3D5LCk.idHaJM1tVKw8OEf4vqXEemxSkz.5GQe', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1732969808487.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1732969898721.webp', '2024-11-30 09:29:51', 0, 0, 1, NULL),
(43, 'test003 ', 'test003', '', 'male', '2006-02-01', 'Madhya Pradesh', 'Indore', 'test3@test.com', '1254125412', '8966', 0, 0, 'test003', 'test description 003', '$2b$10$noJ70se3/3w2yGB1MzItMeCF3O6G2PVi9wMt.2I2tPPHxpIyE4mHe', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1733057594306.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1733057585165.webp', '2024-12-01 12:52:02', 0, 0, 1, NULL),
(44, 'test4 ', 'test4', '', 'male', '2008-02-02', 'Madhya Pradesh', 'Indore', 'test4@test.com', '1237894561', '1720', 0, 0, 'test004', 'Test Description 004', '$2b$10$RHUAXhLqKFfFvIXMz7CC8.sVPWcUwAd0GdJcwTFWQYsR7VKyWl2wm', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1733116560982.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1733116543861.webp', '2024-12-02 05:13:56', 0, 0, 1, NULL),
(45, 'Arti Kushwaha', 'Arti', 'Kushwaha', 'female', '1998-11-03', 'Madhya Pradesh', 'Bhopal', 'aktest@gmail.com', '7000085170', '4926', 0, 0, 'arti07', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '$2b$10$GqrpGoigu6uRrbYMLe1aRupkFR4Y1LGxRoQowBFj200g7b6BylN.a', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1733222590612.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1733222582167.jpeg', '2024-12-03 10:41:50', 0, 0, 1, NULL),
(46, 'Prashant ', 'Prashant', '', 'male', '2006-02-03', 'Maharashtra', 'Pune', 'gg@gg.com', '9977720000', '2331', 0, 0, 'pr-003', 'An application designed and developed to serve the purpose of traveling, like planning, booking, and managing is a travel app. An application has various other features, such as saving all the travel-related information and managing travel apps.', '$2b$10$eWLLqhNxhhbkg7WLclilwe8A6vf2GF1aWy8oz92YPIbjEEE/1GAq2', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1733291489028.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1733291479478.webp', '2024-12-04 05:43:28', 0, 0, 1, NULL),
(47, 'Madhulika ', 'Madhulika', '', 'female', '2008-02-06', 'Maharashtra', 'Pune', 'dhd@gmail.com', '9870516300', '8178', 0, 0, 'Madhu-07', 'An application designed and developed to serve the purpose of traveling, like planning, booking, and managing is a travel app. An application has various other features, such as saving all the travel-related information and managing travel apps.', '$2b$10$XG8n4eQsD9VcPafOJkzeVuBHbrqS3u96GLbQJjxx8qIXywDYie5.y', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1733294749187.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1733294709972.webp', '2024-12-04 06:39:16', 0, 0, 1, NULL),
(48, 'Narendra ', 'Narendra', '', 'male', '2006-02-09', 'Madhya Pradesh', 'Indore', 'narendra@narendra.com', '1478523691', '0610', 0, 0, 'narendra-001', 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', '$2b$10$fxBKONzVqEQoKtbScGpxZeZ9dAvFiva3/puvAoMR6B9F0alHHMRyO', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1733747571578.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1733747584889.webp', '2024-12-09 12:30:04', 0, 0, 1, NULL),
(49, 'Anima ', 'Anima', '', 'male', '2007-02-10', 'Madhya Pradesh', 'Indore', 'anima@anima.com', '7897897896', '6492', 0, 0, 'Anima02', 'A profile description is a brief summary of your skills, experiences, and interests that you can use on social media or professional networking sites.', '$2b$10$1D7OGKV1BiJdSSsKWB2AL.DERR8IpvxCkRuHoW5zCN/QLFk3d5APG', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1733810295840.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1733810288168.webp', '2024-12-10 05:56:43', 0, 1, 1, NULL),
(50, 'Nikhil Tendulkar', 'Nikhil', 'Tendulkar', 'male', '2004-02-18', 'Maharashtra', 'Mumbai', 'nikhil@nikhil.com', '1122334455', '8947', 0, 0, 'nik-07', 'This is test account for Nikhil Tendulkar. Who is not a cricketer but can play cricket.', '$2b$10$A2.U1k0.RLNKdxug53tBb.PAwLmxa/gnL/ZKqW1g0tWjbXRnJQ3aO', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1734520730312.jpeg', NULL, '2024-12-18 11:17:43', 0, 1, 1, 'Explorer - a person who travels around a place in order to learn about it'),
(51, 'Akash ', 'Akash', '', 'male', '2007-02-19', 'Madhya Pradesh', 'Indore', 'akash@akash.com', '1254125411', '9697', 0, 0, 'akash-07', 'An introduction is a beginning that can be used in a variety of contexts, such as presenting someone to a group, introducing a new idea in a project, or writing a piece of writing.', '$2b$10$L24BSuMYFwjGiw4wSrLcbeKamsLWR5yrNRzzGgcsgTCxA98wqhgIi', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1734613314616.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1735202464356.jpeg', '2024-12-19 13:00:34', 0, 1, 0, 'Explorer - a person who travels around a place in order to learn about it'),
(52, 'Daksh ', 'Daksh', '', 'male', '2008-01-19', 'Madhya Pradesh', 'Indore', 'daksh@daksh.com', '1234566540', '4031', 0, 0, 'daksh-02', 'Lorem ipsum is a placeholder text used in graphic design, publishing, and web development to show the visual form of a document or typeface without meaningful content.', '$2b$10$tTiYSJP2TLnRnR7NQJsZTOG1lupNk5fRyREUeekbAPZo9xKb2o02m', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1734613670578.jpeg', NULL, '2024-12-19 13:06:07', 0, 1, 1, 'Explorer - a person who travels around a place in order to learn about it'),
(53, 'Yogesh', 'Yogesh', '', 'male', '2007-02-20', 'Madhya Pradesh', 'Indore', 'yogesh@test.com', '7845125487', '0660', 0, 0, NULL, NULL, NULL, NULL, 'traveler', NULL, NULL, NULL, NULL, '2024-12-20 05:13:36', 0, 0, 1, NULL),
(54, 'Arpit ', 'Arpit', '', 'male', '2007-02-24', 'Andhra Pradesh', 'Ādoni', 'arpit@arpit.com', '1237898523', '7155', 0, 0, 'arpit-07', 'This is Arpit a Solo Traveler, Who loves to roam.', '$2b$10$GquwFoCCa4tlUYA5A83zS.ntdEW5giqnq0qgR7EKAY//If/Eaj/AC', NULL, 'traveler', NULL, NULL, NULL, NULL, '2024-12-24 10:29:37', 0, 1, 1, 'Solo Traveler - A solo traveler is someone who travels independently, without friends or companions.'),
(55, 'Akshay ', 'Akshay', '', 'male', '2007-02-24', 'Madhya Pradesh', 'Indore', 'ak@ak.com', '7411477411', '6372', 0, 0, 'akshay-07', 'An introduction is a beginning that can be used in a variety of contexts, such as presenting someone to a group, introducing a new idea in a project, or writing a piece of writing.', '$2b$10$UU/.Lih2c6HyNLIcIqpc5O0rNR7iTAfMfBc.J4b2b5J49Zk9qHz4S', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1735036795758.jpeg', NULL, '2024-12-24 10:38:57', 0, 1, 1, 'Solo Traveler - A solo traveler is someone who travels independently, without friends or companions.'),
(56, 'Jaydeep ', 'Jaydeep', '', 'male', '2008-01-24', 'Madhya Pradesh', 'Indore', 'jd@jd.com', '2588522588', '0890', 0, 0, 'jaydeep-07', 'This is Jaydeep, Who lives in Indore and loves to make friends.', '$2b$10$KBrEaspH3MT.J.PdkUilw.rwM3EleXxUmCQf9PQt2TG3p72QeaPIe', NULL, 'traveler', NULL, NULL, NULL, NULL, '2024-12-24 10:49:48', 0, 1, 0, 'Solo Traveler - A solo traveler is someone who travels independently, without friends or companions.'),
(57, 'Mahesh  Parmar', 'Mahesh', '', 'male', '2007-01-24', 'Madhya Pradesh', 'Indore', 'mh@mh.com', '9633699633', '1054', 0, 0, 'mahesh-07', 'Hi, Mahesh Here, An outstanding guy who is always in a fun mood.', '$2b$10$7PcmFyBmRTYqv41B70HU5u/ZStsGgO0vDtqhBjQtIzKYA8R3fz8Uq', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1735038037233.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1735882179929.jpeg', '2024-12-24 10:59:45', 0, 1, 0, 'Solo Traveler - A solo traveler is someone who travels independently, without friends or companions.'),
(58, 'Kritika ', 'Kritika', '', 'female', '2005-06-24', 'Andhra Pradesh', 'Akivīdu', 'kt@kt.com', '3693693699', '5713', 0, 0, 'kritika-07', 'Creative Soul: Passionate about art, design, and all things creative. Living life one brushstroke at a time.', '$2b$10$ngKj0oDUL/kmSgDEVt0NBuEeaH1kHIJ3R5poGp.u3.wijJCw/OZcC', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1735038302351.jpeg', NULL, '2024-12-24 11:04:19', 0, 1, 0, 'Solo Traveler - A solo traveler is someone who travels independently, without friends or companions.'),
(59, 'Nitin Parmar', 'Nitin', 'Parmar', 'male', '2000-04-24', 'Assam', 'Amguri', 'nt@nt.com', '3218529875', '7039', 0, 0, 'nitin-07', 'Book Lover: Avid reader, bookworm, and lifelong learner. Always have a good book in hand.', '$2b$10$Lw3XkXbop05.Pl98jTnpz.WSbaaU.Ojq4MoLnUf9pG63/BmxjwlyK', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1735038615252.jpeg', NULL, '2024-12-24 11:09:16', 0, 1, 0, 'Solo Traveler - A solo traveler is someone who travels independently, without friends or companions.'),
(60, 'Jatin Parmar', 'Jatin', 'Parmar', 'male', '1998-03-24', 'Bihar', 'Aurangābād', 'jp@jp.com', '7898529637', '5195', 0, 0, 'jatin-07', 'Tech Enthusiast: Always fascinated by the latest gadgets, software, and trends in technology. Geek at heart.', '$2b$10$DR/SyQq5W49M0kP49METv.OYkKf7V1FPsgDzexW.WxlbmVFrRaQoO', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1735038853681.jpeg', NULL, '2024-12-24 11:13:28', 0, 1, 0, 'Solo Traveler - A solo traveler is someone who travels independently, without friends or companions.'),
(61, 'Sachin ', 'Sachin', '', 'male', '2007-03-24', 'Madhya Pradesh', 'Indore', 'sh@sh.com', '9637418526', '7185', 0, 0, 'sachin-07', 'Entrepreneurial Spirit: Constantly working on new ideas, ventures, and innovations. Turning passion into progress.', '$2b$10$ZdtK1/QB4jSo2RR5nBZxd.YhaDFTVrGHkYDVkS74O8HIR3FFRENLy', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1735039014428.jpeg', NULL, '2024-12-24 11:16:06', 0, 1, 0, 'Solo Traveler - A solo traveler is someone who travels independently, without friends or companions.'),
(62, 'Chandan Tendulkar', 'Chandan', 'Tendulkar', 'male', '2004-02-24', 'Maharashtra', 'Mumbai', 'cd@cd.com', '5555555550', '9129', 0, 0, 'chandan-07', 'Family First: Family is everything to me. Cherishing every moment with loved ones and making memories together.', '$2b$10$bp2J7DrBU9b3Z4wErm2HoeYZT8C/rNYJMe/IDZjuGb2vp.wgsn9kO', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1735039183353.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1735039197608.jpeg', '2024-12-24 11:18:48', 0, 1, 1, 'Solo Traveler - A solo traveler is someone who travels independently, without friends or companions.'),
(66, 'Raman Kumar', 'Raman', 'Kumar', 'male', '2002-02-02', 'Andhra Pradesh', 'Akasahebpet', 'rm@rm.com', '1112223334', '2922', 0, 0, 'raman-07', 'A profile is a brief description of a person or organization, often included in a resume, article, or document. A profile can provide detailed information about a person or company, such as their background, skills, and achievements.', '$2b$10$xznWjBML5Psj7cABpZiJj.UVpOVi1ZiLxq3vrQXMrNhCBcbNwO7ai', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1735899789309.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1735899778305.jpeg', '2025-01-03 10:21:44', 0, 1, 1, 'Solo Traveler - A solo traveler is someone who travels independently, without friends or companions.'),
(67, 'Rajat Kumar', 'Rajat', 'Kumar', 'male', '2004-02-01', 'Bihar', 'Arrah', 'rjt@rjt.com', '1111122222', '8023', 0, 0, 'rmt-07', 'Present precise details without overwhelming potential candidates with complex industry jargon or technical language.Present precise details without overwhelming potential candidates with complex industry jargon or technical language.', '$2b$10$efTQlXUlO8Pyk9uMDOyWCOYnqdysX9qlRfbe8vlxfcKWqEDNHXnxG', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1735900610711.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1735900624584.webp', '2025-01-03 10:35:34', 0, 1, 0, 'Explorer - a person who travels around a place in order to learn about it'),
(68, 'Gyanesh Kumar', 'Gyanesh', 'Kumar', 'male', '2007-02-04', 'Madhya Pradesh', 'Indore', 'gk@gk.com', '7474747474', '6664', 0, 0, 'gyanesh-07', '\"Tech enthusiast and skilled developer specializing in MERN stack and Next.js. Passionate about building innovative web solutions, from dynamic auctions to real-time data apps Next Test.', '$2b$10$hCNvTtKMKLyHP89YYFL.Ou7lxXODNlz8FSNF5.NdtPk4WLciq2sJ6', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1736140810043.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1736140835702.webp', '2025-01-06 05:16:59', 0, 1, 0, 'Solo Traveler - A solo traveler is someone who travels independently, without friends or companions.'),
(77, 'Aman Kumrawat', 'Aman', 'Kumrawat', 'male', '2006-02-02', 'Assam', 'Amguri', 'aman@ak.com', '8720096457', '2094', 0, 0, 'aman', 'A profile is a brief description of a person or organization that highlights their key skills, experiences, and interests. It can be used on social media, in a resume, or in an', '$2b$10$bEfvEfGG38BiAo1atud1vOTCLCoBQlHf5qxoYapG1ltc1OLj6KeSS', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1736347566374.webp', 'http://localhost:3000/uploads/cover_img/profile_1736347574893.jpeg', '2025-01-08 14:38:18', 0, 1, 0, 'Foodie - Travels to explore local cuisines, savoring unique flavors and culinary traditions.'),
(78, 'Prashant Kumar', 'Prashant', 'Kumar', 'male', '2006-02-08', 'Maharashtra', 'Mumbai', 'prasha@pk.com', '9340169981', '4474', 0, 0, 'prashanthuman', '\"Travel smarter, not harder! 🧳 Here are 5 must-know tips for your next adventure. What’s your go-to travel hack? Share in the comments! #TravelTips #GlobeTrotter\"', '$2b$10$PVWAdeTyUCYC8epXE.Wjgekf/hH54UmjqZqd6m5oxJRXmARo8PLzW', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1736399365986.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1736399422681.jpeg', '2025-01-09 05:05:38', 0, 1, 0, 'Foodie - Travels to explore local cuisines, savoring unique flavors and culinary traditions.'),
(79, 'Raman Jain', 'Raman', 'Jain', 'male', '2008-02-09', 'Assam', 'Amguri', 'raman@rj.com', '9022993526', '5825', 0, 0, NULL, NULL, NULL, NULL, 'traveler', NULL, NULL, NULL, NULL, '2025-01-09 05:37:18', 0, 0, 1, NULL),
(80, 'Madhulika Sharma', 'Madhulika', 'Sharma', 'female', '2007-02-08', 'Madhya Pradesh', 'Indore', 'madhu@123.com', '9870516399', '4525', 0, 0, 'madhu-08', '\"Travel smarter, not harder! 🧳 Here are 5 must-know tips for your next adventure. What’s your go-to travel hack? Share in the comments! #TravelTips #GlobeTrotter\"', '$2b$10$WBG/ZXzKQXu/MPoOg7HgrupAfqfvN2xWwlH/Kbu8DkuaSYgPuN3j.', NULL, 'traveler', NULL, NULL, 'http://localhost:3000/uploads/profile_img/profile_1736402299135.jpeg', 'http://localhost:3000/uploads/cover_img/profile_1736402273162.jpeg', '2025-01-09 05:49:41', 0, 1, 0, 'Solo Traveler - Enjoys the freedom of exploring alone, meeting new people, and creating personal stories.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bkt_lists`
--
ALTER TABLE `bkt_lists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `block_user`
--
ALTER TABLE `block_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bucket_category_list`
--
ALTER TABLE `bucket_category_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`,`post_id`);

--
-- Indexes for table `bucket_list`
--
ALTER TABLE `bucket_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `buddies`
--
ALTER TABLE `buddies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `comments_like`
--
ALTER TABLE `comments_like`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comment_id` (`comment_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `comment_reply`
--
ALTER TABLE `comment_reply`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `follower_id` (`follower_id`),
  ADD KEY `followee_id` (`followee_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `list_posts`
--
ALTER TABLE `list_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `list_id` (`list_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `location_id` (`location`);

--
-- Indexes for table `recent_search`
--
ALTER TABLE `recent_search`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reply_comment`
--
ALTER TABLE `reply_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reply_id` (`reply_id`);

--
-- Indexes for table `reply_like`
--
ALTER TABLE `reply_like`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shared_post`
--
ALTER TABLE `shared_post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `stories`
--
ALTER TABLE `stories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `story_likes`
--
ALTER TABLE `story_likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `story_id` (`story_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `story_replies`
--
ALTER TABLE `story_replies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `story_id` (`story_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `story_shares`
--
ALTER TABLE `story_shares`
  ADD PRIMARY KEY (`id`),
  ADD KEY `story_id` (`story_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `story_views`
--
ALTER TABLE `story_views`
  ADD PRIMARY KEY (`id`),
  ADD KEY `story_id` (`story_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bkt_lists`
--
ALTER TABLE `bkt_lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `block_user`
--
ALTER TABLE `block_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `bucket_category_list`
--
ALTER TABLE `bucket_category_list`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `buddies`
--
ALTER TABLE `buddies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `comments_like`
--
ALTER TABLE `comments_like`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `comment_reply`
--
ALTER TABLE `comment_reply`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=847;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217;

--
-- AUTO_INCREMENT for table `list_posts`
--
ALTER TABLE `list_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `recent_search`
--
ALTER TABLE `recent_search`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `reply_comment`
--
ALTER TABLE `reply_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `reply_like`
--
ALTER TABLE `reply_like`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `shared_post`
--
ALTER TABLE `shared_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `stories`
--
ALTER TABLE `stories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;

--
-- AUTO_INCREMENT for table `story_likes`
--
ALTER TABLE `story_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `story_replies`
--
ALTER TABLE `story_replies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `story_shares`
--
ALTER TABLE `story_shares`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `story_views`
--
ALTER TABLE `story_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bkt_lists`
--
ALTER TABLE `bkt_lists`
  ADD CONSTRAINT `bkt_lists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `list_posts`
--
ALTER TABLE `list_posts`
  ADD CONSTRAINT `list_posts_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `bkt_lists` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `list_posts_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `story_shares`
--
ALTER TABLE `story_shares`
  ADD CONSTRAINT `story_shares_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `stories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `story_shares_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
