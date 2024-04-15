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
CREATE DATABASE IF NOT EXISTS `itemrental` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
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

-- Dumping data for table itemrental.categories: ~0 rows (approximately)
DELETE FROM `categories`;
INSERT INTO `categories` (`id`, `name`, `label`, `parent`, `scheme`) VALUES
	('1e3ebeba-c402-449f-8a69-0b431b87137c', 'other', 'Other', NULL, NULL),
	('a01cdedf-8b2d-4f60-9775-2949d4c930af', 'electronics', 'Electronics', NULL, NULL),
	('123341dd-1307-45f4-a6bf-9bf103e6149b', 'phones', 'Phones', 'electronics', '[{"type":"select","label":"Maker","name":"maker","options":["samsung", "lg"]},{"type":"string","name":"model","label":"Model"}]'),
	('72f123dd-1307-45f4-a6bf-9bf103e6149b', 'cameras', 'Cameras', 'photo', '[{"name":"mountType","type":"string","label":"Lens mount type"}]'),
	('94fea3dd-1307-45f4-a6bf-9bf103e6149b', 'computers', 'Computers', 'electronics', '[{"type":"number","min":"1","max":"10","name":"cores","label":"Cores"}]');

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

-- Dumping data for table itemrental.deliveries: ~5 rows (approximately)
DELETE FROM `deliveries`;
INSERT INTO `deliveries` (`id`, `order`, `type`, `role`, `location`, `shippingProvider`, `shippingId`, `comment`, `completed`) VALUES
	('d1aa1cc3-17d7-432f-9ed0-0a2d5f81809e', '53df4412-cdbd-4413-8d3d-6723d67488e6', 1, 1, NULL, '2', 'CE473405152EE', 'Pristatymas', 0),
	('feddfcc3-fbe4-4345-a1d9-18f5a029cdae', 'd8c62fc2-21a0-4588-8d9b-6db3b44d60a4', 0, 0, '789797', '2', 'CE473405152EE', NULL, 1),
	('765f3753-8446-4272-bc6b-2570bd2db8ea', '0b8e55db-ae77-43ab-b072-95a316c2f026', 1, 1, NULL, '2', 'CE473405152EE', NULL, 1),
	('72711c93-c437-4398-afd4-4bfc0afeb7c1', '1945b4a1-2911-43c6-bbac-dd25bd2a5cdb', 1, 1, NULL, '2', 'CE473405152EE', 'test', 0),
	('0a9fe6b6-9c51-46dd-88dc-99504b493be6', 'd8c62fc2-21a0-4588-8d9b-6db3b44d60a4', 0, 1, 'asd', '2', 'CE473405152EE', NULL, 1),
	('889a4140-9ca4-4a63-8aed-c5f01ee67662', 'a5735e6b-ec17-405a-8214-1024b6d488cb', 1, 1, NULL, '2', 'CE473405152EE', 'stest123', 0);

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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.eventlog: ~11 rows (approximately)
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
	(24, '73735572-387b-4fd7-b68b-84c36881e9a8', 'd8c62fc2-21a0-4588-8d9b-6db3b44d60a4', 'Order.Complete', 'Complete', 'The order is complete', '2024-04-12 09:15:02');

-- Dumping structure for table itemrental.items
CREATE TABLE IF NOT EXISTS `items` (
  `id` uuid NOT NULL,
  `owner` uuid NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `tags` longtext DEFAULT NULL,
  `details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.items: ~5 rows (approximately)
DELETE FROM `items`;
INSERT INTO `items` (`id`, `owner`, `name`, `description`, `category`, `images`, `tags`, `details`) VALUES
	('ec0b4bc7-65d1-448b-8255-2de6d9b88727', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Phone', 'A well used phone', 'phones', 'null', NULL, '[{"Name":"maker","Value":"samsung"},{"Name":"model","Value":"Galaxy S10"}]'),
	('892e9dd3-cc05-45a8-9020-35cfcd9bd28e', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Badge', 'Debug badge', 'other', '["e855b3c2-ae26-49e4-873a-2e33c245c6dd.jpg"]', NULL, '[]'),
	('4ba8efe6-defd-480b-8ea9-81fc90c1cc80', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'asd', 'asd', 'phones', 'null', NULL, '[{"Name":"maker","Value":"samsung"},{"Name":"model","Value":"asd"}]'),
	('8fe61dae-b5fb-48ad-9c6d-d131fa5959e6', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Sony A7S2', '', 'cameras', '', NULL, ''),
	('fe49778e-561e-4da8-b1e2-f3f0eefb2149', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'asd', 'asd', 'cameras', '["109ef986-6a19-4ca7-9688-6343703319a8.png"]', NULL, '[{"Name":"mountType","Value":"asd"}]');

-- Dumping structure for table itemrental.notifications
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` uuid NOT NULL,
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

-- Dumping structure for table itemrental.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` uuid NOT NULL,
  `listing` uuid DEFAULT NULL,
  `user` uuid DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `deliveryType` int(11) DEFAULT NULL,
  `comment` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.orders: ~2 rows (approximately)
DELETE FROM `orders`;
INSERT INTO `orders` (`id`, `listing`, `user`, `startDate`, `endDate`, `status`, `deliveryType`, `comment`) VALUES
	('d8c62fc2-21a0-4588-8d9b-6db3b44d60a4', 'f09d8b6d-643a-485a-8ac9-46254569b9c1', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', '2024-04-28 21:00:00', '2024-04-29 21:00:00', 5, 0, ''),
	('0b8e55db-ae77-43ab-b072-95a316c2f026', 'f09d8b6d-643a-485a-8ac9-46254569b9c1', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', '2024-04-22 21:00:00', '2024-04-24 21:00:00', 3, 1, '');

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
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(20,6) NOT NULL,
  `location` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.rent_listings: ~2 rows (approximately)
DELETE FROM `rent_listings`;
INSERT INTO `rent_listings` (`id`, `item`, `renter`, `title`, `description`, `price`, `location`) VALUES
	('f09d8b6d-643a-485a-8ac9-46254569b9c1', '892e9dd3-cc05-45a8-9020-35cfcd9bd28e', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'What is lorem ipsum?', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 20.990000, 'Vilnius, Lithuania'),
	('b9853a20-47c8-47be-8925-68e8e893a0dd', 'ec0b4bc7-65d1-448b-8255-2de6d9b88727', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Phone rent', '', 5.000000, 'Kaunas, Vilnius');

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
