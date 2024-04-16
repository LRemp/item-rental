-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.3.1-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for itemrental
CREATE DATABASE IF NOT EXISTS `itemrental` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci */;
USE `itemrental`;

-- Dumping structure for table itemrental.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` uuid NOT NULL,
  `name` varchar(255) NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `parent` varchar(255) DEFAULT NULL,
  `scheme` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.categories: ~11 rows (approximately)
DELETE FROM `categories`;
INSERT INTO `categories` (`id`, `name`, `label`, `parent`, `scheme`) VALUES
	('1e3ebeba-c402-449f-8a69-0b431b87137c', 'other', 'Other', NULL, NULL),
	('93a0387d-4687-442b-92bf-182626764a31', 'lensfilter', 'Lens filters', 'video', '[{"type":"string","label":"Type","name":"type"}]'),
	('a01cdedf-8b2d-4f60-9775-2949d4c930af', 'electronics', 'Electronics', NULL, NULL),
	('9b73883b-fc3a-48de-b4ec-461d2d5dea1b', 'video', 'Video', NULL, ''),
	('e6f4a840-066d-48cc-bf75-4a48a428c5fc', 'vehicles', 'Vehicles', NULL, '[{"type":"select","label":"Type","name":"type","options":["Car", "Trailer","Truck","Motorcycle"]},{"type":"select","label":"Fuel type","name":"fueltype","options":["Diesel", "Gasoline","EV"]}]'),
	('f61f71e2-9825-496c-b987-5be6e338b50f', 'audio', 'Audio', NULL, NULL),
	('33f81811-8582-4879-8106-9b8e8c190cdc', 'microphones', 'Microphones', 'audio', '[{"type":"select","label":"Type","name":"type","options":["Dynamic", "Condenser"]},{"type":"string","name":"model","label":"Model"},{"type":"select","label":"Connection","name":"connection","options":["USB", "XLR"]}]'),
	('123341dd-1307-45f4-a6bf-9bf103e6149b', 'phones', 'Phones', 'electronics', '[{"type":"select","label":"Maker","name":"maker","options":["samsung", "lg"]},{"type":"string","name":"model","label":"Model"}]'),
	('72f123dd-1307-45f4-a6bf-9bf103e6149b', 'cameras', 'Cameras', 'video', '[{"name":"mountType","type":"string","label":"Lens mount type"}]'),
	('94fea3dd-1307-45f4-a6bf-9bf103e6149b', 'computers', 'Computers', 'electronics', '[{"type":"number","min":"1","max":"10","name":"cores","label":"Cores"}]'),
	('fb55d6cc-d5c2-47d2-b8fa-9e7415068d31', 'lens', 'Lens', 'video', '[{"type":"string","label":"Mount type","name":"mounttype"},{"type":"string","name":"focallength","label":"Focal length"},{"type":"string","label":"Apperture","name":"apperture"}]');

-- Dumping structure for table itemrental.deliveries
CREATE TABLE IF NOT EXISTS `deliveries` (
  `id` uuid NOT NULL,
  `order` uuid NOT NULL,
  `type` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `location` text DEFAULT NULL,
  `shippingProvider` varchar(50) DEFAULT NULL,
  `shippingId` varchar(50) DEFAULT NULL,
  `comment` longtext DEFAULT NULL,
  `completed` int(11) DEFAULT 0,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.deliveries: ~10 rows (approximately)
DELETE FROM `deliveries`;
INSERT INTO `deliveries` (`id`, `order`, `type`, `role`, `location`, `shippingProvider`, `shippingId`, `comment`, `completed`) VALUES
	('593567e8-5e10-4430-973f-08b00d64f763', 'e2ee9ed8-e2a5-4f6b-b23f-8992ef2b8266', 1, 1, NULL, '2', 'CE473405152EE', NULL, 0),
	('d1aa1cc3-17d7-432f-9ed0-0a2d5f81809e', '53df4412-cdbd-4413-8d3d-6723d67488e6', 1, 1, NULL, '2', 'CE473405152EE', 'Pristatymas', 0),
	('feddfcc3-fbe4-4345-a1d9-18f5a029cdae', 'd8c62fc2-21a0-4588-8d9b-6db3b44d60a4', 0, 0, '789797', '2', 'CE473405152EE', NULL, 1),
	('765f3753-8446-4272-bc6b-2570bd2db8ea', '0b8e55db-ae77-43ab-b072-95a316c2f026', 1, 1, NULL, '2', 'CE473405152EE', NULL, 1),
	('f9af23b9-0a9d-4115-b53b-27bc6b1496d7', '6c9d6e0e-82f3-4adb-9d60-19cfaf2d51c7', 0, 0, 'Kaunas', '2', 'CE473405152EE', NULL, 1),
	('72711c93-c437-4398-afd4-4bfc0afeb7c1', '1945b4a1-2911-43c6-bbac-dd25bd2a5cdb', 1, 1, NULL, '2', 'CE473405152EE', 'test', 0),
	('8350ee8e-7db7-431c-afa2-78834204a210', 'e704c1ce-3a71-488b-83c0-2182a41824c6', 0, 0, 'Kaunas, Lithuania', '2', 'CE473405152EE', NULL, 1),
	('8238be80-8ee8-446e-813f-8245461273f6', 'e704c1ce-3a71-488b-83c0-2182a41824c6', 0, 1, 'Kaunas, K.Baršausko g. 43', '2', 'CE473405152EE', NULL, 1),
	('0a9fe6b6-9c51-46dd-88dc-99504b493be6', 'd8c62fc2-21a0-4588-8d9b-6db3b44d60a4', 0, 1, 'asd', '2', 'CE473405152EE', NULL, 1),
	('889a4140-9ca4-4a63-8aed-c5f01ee67662', 'a5735e6b-ec17-405a-8214-1024b6d488cb', 1, 1, NULL, '2', 'CE473405152EE', 'stest123', 0),
	('b61c08b1-b1fb-43ff-9b1a-de9eb024b563', '05d6659e-9392-40d9-9f13-99a507ece273', 0, 1, 'K. Baršausko g. 64, Kaunas, Lietuva', '2', 'CE473405152EE', NULL, 1),
	('b56be486-9268-461b-8921-deca4c172cbe', '6c9d6e0e-82f3-4adb-9d60-19cfaf2d51c7', 0, 1, 'Kaunas, Lithuania', '2', 'CE473405152EE', NULL, 1);

-- Dumping structure for table itemrental.eventlog
CREATE TABLE IF NOT EXISTS `eventlog` (
  `rowId` int(11) NOT NULL AUTO_INCREMENT,
  `id` uuid NOT NULL,
  `resource` uuid NOT NULL,
  `eventName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` longtext NOT NULL,
  `description` longtext NOT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`rowId`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.eventlog: ~26 rows (approximately)
DELETE FROM `eventlog`;
INSERT INTO `eventlog` (`rowId`, `id`, `resource`, `eventName`, `title`, `description`, `timestamp`) VALUES
	(14, 'f64f91df-1f54-44d7-a87f-6a9df4fc3455', '0b8e55db-ae77-43ab-b072-95a316c2f026', 'Order.Created', 'Created', 'Order created by the user', '2024-04-11 20:26:47'),
	(15, 'cc36b133-59e9-4fe4-80c3-45b24b5f454a', '0b8e55db-ae77-43ab-b072-95a316c2f026', 'Order.Accepted', 'Accepted', 'Order accepted by the merchant', '2024-04-11 20:27:23'),
	(16, '9440fbbb-efb3-4f8f-82c5-6ddd2b725db5', '0b8e55db-ae77-43ab-b072-95a316c2f026', 'Order.Dispatched', 'Dispatched', 'Order dispatched by the merchant', '2024-04-12 08:35:30'),
	(17, 'e85e7bf5-a47b-4405-a47b-2c28f6ddd860', '0b8e55db-ae77-43ab-b072-95a316c2f026', 'Order.Delivered', 'Delivered', 'Order delivered to the customer', '2024-04-12 08:46:01'),
	(18, 'aecce21c-679a-41a5-8181-5860a6bf73ed', 'd8c62fc2-21a0-4588-8d9b-6db3b44d60a4', 'Order.Created', 'Created', 'Order created by the user', '2024-04-12 08:53:37'),
	(19, '5b1fc963-413c-4c30-ba1c-28b9eb3ccf83', 'd8c62fc2-21a0-4588-8d9b-6db3b44d60a4', 'Order.Accepted', 'Accepted', 'Order accepted by the merchant', '2024-04-12 08:54:07'),
	(20, '69f5640e-cee3-4e02-b728-a267b8ece53c', 'd8c62fc2-21a0-4588-8d9b-6db3b44d60a4', 'Order.Dispatched', 'Dispatched', 'Order dispatched by the merchant', '2024-04-12 08:55:15'),
	(21, 'b171ce17-ddd6-4a2e-9540-bf6facb573b4', 'd8c62fc2-21a0-4588-8d9b-6db3b44d60a4', 'Order.Delivered', 'Delivered', 'Order delivered to the customer', '2024-04-12 08:55:28'),
	(22, '88423a68-4b5f-473e-8dca-2ef0ab9f1d63', 'd8c62fc2-21a0-4588-8d9b-6db3b44d60a4', 'Order.ReturnDispatched', 'Dispatched', 'Order dispatched back by the customer', '2024-04-12 09:13:48'),
	(23, 'bf8f99b4-0d65-4cf8-9c4d-0c1cb49fc923', 'd8c62fc2-21a0-4588-8d9b-6db3b44d60a4', 'Order.Returned', 'Returned', 'Order returned by the customer', '2024-04-12 09:15:02'),
	(24, '73735572-387b-4fd7-b68b-84c36881e9a8', 'd8c62fc2-21a0-4588-8d9b-6db3b44d60a4', 'Order.Complete', 'Complete', 'The order is complete', '2024-04-12 09:15:02'),
	(25, 'faa1f967-cd96-4215-b97f-b6c6cddd9db1', '94c03172-c718-45b4-b85f-5ed50b1d0eaf', 'Order.Created', 'Created', 'Order created by the user', '2024-04-15 15:39:01'),
	(26, '9d81d39a-d4cc-4b03-925f-52f544464e9b', 'c19375e6-a87a-4cd2-a55e-716817cbfe51', 'Order.Created', 'Created', 'Order created by the user', '2024-04-15 16:03:44'),
	(27, '863039c4-f7a0-4330-afe7-4adbe81d8301', 'a714072f-7b40-4f44-9bc8-3416f51b86e7', 'Order.Created', 'Created', 'Order created by the user', '2024-04-15 16:06:21'),
	(28, '8e20c4a3-494b-492f-a33e-41064591bd85', '88f2df42-8b4f-47e4-ae17-de5576364781', 'Order.Created', 'Created', 'Order created by the user', '2024-04-15 16:13:27'),
	(29, '2a53929e-c052-401d-9816-be7fb01d79ac', '4ebe5050-59d6-497d-b79e-6e44b7bd289e', 'Order.Created', 'Created', 'Order created by the user', '2024-04-15 17:33:14'),
	(30, 'cb0d52b7-d667-405b-b266-c02536776382', '4ebe5050-59d6-497d-b79e-6e44b7bd289e', 'Order.Accepted', 'Accepted', 'Order accepted by the merchant', '2024-04-15 17:33:57'),
	(31, '18456d58-ed62-4e1a-bf08-f24224417f47', '1f718cb5-32b1-4bae-b764-8c9e4116cf22', 'Order.Created', 'Created', 'Order created by the user', '2024-04-15 17:35:00'),
	(32, '47640bd6-79e5-4ef6-80a4-23553f79e4f7', '0411c2dc-083b-468c-9f34-d8e628e55a7c', 'Order.Created', 'Created', 'Order created by the user', '2024-04-15 17:35:52'),
	(33, '43f3f081-d38f-4307-a6b6-33e982ade6d9', 'd86d2041-d45e-4b86-b80e-f106cd444ace', 'Order.Created', 'Created', 'Order created by the user', '2024-04-15 17:36:18'),
	(34, '5e9a9b70-bb66-44be-b981-b3ce2f6f913b', 'e704c1ce-3a71-488b-83c0-2182a41824c6', 'Order.Created', 'Created', 'Order created by the user', '2024-04-15 17:37:10'),
	(35, '0ced66b1-4144-472d-8c48-0bd876c9661f', '0ac3e66a-6a23-4741-b8e2-7e2f90541b69', 'Order.Created', 'Created', 'Order created by the user', '2024-04-15 17:37:33'),
	(36, '06042116-2b2f-4020-ba24-76d9c97daa13', '8723b1be-e59c-45df-bd3a-7cfbb09c73a3', 'Order.Created', 'Created', 'Order created by the user', '2024-04-15 17:38:03'),
	(37, '004d3cf1-2d49-4581-8ee3-865984609724', '0411c2dc-083b-468c-9f34-d8e628e55a7c', 'Order.Accepted', 'Accepted', 'Order accepted by the merchant', '2024-04-15 17:38:24'),
	(38, '2073b8df-5e9e-4900-91ac-bcadbf65f95e', 'b599ebb1-a933-47ef-a702-e0f8e59de778', 'Order.Created', 'Created', 'Order created by the user', '2024-04-15 18:09:09'),
	(39, 'e244eb26-366e-4791-b14f-e9a9f4884fcd', 'd86d2041-d45e-4b86-b80e-f106cd444ace', 'Order.Accepted', 'Accepted', 'Order accepted by the merchant', '2024-04-15 18:09:33'),
	(40, '927954ec-5f27-4c10-a608-e896b6b0bb4d', 'b599ebb1-a933-47ef-a702-e0f8e59de778', 'Order.Accepted', 'Accepted', 'Order accepted by the merchant', '2024-04-15 18:09:35'),
	(41, '12c545fb-e948-4685-b5db-e8691bb5e28d', '88f2df42-8b4f-47e4-ae17-de5576364781', 'Order.Accepted', 'Accepted', 'Order accepted by the merchant', '2024-04-15 18:09:37'),
	(42, '6200f310-c0ac-4a53-ba5f-c44bdc24b713', '1f718cb5-32b1-4bae-b764-8c9e4116cf22', 'Order.Accepted', 'Accepted', 'Order accepted by the merchant', '2024-04-15 18:09:38'),
	(43, '78b65af5-e4db-420e-84e0-5b02e3ffb14e', '0ac3e66a-6a23-4741-b8e2-7e2f90541b69', 'Order.Accepted', 'Accepted', 'Order accepted by the merchant', '2024-04-15 18:09:39'),
	(44, 'a50233c3-0194-4d90-9cd4-a8b4087c092f', '8723b1be-e59c-45df-bd3a-7cfbb09c73a3', 'Order.Accepted', 'Accepted', 'Order accepted by the merchant', '2024-04-15 18:09:40'),
	(45, '9185a7ea-d857-479e-840f-089ee4de0601', 'c19375e6-a87a-4cd2-a55e-716817cbfe51', 'Order.Accepted', 'Accepted', 'Order accepted by the merchant', '2024-04-15 18:09:41'),
	(46, '5177ef82-bd9c-4870-88f2-11d5061af655', '94c03172-c718-45b4-b85f-5ed50b1d0eaf', 'Order.Accepted', 'Accepted', 'Order accepted by the merchant', '2024-04-15 18:09:42'),
	(47, '347f3e7e-8553-4395-ad8a-47bdbf31e396', 'a714072f-7b40-4f44-9bc8-3416f51b86e7', 'Order.Accepted', 'Accepted', 'Order accepted by the merchant', '2024-04-15 18:09:43'),
	(48, '1baeb3e4-b940-4184-8619-74c038951874', 'e704c1ce-3a71-488b-83c0-2182a41824c6', 'Order.Accepted', 'Accepted', 'Order accepted by the merchant', '2024-04-15 18:09:44'),
	(49, '738b88e6-b5f9-49a5-a6e2-4009ed2c69bc', 'e3bfd257-8251-4296-aa8d-7fdc58595349', 'Order.Created', 'Created', 'Order created by the user', '2024-04-16 06:43:14'),
	(50, 'e5c8e6d9-58a0-4415-bb30-832382cabe0b', 'e704c1ce-3a71-488b-83c0-2182a41824c6', 'Order.Dispatched', 'Dispatched', 'Order dispatched by the merchant', '2024-04-16 07:40:43'),
	(51, '534ccc8d-7279-4767-b7d5-b556fc0736bd', 'e704c1ce-3a71-488b-83c0-2182a41824c6', 'Order.Delivered', 'Delivered', 'Order delivered to the customer', '2024-04-16 07:43:21'),
	(52, 'c7240578-a1ca-4bb9-8f07-d57926cc1cfb', 'e704c1ce-3a71-488b-83c0-2182a41824c6', 'Order.ReturnDispatched', 'Dispatched', 'Order dispatched back by the customer', '2024-04-16 07:43:39'),
	(53, '1da3d289-9083-4296-9a20-5dd67c3064e9', 'e704c1ce-3a71-488b-83c0-2182a41824c6', 'Order.Returned', 'Returned', 'Order returned by the customer', '2024-04-16 07:44:08'),
	(54, '50948ffe-3807-4a44-8880-c72745290f15', 'e704c1ce-3a71-488b-83c0-2182a41824c6', 'Order.Complete', 'Complete', 'The order is complete', '2024-04-16 07:44:08'),
	(55, '004bf87c-d02f-43ac-852d-b8c93f942539', 'bc0acfd6-8ac7-45fe-9378-c743a22f1393', 'Order.Created', 'Created', 'Order created by the user', '2024-04-16 08:46:35'),
	(56, '4340ac8b-41d0-49fa-a408-b8e7b6fc2c7f', '05d6659e-9392-40d9-9f13-99a507ece273', 'Order.Created', 'Created', 'Order created by the user', '2024-04-16 08:47:03'),
	(57, '4562b8c5-d93e-4ed5-b350-976745ae4700', '05d6659e-9392-40d9-9f13-99a507ece273', 'Order.Accepted', 'Accepted', 'Order accepted by the merchant', '2024-04-16 08:47:42'),
	(58, '641ba4e6-226c-454d-8563-887e5c07ee67', '05d6659e-9392-40d9-9f13-99a507ece273', 'Order.Dispatched', 'Dispatched', 'Order dispatched by the merchant', '2024-04-16 08:47:58'),
	(59, '0cf49513-ac64-4b30-84e5-fa79e232858f', '05d6659e-9392-40d9-9f13-99a507ece273', 'Order.Delivered', 'Delivered', 'Order delivered to the customer', '2024-04-16 08:48:12'),
	(60, 'e83a4389-98a4-4e6c-93b8-d6218ae784a5', 'e2ee9ed8-e2a5-4f6b-b23f-8992ef2b8266', 'Order.Created', 'Created', 'Order created by the user', '2024-04-16 08:49:12'),
	(61, '0f21c324-34fe-47f5-8e13-56cd0241fa53', 'e2ee9ed8-e2a5-4f6b-b23f-8992ef2b8266', 'Order.Accepted', 'Accepted', 'Order accepted by the merchant', '2024-04-16 08:49:24'),
	(62, 'd5288108-cfda-49cd-a088-4eb3ba078fa9', 'e2ee9ed8-e2a5-4f6b-b23f-8992ef2b8266', 'Order.Dispatched', 'Dispatched', 'Order dispatched by the merchant', '2024-04-16 09:00:49'),
	(63, 'c76389e4-5bc3-47b9-bf38-4fb7ed071522', '6c9d6e0e-82f3-4adb-9d60-19cfaf2d51c7', 'Order.Created', 'Created', 'Order created by the user', '2024-04-16 09:04:08'),
	(64, 'edf0c684-8976-4ac7-ba65-163644732dd4', '6c9d6e0e-82f3-4adb-9d60-19cfaf2d51c7', 'Order.Accepted', 'Accepted', 'Order accepted by the merchant', '2024-04-16 09:04:25'),
	(65, 'ea913d58-320d-478e-a409-271c00076b11', '6c9d6e0e-82f3-4adb-9d60-19cfaf2d51c7', 'Order.Dispatched', 'Dispatched', 'Order dispatched by the merchant', '2024-04-16 09:04:35'),
	(66, 'cc39932c-06ff-4b00-8992-b8d319ef6e6f', '6c9d6e0e-82f3-4adb-9d60-19cfaf2d51c7', 'Order.Delivered', 'Delivered', 'Order delivered to the customer', '2024-04-16 09:04:44'),
	(67, '7d70e8e6-13f8-4541-91f8-b17d157b669d', '6c9d6e0e-82f3-4adb-9d60-19cfaf2d51c7', 'Order.ReturnDispatched', 'Dispatched', 'Order dispatched back by the customer', '2024-04-16 09:04:58'),
	(68, '4c6345fc-e01c-4001-bed4-dded83e39d10', '6c9d6e0e-82f3-4adb-9d60-19cfaf2d51c7', 'Order.Returned', 'Returned', 'Order returned by the customer', '2024-04-16 09:05:04'),
	(69, 'e7f5a9b8-f8c6-45c7-a733-cd8a78342c47', '6c9d6e0e-82f3-4adb-9d60-19cfaf2d51c7', 'Order.Complete', 'Complete', 'The order is complete', '2024-04-16 09:05:04');

-- Dumping structure for table itemrental.items
CREATE TABLE IF NOT EXISTS `items` (
  `id` uuid NOT NULL,
  `owner` uuid NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `images` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `tags` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `details` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.items: ~15 rows (approximately)
DELETE FROM `items`;
INSERT INTO `items` (`id`, `owner`, `name`, `description`, `category`, `images`, `tags`, `details`) VALUES
	('cfaba7fe-e9cf-4e8b-9ca8-0a4e9b4572e7', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'KOOD lens polalizer filter', '49mm polarizuojantis objektyvo filtras', 'lensfilter', '["974a2b9a-9908-41f0-b365-eeae4e50854a.jpg"]', NULL, '[{"Name":"type","Value":"Polarizing"}]'),
	('fcf53cdc-6f12-4356-879b-2def3d2d186d', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Toyota Yaris GR', 'Sportinis miesto automobilis', 'vehicles', '["67a4d060-690b-4166-a829-782fa494041f.jpg","2879c274-e59d-4782-a844-b74648e90237.jpg"]', NULL, '[{"Name":"type","Value":"Car"},{"Name":"fueltype","Value":"Gasoline"}]'),
	('62c42c49-b548-454e-9c46-4d4076b5dd78', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Tesla Model S', 'Tesla elektromobilis', 'vehicles', '["c309d7e9-c9fe-4dba-a61e-afa515c6af1f.jpg","431cbbe0-ad24-45a8-92fd-93f9c1a8199d.jpg"]', NULL, '[{"Name":"type","Value":"Car"},{"Name":"fueltype","Value":"EV"}]'),
	('7cbdf583-4b98-4bce-87fc-59585a7ae494', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'RODE PodMic', 'Studijos lygio mikrofonas', 'microphones', '["6150f019-123b-4564-bda1-71421431f271.jpg"]', NULL, '[{"Name":"type","Value":"Condenser"},{"Name":"model","Value":"PodMic"},{"Name":"connection","Value":"USB"}]'),
	('c6841033-4ab2-41c7-a155-61da6c42a7db', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'BMW F30', 'BMW trečios klasės benzininis automobilis', 'vehicles', '["331de3f9-77d6-425b-8418-47f7253f3918.jpeg"]', NULL, '[{"Name":"type","Value":"Car"},{"Name":"fueltype","Value":"Gasoline"}]'),
	('38442e05-7369-4747-ba10-73ee8d6f2ab6', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Sony A7S2', 'Pilno kardo fotoaparatas', 'cameras', '["fe98092f-cc84-4613-bb1e-6d1549df6fa5.jpg","3cc526ab-b236-4910-a85b-75c354401d91.png"]', NULL, '[{"Name":"mountType","Value":"Sony E-Mount"}]'),
	('46c5db9a-0e83-4052-83b3-76e656724a44', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Genesis Radium 600', 'Studijinis mikrofonas', 'microphones', '["c35d4863-e029-4d94-960f-a02d5d139827.jpg"]', NULL, '[{"Name":"type","Value":"Condenser"},{"Name":"model","Value":"Radium 600"},{"Name":"connection","Value":"USB"}]'),
	('700f1862-8a21-486e-bfa2-7d2f99564da9', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Žoliapjovė/traktoriukas', 'Naujas traktoriukas skirtas prižiūrėti vejai', 'other', '["9b40ffe1-37aa-43ec-bf43-9d52ccfb7446.jpg","7f8b2758-469e-458c-b170-de96a0243d3a.jpg","1e209e69-7616-4079-9a0f-1bd2926052c5.jpg"]', NULL, '[]'),
	('4ba8efe6-defd-480b-8ea9-81fc90c1cc80', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'asd', 'asd', 'phones', 'null', NULL, '[{"Name":"maker","Value":"samsung"},{"Name":"model","Value":"asd"}]'),
	('90c0992e-d736-4638-b292-a18c42d949c1', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Nikon D5100', 'Veidrodinis Nikon fotoaparatas', 'cameras', '["58895aea-9b1a-4603-bb31-a209efe84b23.jpg"]', NULL, '[{"Name":"mountType","Value":"Nikon mount"}]'),
	('e58af2d6-ad2c-4250-aa0e-af9a8d5a0885', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Elektrinė žolepjovė', 'Mažai naudota žolepjovė, veikianti įjungus į elektros tinklą', 'other', '["1fd76ae9-7c04-48f4-99f7-6a3035985692.jpg"]', NULL, '[]'),
	('af000421-55ac-433f-8524-d063e7c39d73', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'GARDEN priekaba', 'Prikabinama automobilinė priekaba', 'vehicles', '["05fc6c7f-97f6-4a43-b52c-1bfe9b903d2f.png"]', NULL, '[{"Name":"type","Value":"Trailer"}]'),
	('2cacbcdd-e5a9-4280-932e-d8485323dc16', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'BMW F30 Track Certified', 'Sportinis BMW automobilis skirtas žiedynėms lenktynėms atitinkantis reikiamus standartus', 'vehicles', '["3a6450a9-214f-48c4-85cd-c0a0ba4a136d.jpg"]', NULL, '[{"Name":"type","Value":"Car"},{"Name":"fueltype","Value":"Gasoline"}]'),
	('fe49778e-561e-4da8-b1e2-f3f0eefb2149', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'asd', 'asd', 'cameras', '["109ef986-6a19-4ca7-9688-6343703319a8.png"]', NULL, '[{"Name":"mountType","Value":"asd"}]'),
	('b9885038-af3d-4d2c-b818-f8fcad813341', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Audi S3', 'Aukštos klasės audi automobilis', 'vehicles', '["ca0ddecb-859a-4935-b433-59af4c0c83ce.jpg","adcf34dc-1353-4e4e-88dd-b0bb572e1d26.jpg"]', NULL, '[{"Name":"type","Value":"Car"},{"Name":"fueltype","Value":"Diesel"}]');

-- Dumping structure for table itemrental.notifications
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` uuid NOT NULL,
  `user` uuid NOT NULL,
  `code` varchar(50) NOT NULL,
  `title` text NOT NULL,
  `description` longtext DEFAULT NULL,
  `url` longtext DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  `read` tinyint(4) DEFAULT 0,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.notifications: ~0 rows (approximately)
DELETE FROM `notifications`;
INSERT INTO `notifications` (`id`, `user`, `code`, `title`, `description`, `url`, `timestamp`, `read`) VALUES
	('3629e96c-5b3c-42eb-9e4f-0e3f4d8d3e77', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Dispatched', 'Dispatched', 'Your order was dispatched', '/orders/e2ee9ed8-e2a5-4f6b-b23f-8992ef2b8266', '2024-04-16 09:00:49', 0),
	('04671a8a-a657-4b8d-9ba3-3622a28daba8', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Returned', 'Returned', 'Your order was returned', '/orders/6c9d6e0e-82f3-4adb-9d60-19cfaf2d51c7', '2024-04-16 09:05:04', 0),
	('72209bce-033c-474e-b3b2-36cbd0887b07', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Dispatched', 'Dispatched', 'Your order was dispatched', '/orders/6c9d6e0e-82f3-4adb-9d60-19cfaf2d51c7', '2024-04-16 09:04:35', 0),
	('ec10b14e-abd2-4aad-9eda-9d4534ce126c', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Delivered', 'Delivered', 'Your order was dispatched', '/orders/6c9d6e0e-82f3-4adb-9d60-19cfaf2d51c7', '2024-04-16 09:04:44', 0),
	('22055df3-9000-4d88-a103-bda09e7f5b7d', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Accepted', 'Accepted', 'Your order was accepted', '/orders/6c9d6e0e-82f3-4adb-9d60-19cfaf2d51c7', '2024-04-16 09:04:25', 0),
	('fd321b9b-6180-40d8-899b-c08e105c9e92', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Created', 'Created', 'Your order was created successfuly', '/orders/6c9d6e0e-82f3-4adb-9d60-19cfaf2d51c7', '2024-04-16 09:04:08', 0);

-- Dumping structure for table itemrental.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` uuid NOT NULL,
  `listing` uuid DEFAULT NULL,
  `user` uuid DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `deliveryType` int(11) DEFAULT NULL,
  `comment` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.orders: ~3 rows (approximately)
DELETE FROM `orders`;
INSERT INTO `orders` (`id`, `listing`, `user`, `startDate`, `endDate`, `status`, `deliveryType`, `comment`, `createdAt`) VALUES
	('6c9d6e0e-82f3-4adb-9d60-19cfaf2d51c7', '9802d975-8fe5-4523-aa15-2fcac5d1c85c', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', '2024-04-16', '2024-04-17', 5, 0, '', '2024-04-16 09:04:08'),
	('e2ee9ed8-e2a5-4f6b-b23f-8992ef2b8266', 'b8d19c9e-8d1b-4cec-b3cc-2c42cb76b4d2', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', '2024-04-27', '2024-04-28', 2, 1, 'Bus naudojamas gimtadienio fotosesijai', '2024-04-16 08:49:12'),
	('05d6659e-9392-40d9-9f13-99a507ece273', 'c7aa5214-552b-4fa1-8010-1cd753cf1c75', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', '2024-04-23', '2024-04-26', 3, 0, '', '2024-04-16 08:47:03'),
	('bc0acfd6-8ac7-45fe-9378-c743a22f1393', '63831671-381d-49d3-b01d-bb1d17839d7c', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', '2024-04-20', '2024-04-21', 0, 0, 'Skirtingomis dienomis bus kiti žmonės', '2024-04-16 08:46:35');

-- Dumping structure for table itemrental.profile_feedback
CREATE TABLE IF NOT EXISTS `profile_feedback` (
  `id` uuid NOT NULL,
  `user` uuid NOT NULL,
  `author` uuid NOT NULL,
  `rating` int(1) NOT NULL,
  `comment` longtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.profile_feedback: ~0 rows (approximately)
DELETE FROM `profile_feedback`;

-- Dumping structure for table itemrental.rent_listings
CREATE TABLE IF NOT EXISTS `rent_listings` (
  `id` uuid NOT NULL,
  `item` uuid DEFAULT NULL,
  `renter` uuid NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `price` decimal(20,6) NOT NULL,
  `location` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.rent_listings: ~4 rows (approximately)
DELETE FROM `rent_listings`;
INSERT INTO `rent_listings` (`id`, `item`, `renter`, `title`, `description`, `price`, `location`) VALUES
	('f09d8b6d-643a-485a-8ac9-46254569b9c1', '892e9dd3-cc05-45a8-9020-35cfcd9bd28e', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'What is lorem ipsum?', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 20.990000, 'Vilnius, Lithuania'),
	('b9853a20-47c8-47be-8925-68e8e893a0dd', 'ec0b4bc7-65d1-448b-8255-2de6d9b88727', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Phone rent', '', 5.000000, 'Kaunas, Vilnius'),
	('a69a75cb-435b-4e2d-a27d-af545100d73d', 'e58af2d6-ad2c-4250-aa0e-af9a8d5a0885', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Elektrinės žoliapjovės nuoma', 'Mažai naudota elektrinė žolepjovė paruošta naudojimui, neseniai atlikti priežiūros darbai, peilio ašmenys pagalasti.', 4.000000, 'Kaunas, Lithuania'),
	('205a4ff4-fcb3-4f69-8486-da3aade46168', '700f1862-8a21-486e-bfa2-7d2f99564da9', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Traktoriukas/žoliapjovė', 'Naujas traktoriukas puikiai tinkantis prižiūrėti veją.', 10.000000, 'Kaunas, Lithuania'),
	('63831671-381d-49d3-b01d-bb1d17839d7c', '2cacbcdd-e5a9-4280-932e-d8485323dc16', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Sportinis BMW F30', 'Žiedinėms lenktynėms pritaikytas automobilis kuris atitinka visus FIA standartus. Pilni saugos lankai, saugumo priemonės, panikos mygtukas išjungiantis visas automobilio sistemas. Automobilis pritaikytas kiekvienam norinčiam išbandyti save lenktynių trasoje. Nuoma atliekama Nemuno žiede. Viskas įskaičiuota', 100.000000, 'Nemuno žiedas, Kaunas, Lithuania'),
	('c7aa5214-552b-4fa1-8010-1cd753cf1c75', 'b9885038-af3d-4d2c-b818-f8fcad813341', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Audi S3 automobilis', 'Kasdieninis automobilis su patogumo komplektu, labai taupus, kasko draudimas, apsaugantis nuo visų nelaimių kelyje.', 20.000000, 'Vilnius, Lithuania'),
	('34f8625b-6525-4806-9363-9a5abe0dbe39', '38442e05-7369-4747-ba10-73ee8d6f2ab6', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Sony A7S2 fotoaparatas', 'Profesionalus pilno kadro fotoaparatas puikiai tinkantis bet kokiam filmavimui. Kartu su fotoaparatu duodamas Sony FE 35mm f/1.8 objektyvas su polarizuojančiu filtru.', 15.000000, 'Kaunas, Lithuania'),
	('b8d19c9e-8d1b-4cec-b3cc-2c42cb76b4d2', '90c0992e-d736-4638-b292-a18c42d949c1', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Nikon D5100 fotoaparatas', 'Veidrodinis fotoaparatas skirtas fotografijai, nedidelis kadrų skaičius, pridedamass 18-55mm f/3.5-5.6 objektyvas ir trys papildomos baterijos.', 10.000000, 'Kaunas, Lithuania'),
	('9802d975-8fe5-4523-aa15-2fcac5d1c85c', 'af000421-55ac-433f-8524-d063e7c39d73', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'GARDEN priekabos nuoma', 'Lengvasvoriams kroviniams skirta vežti priekaba, paruošta eksplotavimui, tinkamai veikianti elektros jungtis', 30.000000, 'Kaunas, Lithuania'),
	('1ed4d290-189f-4ecb-a0af-a84a7dee38c3', 'c6841033-4ab2-41c7-a155-61da6c42a7db', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'BMW F30 330i', 'Trečios klasės BMW automobilis su pilnu komforto komplektu. Turintis daug galios. Galiojantis kasko draudimas nuo visų nelaimių kelyje', 50.000000, 'Kaunas, Lithuania'),
	('f938c8eb-aa84-426b-b5e8-925561627282', '62c42c49-b548-454e-9c46-4d4076b5dd78', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Tesla Model S', 'Puikus elektromobilis važinėjimui mieste ir užmiestyje, su pilnu įkrovimu nuvažiuosite net iki 300 kilometrų! Pilnos komplektacijos autopilotas ir kitos saugumo priemonės', 40.000000, 'Kaunas, Lithuania'),
	('bae31fcb-76e7-43f7-9185-d1cf6f3e482e', '7cbdf583-4b98-4bce-87fc-59585a7ae494', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Studijinis mikrofonas', 'Mikrofonas puikiai tinkantis pokalbinių įrašams kurti. Audio mėgėjams. Pridedamas ir mikrofono laikiklis stalui', 5.000000, 'Kaunas, Lithuania'),
	('e0257641-e540-4eb6-a2d6-1f7517c02167', '46c5db9a-0e83-4052-83b3-76e656724a44', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Genesis Radium 600', 'Megėjiškas mikrofonas skirtas įvairaus pobūdžio įrašų kūrimui. Prie mikrofono pridedamas visas komplektas: pop filtras, transportavimo dėžė, stovas ir laikiklis', 4.000000, 'Kaunas, Lithuania'),
	('1cd0a3fc-f6cb-4337-baf4-56ad77ec0d1c', 'cfaba7fe-e9cf-4e8b-9ca8-0a4e9b4572e7', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Polarizuojantis filtras', '49mm dydžio polarizuojantis filtras tinkantis daugumai pilno kadro objektyvų', 2.000000, 'Kaunas, Lithuania');

-- Dumping structure for table itemrental.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` uuid NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.users: ~5 rows (approximately)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
	('13557b17-53e1-4da3-9da2-0496fd7c5474', 'rent', 'rent@itemrental.com', '$2a$10$hBSs1JwWG10LepzgcHdMVOp8X.6UI6Q6e2CAcS7//CCFEHsRTWYx.'),
	('1a58f19b-077f-4098-b412-28effb9e985b', 'test', 'test', '$2a$10$7TDI/mOR82pCwtL.wATSQeEqTtZk2lvCSKeKk6PGTaHwT7TQUx7.O'),
	('4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'user', 'user@itemrental.com', '$2a$10$K84SlOwBCYfOcYcb8Xxe/.WGdu/sCLztDVInrpTOY/KIkS7BSsRQm'),
	('8fe27bb1-091c-44e9-81d2-4c36aee488a2', 'debug', 'debug@itemrental.com', '$2a$10$su.tziG6VMm4Xns/.fVhKO5pNCUoI1akHiMPCBxLi/v4O8NOyhmia'),
	('44fa8ccc-69cf-45bd-bff2-7b8311e200d8', 'string', 'string', '$2a$10$o/Kfa1aTMKkTEX6V07P0zu2hnV2PqH9KH0bn5wwh7vpugf7t2ryUW'),
	('f1e6980c-9d5e-4f10-afd0-c1fe8461252f', 'postman', 'postman@itemrental.com', '$2a$10$Anlw9q0MH.MI.9t7MTflye0flbkGOwjbKBavc8ZQvRYIHyrDVHDey');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
