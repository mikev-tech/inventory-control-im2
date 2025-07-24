-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 24, 2025 at 06:20 AM
-- Server version: 8.0.40
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `im2db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cartID` int NOT NULL,
  `userID` int NOT NULL,
  `jewelryItemID` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `addedAt` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cartID`, `userID`, `jewelryItemID`, `quantity`, `addedAt`) VALUES
(24, 7, 13, 3, '2025-07-13 12:43:05'),
(25, 7, 2, 1, '2025-07-13 12:43:05'),
(26, 7, 1, 2, '2025-07-13 12:43:05'),
(27, 7, 1, 1, '2025-07-13 12:53:03'),
(28, 7, 1, 1, '2025-07-13 12:53:34'),
(30, 7, 9, 1, '2025-07-13 13:07:31'),
(31, 7, 1, 1, '2025-07-13 13:08:00');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `categoryID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`name`, `image`, `categoryID`) VALUES
('Rings', 'uploads/cat-1.jpg', 1),
('Necklaces', 'uploads/cat-2.jpg', 2),
('Earrings', 'uploads/cat-3.jpg', 3),
('Bracelets', 'uploads/cat-4.jpg', 4),
('Pendants', 'uploads/cat-5.jpg', 5),
('Anklets', 'uploads/cat-6.jpg', 6);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customerID` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_audits`
--

CREATE TABLE `inventory_audits` (
  `auditID` int NOT NULL,
  `inventoryID` int NOT NULL,
  `audit_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `counted_quantity` int DEFAULT '0',
  `jewelryItemID` int DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventory_audits`
--

INSERT INTO `inventory_audits` (`auditID`, `inventoryID`, `audit_date`, `counted_quantity`, `jewelryItemID`, `notes`) VALUES
(1, 19, '2025-07-05 15:13:30', 3, 13, 'Routine audit check'),
(2, 40, '2025-07-04 07:58:19', 15, 5, 'Routine audit check'),
(3, 36, '2025-07-20 10:27:21', 13, 37, 'Routine audit check'),
(4, 28, '2025-07-27 02:11:30', 16, 12, 'Routine audit check'),
(5, 3, '2025-07-07 16:12:38', 17, 45, 'Routine audit check'),
(6, 50, '2025-07-02 22:12:08', 8, 1, 'Routine audit check'),
(7, 43, '2025-07-29 08:06:11', 15, 9, 'Routine audit check'),
(8, 14, '2025-07-11 10:48:12', 18, 34, 'Routine audit check'),
(9, 38, '2025-07-18 11:46:12', 10, 2, 'Routine audit check'),
(10, 50, '2025-07-17 11:34:38', 0, 13, 'Routine audit check'),
(11, 29, '2025-07-16 03:34:38', 19, 22, 'Routine audit check'),
(12, 25, '2025-07-18 05:24:25', 4, 16, 'Routine audit check'),
(13, 35, '2025-07-09 13:58:49', 14, 39, 'Routine audit check'),
(14, 32, '2025-07-06 13:30:53', 9, 12, 'Routine audit check'),
(15, 17, '2025-07-24 07:40:46', 14, 8, 'Routine audit check'),
(16, 30, '2025-07-05 14:35:26', 4, 4, 'Routine audit check'),
(17, 5, '2025-07-08 15:24:26', 14, 5, 'Routine audit check'),
(18, 9, '2025-07-21 16:09:25', 13, 20, 'Routine audit check'),
(19, 16, '2025-07-26 11:54:44', 18, 24, 'Routine audit check'),
(20, 27, '2025-07-06 07:05:52', 10, 10, 'Routine audit check'),
(21, 47, '2025-07-10 02:59:52', 0, 31, 'Routine audit check'),
(22, 15, '2025-07-14 12:42:10', 0, 28, 'Routine audit check'),
(23, 44, '2025-07-14 22:46:50', 8, 26, 'Routine audit check'),
(24, 20, '2025-07-29 13:35:21', 16, 9, 'Routine audit check'),
(25, 30, '2025-07-07 11:35:49', 5, 39, 'Routine audit check'),
(26, 19, '2025-07-11 05:23:03', 12, 39, 'Routine audit check'),
(27, 12, '2025-07-08 07:19:20', 16, 16, 'Routine audit check'),
(28, 28, '2025-07-26 08:59:57', 3, 36, 'Routine audit check'),
(29, 21, '2025-07-20 12:25:38', 17, 14, 'Routine audit check'),
(30, 25, '2025-07-16 07:12:47', 1, 27, 'Routine audit check');

-- --------------------------------------------------------

--
-- Table structure for table `jewelry_items`
--

CREATE TABLE `jewelry_items` (
  `jewelryItemID` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryID` int DEFAULT NULL,
  `purchaseDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `purchaseCost` decimal(10,2) DEFAULT '0.00',
  `stockQuantity` int DEFAULT '0',
  `condition` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplierID` int DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `top_selling` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jewelry_items`
--

INSERT INTO `jewelry_items` (`jewelryItemID`, `name`, `description`, `categoryID`, `purchaseDate`, `purchaseCost`, `stockQuantity`, `condition`, `supplierID`, `image`, `top_selling`) VALUES
(1, 'Gold Ring', '18k gold engagement ring', 1, '2025-05-31 16:00:00', 2500.00, 10, 'New', 1, 'uploads/gold-ring.jpg', 1),
(2, 'Silver Ring', 'Sterling silver classic ring', 1, '2025-06-02 16:00:00', 800.00, 5, 'New', 1, 'uploads/silver-ring.jpg', 0),
(3, 'Diamond Ring', 'Solitaire diamond ring', 1, '2025-06-04 16:00:00', 5000.00, 4, 'New', 2, 'uploads/diamond-ring.avif', 1),
(4, 'Pearl Necklace', 'Freshwater pearl necklace', 2, '2025-06-05 16:00:00', 1500.00, 8, 'New', 1, 'uploads/pearl-necklace.jpg', 0),
(5, 'Gold Chain', '22k gold chain necklace', 2, '2025-06-06 16:00:00', 2500.00, 7, 'New', 2, 'uploads/gold-chain.jpg', 1),
(6, 'Diamond Pendant', 'Pendant with diamond inlay', 5, '2025-06-07 16:00:00', 3000.00, 6, 'New', 1, 'uploads/diamond-pendant.jpg', 1),
(7, 'Stud Earrings', 'Classic diamond stud earrings', 3, '2025-06-08 16:00:00', 1200.00, 8, 'New', 1, 'uploads/stud-earrings.jpg', 1),
(8, 'Hoop Earrings', 'Gold hoop earrings', 3, '2025-06-09 16:00:00', 900.00, 8, 'New', 2, 'uploads/hoop-earrings.jpg', 0),
(9, 'Dangle Earrings', 'Elegant dangle earrings', 3, '2025-06-10 16:00:00', 1100.00, 5, 'New', 1, 'uploads/dangle-earrings.jpg', 0),
(10, 'Charm Bracelet', 'Charm bracelet with gemstones', 4, '2025-06-11 16:00:00', 1300.00, 5, 'New', 2, 'uploads/charm-bracelet.jpg', 0),
(11, 'Gold Bangle', 'Solid gold bangle', 4, '2025-06-12 16:00:00', 1800.00, 4, 'New', 1, 'uploads/gold-bangle.jpg', 1),
(12, 'Leather Bracelet', 'Braided leather bracelet', 4, '2025-06-13 16:00:00', 400.00, 12, 'New', 3, 'uploads/leather-bracelet.jpg', 0),
(13, 'Heart Pendant', 'Heart-shaped pendant', 5, '2025-06-14 16:00:00', 950.00, 6, 'New', 2, 'uploads/heart-pendant.png', 1),
(14, 'Birthstone Pendant', 'Pendant with birthstone', 5, '2025-06-15 16:00:00', 1000.00, 6, 'New', 3, 'uploads/birthstone-pendant.jpg', 0),
(15, 'Cross Pendant', 'Gold cross pendant', 5, '2025-06-16 16:00:00', 1200.00, 8, 'New', 1, 'uploads/cross-pendant.jpg', 0),
(16, 'Silver Anklet', 'Sterling silver anklet', 6, '2025-06-17 16:00:00', 600.00, 9, 'New', 3, 'uploads/silver-anklet.jpg', 0),
(17, 'Beaded Anklet', 'Colorful beaded anklet', 6, '2025-06-18 16:00:00', 450.00, 15, 'New', 2, 'uploads/beaded-anklet.jpg', 0),
(18, 'Gold Anklet', '24k gold anklet', 6, '2025-06-19 16:00:00', 1300.00, 6, 'New', 1, 'uploads/gold-anklet.jpg', 1),
(19, 'Ruby Ring', 'Ring with ruby stone', 1, '2025-06-20 16:00:00', 3700.00, 3, 'New', 2, 'uploads/ruby-ring.jpg', 0),
(20, 'Emerald Necklace', 'Emerald stone necklace', 2, '2025-06-21 16:00:00', 4500.00, 3, 'New', 1, 'uploads/emerald-necklace.jpg', 1),
(21, 'Sapphire Ring', 'Blue sapphire gemstone ring', 1, '2025-07-01 02:00:00', 4200.00, 5, 'New', 2, 'uploads/Sapphire Ring.jpg', 1),
(22, 'Platinum Ring', 'Platinum wedding band', 1, '2025-07-02 02:00:00', 5200.00, 4, 'New', 3, 'uploads/Platinum Ring.jpg', 0),
(23, 'Rose Gold Ring', '14k rose gold stylish ring', 1, '2025-07-03 02:00:00', 2500.00, 7, 'New', 1, 'uploads/Rose Gold Ring.webp', 0),
(24, 'Crystal Necklace', 'Swarovski crystal necklace', 2, '2025-07-04 02:00:00', 1200.00, 6, 'New', 4, 'uploads/Crystal Necklace.jpg', 1),
(25, 'Amethyst Necklace', 'Purple amethyst stone necklace', 2, '2025-07-05 02:00:00', 2800.00, 5, 'New', 5, 'uploads/Amethyst Necklace.webp', 0),
(26, 'Emerald Pendant', 'Oval emerald pendant', 5, '2025-07-06 02:00:00', 3200.00, 4, 'New', 6, 'uploads/Emerald Pendant.webp', 1),
(27, 'Onyx Pendant', 'Black onyx pendant', 5, '2025-07-07 02:00:00', 1400.00, 8, 'New', 2, 'uploads/Onyx Pendant.webp', 0),
(28, 'Pearl Earrings', 'Drop pearl earrings', 3, '2025-07-08 02:00:00', 1300.00, 6, 'New', 7, 'uploads/Pearl Earrings.jpg', 0),
(29, 'Citrine Earrings', 'Yellow citrine gemstone earrings', 3, '2025-07-09 02:00:00', 1500.00, 6, 'New', 3, 'uploads/Citrine Earrings.webp', 1),
(30, 'Topaz Earrings', 'Blue topaz stud earrings', 3, '2025-07-10 02:00:00', 1600.00, 5, 'New', 4, 'uploads/Topaz Earrings.webp', 0),
(31, 'Charm Anklet', 'Silver anklet with charms', 6, '2025-07-11 02:00:00', 700.00, 10, 'New', 1, 'uploads/Charm Anklet.jpg', 0),
(32, 'Turquoise Anklet', 'Turquoise beaded anklet', 6, '2025-07-12 02:00:00', 900.00, 8, 'New', 2, 'uploads/Turquoise Anklet.webp', 0),
(33, 'Diamond Tennis Bracelet', 'White gold diamond bracelet', 4, '2025-07-13 02:00:00', 5200.00, 3, 'New', 3, 'uploads/Diamond Tennis Bracelet.webp', 1),
(34, 'Ruby Bracelet', 'Red ruby stone bracelet', 4, '2025-07-14 02:00:00', 4100.00, 4, 'New', 5, 'uploads/Ruby Bracelet.jpg', 1),
(35, 'Gold Cuff Bracelet', '18k gold cuff bracelet', 4, '2025-07-15 02:00:00', 2800.00, 5, 'New', 6, 'uploads/Gold Cuff Bracelet.webp', 0),
(36, 'Spinel Ring', 'Red spinel gemstone ring', 1, '2025-07-16 02:00:00', 2700.00, 6, 'New', 4, 'uploads/Spinel Ring.webp', 0),
(37, 'Tourmaline Necklace', 'Green tourmaline necklace', 2, '2025-07-17 02:00:00', 3400.00, 4, 'New', 1, 'uploads/Tourmaline Necklace.webp', 1),
(38, 'Garnet Pendant', 'Dark red garnet pendant', 5, '2025-07-18 02:00:00', 1700.00, 7, 'New', 2, 'uploads/Garnet Pendant.webp', 0),
(39, 'Sapphire Earrings', 'Sapphire gemstone earrings', 3, '2025-07-19 02:00:00', 1900.00, 5, 'New', 3, 'uploads/Sapphire Earrings.webp', 1),
(40, 'Opal Ring', 'White opal gemstone ring', 1, '2025-07-20 02:00:00', 2400.00, 6, 'New', 4, 'uploads/Opal Ring.webp', 0),
(41, 'Aquamarine Necklace', 'Blue aquamarine stone necklace', 2, '2025-07-21 02:00:00', 3000.00, 4, 'New', 5, 'uploads/Aquamarine Necklace.jpg', 1),
(42, 'Moonstone Pendant', 'Rainbow moonstone pendant', 5, '2025-07-22 02:00:00', 1600.00, 6, 'New', 6, 'uploads/Moonstone Pendant.webp', 0),
(43, 'Amethyst Bracelet', 'Purple amethyst stone bracelet', 4, '2025-07-23 02:00:00', 2100.00, 5, 'New', 7, 'uploads/Amethyst Bracelet.jpeg', 0),
(44, 'Cubic Zirconia Ring', 'CZ imitation diamond ring', 1, '2025-07-24 02:00:00', 800.00, 10, 'New', 3, 'uploads/Cubic Zirconia Ring.jpg', 0),
(45, 'Malachite Pendant', 'Green malachite stone pendant', 5, '2025-07-25 02:00:00', 1100.00, 7, 'New', 2, 'uploads/Malachite Pendant.jpg', 0),
(46, 'Tanzanite Necklace', 'Rare tanzanite stone necklace', 2, '2025-07-26 02:00:00', 5200.00, 3, 'New', 4, 'uploads/Tanzanite Necklace.jpg', 1),
(47, 'Peridot Earrings', 'Lime green peridot earrings', 3, '2025-07-27 02:00:00', 1400.00, 6, 'New', 5, 'uploads/Peridot Earrings.webp', 0),
(48, 'Gold Toe Ring', 'Small 14k gold toe ring', 1, '2025-07-28 02:00:00', 700.00, 12, 'New', 6, 'uploads/Gold Toe Ring.webp', 0),
(49, 'Amber Pendant', 'Golden amber stone pendant', 5, '2025-07-29 02:00:00', 900.00, 9, 'New', 7, 'uploads/Amber Pendant.webp', 0),
(50, 'Rose Quartz Bracelet', 'Pink rose quartz stone bracelet', 4, '2025-07-30 02:00:00', 1200.00, 8, 'New', 1, 'uploads/Rose Quartz Bracelet.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `salesID` int NOT NULL,
  `salesDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `totalAmount` decimal(10,2) NOT NULL,
  `userID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`salesID`, `salesDate`, `totalAmount`, `userID`) VALUES
(17, '2025-07-13 11:01:46', 800.00, 17),
(18, '2025-07-13 11:01:51', 2200.00, 17),
(19, '2025-07-13 11:01:53', 400.00, 17),
(20, '2025-07-13 11:01:54', 2850.00, 17),
(21, '2025-07-13 11:01:56', 3000.00, 17),
(22, '2025-07-13 11:12:39', 2000.00, 21),
(23, '2025-07-13 11:12:42', 1300.00, 21),
(24, '2025-07-13 11:12:44', 1600.00, 21),
(25, '2025-07-13 11:12:45', 7400.00, 21),
(26, '2025-07-19 13:34:23', 3103.52, 7),
(27, '2025-07-05 03:34:25', 7029.66, 1),
(28, '2025-07-03 14:53:10', 3700.08, 9),
(29, '2025-07-13 06:25:00', 2947.74, 9),
(30, '2025-07-27 16:54:06', 6746.54, 4),
(31, '2025-07-07 10:11:05', 1846.32, 13),
(32, '2025-07-05 23:33:50', 2984.06, 1),
(33, '2025-07-28 13:30:51', 3111.75, 14),
(34, '2025-07-13 14:53:19', 5353.44, 11),
(35, '2025-07-28 13:13:49', 4844.41, 2),
(36, '2025-07-25 08:42:23', 2318.65, 18),
(37, '2025-07-13 06:06:36', 3528.53, 17),
(38, '2025-07-25 13:40:24', 7293.12, 5),
(39, '2025-07-20 11:23:12', 4971.03, 1),
(40, '2025-07-14 14:24:51', 5914.21, 21),
(41, '2025-07-12 23:20:56', 953.07, 7),
(42, '2025-07-24 07:15:03', 1367.21, 2),
(43, '2025-07-24 18:09:29', 4871.92, 9),
(44, '2025-07-17 03:48:04', 6740.45, 16),
(45, '2025-07-24 08:26:34', 4396.33, 8),
(46, '2025-07-21 02:36:08', 1700.94, 20),
(47, '2025-07-24 18:38:17', 6082.57, 6),
(48, '2025-07-05 07:56:10', 6194.60, 10),
(49, '2025-07-10 14:46:03', 7099.45, 2),
(50, '2025-07-04 10:05:55', 5697.66, 17),
(51, '2025-07-10 02:14:05', 2817.65, 18),
(52, '2025-07-25 02:18:11', 2759.06, 15),
(53, '2025-07-05 16:15:22', 3884.21, 21),
(54, '2025-07-13 14:54:56', 5010.99, 15),
(55, '2025-07-12 22:26:19', 1756.59, 21);

-- --------------------------------------------------------

--
-- Table structure for table `sale_items`
--

CREATE TABLE `sale_items` (
  `saleItemID` int NOT NULL,
  `jewelryItemID` int DEFAULT NULL,
  `salesID` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `unitPrice` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sale_items`
--

INSERT INTO `sale_items` (`saleItemID`, `jewelryItemID`, `salesID`, `quantity`, `unitPrice`) VALUES
(16, 2, 17, 1, 800.00),
(17, 9, 18, 2, 1100.00),
(18, 12, 19, 1, 400.00),
(19, 13, 20, 3, 950.00),
(20, 16, 21, 5, 600.00),
(21, 1, 22, 1, 2000.00),
(22, 10, 23, 1, 1300.00),
(23, 12, 24, 4, 400.00),
(24, 19, 25, 2, 3700.00);

-- --------------------------------------------------------

--
-- Table structure for table `stock_arrivals`
--

CREATE TABLE `stock_arrivals` (
  `stockArrivalID` int NOT NULL,
  `jewelryItemID` int DEFAULT NULL,
  `arrivalDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `quantity` int DEFAULT '0',
  `supplierID` int DEFAULT NULL,
  `unitCost` decimal(10,2) DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stock_arrivals`
--

INSERT INTO `stock_arrivals` (`stockArrivalID`, `jewelryItemID`, `arrivalDate`, `quantity`, `supplierID`, `unitCost`) VALUES
(1, 9, '2025-07-25 02:12:41', 11, 3, 536.57),
(2, 9, '2025-07-22 15:29:29', 13, 7, 3441.30),
(3, 42, '2025-07-08 09:53:09', 9, 2, 3502.65),
(4, 2, '2025-07-19 02:23:17', 12, 4, 2469.03),
(5, 16, '2025-07-21 23:54:40', 8, 5, 1105.04),
(6, 38, '2025-07-21 09:01:50', 3, 7, 3495.94),
(7, 16, '2025-07-07 10:01:27', 15, 5, 4198.70),
(8, 28, '2025-07-23 12:09:20', 14, 2, 4928.38),
(9, 13, '2025-07-19 22:58:03', 12, 7, 4442.28),
(10, 35, '2025-07-20 21:43:08', 14, 3, 2834.33),
(11, 13, '2025-07-09 08:45:22', 14, 1, 4354.17),
(12, 26, '2025-07-10 22:11:04', 13, 2, 2462.76),
(13, 23, '2025-07-16 15:12:19', 4, 2, 3246.19),
(14, 24, '2025-07-13 02:42:10', 7, 6, 1556.88),
(15, 10, '2025-07-13 16:06:02', 5, 1, 1092.61),
(16, 13, '2025-07-22 10:24:40', 14, 6, 4139.72),
(17, 22, '2025-07-06 00:07:34', 15, 6, 3647.34),
(18, 27, '2025-07-13 17:30:40', 9, 7, 3623.58),
(19, 18, '2025-07-25 17:22:14', 15, 4, 4050.47),
(20, 16, '2025-07-26 09:46:32', 7, 1, 4202.20),
(21, 30, '2025-07-03 07:22:16', 11, 5, 4055.00),
(22, 12, '2025-07-21 07:19:24', 11, 2, 2527.36),
(23, 23, '2025-07-17 04:14:41', 6, 5, 3431.04),
(24, 29, '2025-07-19 19:35:20', 15, 3, 541.74),
(25, 41, '2025-07-13 16:43:35', 3, 1, 3087.99),
(26, 28, '2025-07-27 01:47:40', 12, 1, 993.57),
(27, 15, '2025-07-24 21:57:30', 5, 6, 708.47),
(28, 39, '2025-07-21 13:36:48', 7, 6, 4023.36),
(29, 15, '2025-07-01 06:01:40', 14, 2, 649.70),
(30, 13, '2025-07-22 16:33:43', 12, 1, 1479.30);

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `supplierID` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`supplierID`, `name`, `phone`, `email`, `address`) VALUES
(2, 'Silver Sparkle Inc.', '09181234567', 'info@silversparkle.ph', '456 Mango St, Cebu City'),
(3, 'Pearl & More', '09221234567', 'sales@pearlnmore.com', '789 Davao Blvd, Davao City'),
(4, 'Diamond Traders', '09331234567', 'support@diamondtraders.net', '321 Emerald Dr, Quezon City'),
(5, 'LuxJewels Supply', '09441234567', 'admin@luxjewels.ph', '654 Opal Lane, Bacolod'),
(6, 'Prestige Metals', '09551234567', 'hello@prestigemetals.com', '987 Ruby Rd, Iloilo City'),
(7, 'Adrian', '09927153596', 'adrian@gwapo.com', 'Fromaroung the world'),
(16, 'Mike', '09123456798', 'mike@email.com', 'from earth'),
(17, 'Hard Stone Supply', '09123456789', 'stone@hard.com', 'Near the office');

-- --------------------------------------------------------

--
-- Table structure for table `systemusers`
--

CREATE TABLE `systemusers` (
  `userid` int NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_picture` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `systemusers`
--

INSERT INTO `systemusers` (`userid`, `username`, `password`, `email`, `profile_picture`, `role`) VALUES
(1, 'test1', '$2b$10$qEcjew46nEM1S12SkRkuXuWLTNwMYTS5mdosORqLMftmSxseXzTDO', 'test1', '/uploads/default-avatar.png', 'User'),
(2, 'test2', '$2b$10$bHGf.tlnUxkB5HEDrPhN6eDc2RnnRw4JJzpBX4ycuU8vy7FpsYqrO', 'test2', '/uploads/default-avatar.png', 'Admin'),
(4, 'Admin1', '$2b$10$rZFEK1UEbJNmhb9QAQMRveEKWkH2daYZBkCSbNGN4CMuL6GV1jfoa', 'Admin1', '/uploads/default-avatar.png', ''),
(5, 'Admin', '$2b$10$NQN1Z7ecsU9n.ddZOG/M.eX1Qt5d2.b6xQpuWx.6zJKMOY3mUjZr.', 'Admin', '/uploads/1752313340589-smile meme.jpg', 'Admin'),
(6, 'user', '$2b$10$eqcueRAvB1Lc28o/eiHyrOeNOMOzwR0Qso2TQ/Q/eAwsUr6RSlTCa', 'user', '/uploads/default-avatar.png', 'user'),
(7, 'user1', '$2b$10$NQN1Z7ecsU9n.ddZOG/M.eX1Qt5d2.b6xQpuWx.6zJKMOY3mUjZr.', 'user1', '/uploads/default-avatar.png', 'User'),
(8, 'user2', '$2b$10$NQN1Z7ecsU9n.ddZOG/M.eX1Qt5d2.b6xQpuWx.6zJKMOY3mUjZr.', 'user2', '/uploads/default-avatar.png', 'User'),
(9, 'user3', '$2b$10$NQN1Z7ecsU9n.ddZOG/M.eX1Qt5d2.b6xQpuWx.6zJKMOY3mUjZr.', 'user3', '/uploads/default-avatar.png', 'User'),
(10, 'user4', '$2b$10$NQN1Z7ecsU9n.ddZOG/M.eX1Qt5d2.b6xQpuWx.6zJKMOY3mUjZr.', 'user4', '/uploads/default-avatar.png', 'User'),
(11, 'user5', '$2b$10$NQN1Z7ecsU9n.ddZOG/M.eX1Qt5d2.b6xQpuWx.6zJKMOY3mUjZr.', 'user5', '/uploads/default-avatar.png', 'User'),
(12, 'user6', '$2b$10$NQN1Z7ecsU9n.ddZOG/M.eX1Qt5d2.b6xQpuWx.6zJKMOY3mUjZr.', 'user6', '/uploads/default-avatar.png', 'User'),
(13, 'user7', '$2b$10$NQN1Z7ecsU9n.ddZOG/M.eX1Qt5d2.b6xQpuWx.6zJKMOY3mUjZr.', 'user7', '/uploads/default-avatar.png', 'User'),
(14, 'user8', '$2b$10$NQN1Z7ecsU9n.ddZOG/M.eX1Qt5d2.b6xQpuWx.6zJKMOY3mUjZr.', 'user8', '/uploads/default-avatar.png', 'User'),
(15, 'user9', '$2b$10$NQN1Z7ecsU9n.ddZOG/M.eX1Qt5d2.b6xQpuWx.6zJKMOY3mUjZr.', 'user9', '/uploads/default-avatar.png', 'User'),
(16, 'user10', '$2b$10$NQN1Z7ecsU9n.ddZOG/M.eX1Qt5d2.b6xQpuWx.6zJKMOY3mUjZr.', 'user10', '/uploads/default-avatar.png', 'User'),
(17, 'gwapoko', '$2b$10$dBERKMG2sL8KOW/GdS5riOVJLxtC.ztBFbNWPcEyhkkcikosraDQK', 'gwapoko', NULL, 'user'),
(18, 'test3', '$2b$10$T2U5TUaxkRpariTKM9yomOT1OYxpur.Jf2OX4yQVTXTsgYpFqxK6i', 'test3', NULL, 'user'),
(19, 'test4', '$2b$10$uv8DCaJ9bSxSgdycFLqHz.BfjSGNOOQUk5d4h2fB8LL.WWkrxJZ8i', 'test4', NULL, 'user'),
(20, 'yan', '$2b$10$wPY3eRV4GvjVTyjDR/2QoeCxzMEzZ9D7peT/zhIy2s5I1eLCIEnh.', 'yan', NULL, 'user'),
(21, 'test5', '$2b$10$wMkgOL4WYhwIaARtBYaMZ.Cp4GmSQD.8xTvBDVrvp7Bokx/7tzvzC', 'test5', NULL, 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartID`),
  ADD KEY `fk_user` (`userID`),
  ADD KEY `fk_jewelry` (`jewelryItemID`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryID`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customerID`);

--
-- Indexes for table `inventory_audits`
--
ALTER TABLE `inventory_audits`
  ADD PRIMARY KEY (`auditID`),
  ADD KEY `jewelryItemID` (`jewelryItemID`),
  ADD KEY `inventoryID` (`inventoryID`);

--
-- Indexes for table `jewelry_items`
--
ALTER TABLE `jewelry_items`
  ADD PRIMARY KEY (`jewelryItemID`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`salesID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `sale_items`
--
ALTER TABLE `sale_items`
  ADD PRIMARY KEY (`saleItemID`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`supplierID`);

--
-- Indexes for table `systemusers`
--
ALTER TABLE `systemusers`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cartID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `inventory_audits`
--
ALTER TABLE `inventory_audits`
  MODIFY `auditID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `salesID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `sale_items`
--
ALTER TABLE `sale_items`
  MODIFY `saleItemID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `supplierID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `systemusers`
--
ALTER TABLE `systemusers`
  MODIFY `userid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `fk_jewelry` FOREIGN KEY (`jewelryItemID`) REFERENCES `jewelry_items` (`jewelryItemID`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`userID`) REFERENCES `systemusers` (`userid`) ON DELETE CASCADE;

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `systemusers` (`userid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
