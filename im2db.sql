-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 03, 2025 at 04:47 AM
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
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryID` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customerID` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_audits`
--

CREATE TABLE `inventory_audits` (
  `inventoryID` int NOT NULL,
  `audit_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `counted_quantity` int DEFAULT '0',
  `jewelryItemID` int DEFAULT NULL,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jewelry_items`
--

CREATE TABLE `jewelry_items` (
  `jewelryItemID` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `categoryID` int DEFAULT NULL,
  `purchaseDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `purchaseCost` decimal(10,2) DEFAULT '0.00',
  `stockQuantity` int DEFAULT '0',
  `condition` varchar(255) DEFAULT NULL,
  `supplierID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `salesID` int NOT NULL,
  `salesDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `totalAmount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `supplierID` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `systemUsers`
--

CREATE TABLE `systemUsers` (
  `userID` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

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
  ADD PRIMARY KEY (`inventoryID`),
  ADD KEY `jewelryItemID` (`jewelryItemID`);

--
-- Indexes for table `jewelry_items`
--
ALTER TABLE `jewelry_items`
  ADD PRIMARY KEY (`jewelryItemID`),
  ADD KEY `categoryID` (`categoryID`),
  ADD KEY `supplierID` (`supplierID`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`salesID`);

--
-- Indexes for table `sale_items`
--
ALTER TABLE `sale_items`
  ADD PRIMARY KEY (`saleItemID`),
  ADD KEY `jewelryItemID` (`jewelryItemID`),
  ADD KEY `salesID` (`salesID`);

--
-- Indexes for table `stock_arrivals`
--
ALTER TABLE `stock_arrivals`
  ADD PRIMARY KEY (`stockArrivalID`),
  ADD KEY `supplierID` (`supplierID`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`supplierID`);

--
-- Indexes for table `systemUsers`
--
ALTER TABLE `systemUsers`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customerID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_audits`
--
ALTER TABLE `inventory_audits`
  MODIFY `inventoryID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jewelry_items`
--
ALTER TABLE `jewelry_items`
  MODIFY `jewelryItemID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `salesID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sale_items`
--
ALTER TABLE `sale_items`
  MODIFY `saleItemID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock_arrivals`
--
ALTER TABLE `stock_arrivals`
  MODIFY `stockArrivalID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `supplierID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `systemUsers`
--
ALTER TABLE `systemUsers`
  MODIFY `userID` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `inventory_audits`
--
ALTER TABLE `inventory_audits`
  ADD CONSTRAINT `inventory_audits_ibfk_1` FOREIGN KEY (`jewelryItemID`) REFERENCES `jewelry_items` (`jewelryItemID`);

--
-- Constraints for table `jewelry_items`
--
ALTER TABLE `jewelry_items`
  ADD CONSTRAINT `jewelry_items_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`categoryID`),
  ADD CONSTRAINT `jewelry_items_ibfk_2` FOREIGN KEY (`supplierID`) REFERENCES `suppliers` (`supplierID`);

--
-- Constraints for table `sale_items`
--
ALTER TABLE `sale_items`
  ADD CONSTRAINT `sale_items_ibfk_1` FOREIGN KEY (`jewelryItemID`) REFERENCES `jewelry_items` (`jewelryItemID`),
  ADD CONSTRAINT `sale_items_ibfk_2` FOREIGN KEY (`salesID`) REFERENCES `sales` (`salesID`);

--
-- Constraints for table `stock_arrivals`
--
ALTER TABLE `stock_arrivals`
  ADD CONSTRAINT `stock_arrivals_ibfk_1` FOREIGN KEY (`supplierID`) REFERENCES `suppliers` (`supplierID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
