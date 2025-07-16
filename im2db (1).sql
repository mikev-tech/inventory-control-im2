-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 14, 2025 at 08:22 AM
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
-- Database: `im2db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cartID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `jewelryItemID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `addedAt` datetime DEFAULT current_timestamp()
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
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `categoryID` int(11) NOT NULL
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
  `customerID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_audits`
--

CREATE TABLE `inventory_audits` (
  `auditID` int(11) NOT NULL,
  `inventoryID` int(11) NOT NULL,
  `audit_date` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `counted_quantity` int(11) DEFAULT 0,
  `jewelryItemID` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jewelry_items`
--

CREATE TABLE `jewelry_items` (
  `jewelryItemID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `categoryID` int(11) DEFAULT NULL,
  `purchaseDate` timestamp NULL DEFAULT current_timestamp(),
  `purchaseCost` decimal(10,2) DEFAULT 0.00,
  `stockQuantity` int(11) DEFAULT 0,
  `condition` varchar(255) DEFAULT NULL,
  `supplierID` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `top_selling` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jewelry_items`
--

INSERT INTO `jewelry_items` (`jewelryItemID`, `name`, `description`, `categoryID`, `purchaseDate`, `purchaseCost`, `stockQuantity`, `condition`, `supplierID`, `image`, `top_selling`) VALUES
(1, 'Gold Ring', '18k gold engagement ring', 1, '2025-05-31 16:00:00', 2000.00, 10, 'New', 1, 'uploads/gold-ring.jpg', 1),
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
(20, 'Emerald Necklace', 'Emerald stone necklace', 2, '2025-06-21 16:00:00', 4500.00, 3, 'New', 1, 'uploads/emerald-necklace.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `salesID` int(11) NOT NULL,
  `salesDate` timestamp NULL DEFAULT current_timestamp(),
  `totalAmount` decimal(10,2) NOT NULL,
  `userID` int(11) DEFAULT NULL
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
(25, '2025-07-13 11:12:45', 7400.00, 21);

-- --------------------------------------------------------

--
-- Table structure for table `sale_items`
--

CREATE TABLE `sale_items` (
  `saleItemID` int(11) NOT NULL,
  `jewelryItemID` int(11) DEFAULT NULL,
  `salesID` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
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
  `stockArrivalID` int(11) NOT NULL,
  `jewelryItemID` int(11) DEFAULT NULL,
  `arrivalDate` timestamp NULL DEFAULT current_timestamp(),
  `quantity` int(11) DEFAULT 0,
  `supplierID` int(11) DEFAULT NULL,
  `unitCost` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `supplierID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL
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
(14, 'test', 'test', 'test', 'test'),
(15, 'test2', 'test2', 'test2', 'test2');

-- --------------------------------------------------------

--
-- Table structure for table `systemusers`
--

CREATE TABLE `systemusers` (
  `userid` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT 'user'
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
  MODIFY `cartID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `inventory_audits`
--
ALTER TABLE `inventory_audits`
  MODIFY `auditID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `salesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `sale_items`
--
ALTER TABLE `sale_items`
  MODIFY `saleItemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `supplierID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `systemusers`
--
ALTER TABLE `systemusers`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

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
