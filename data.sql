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

-- Dumping data for table itemrental.categories: ~1 rows (approximately)
DELETE FROM `categories`;
INSERT INTO `categories` (`id`, `name`, `label`, `parent`, `scheme`) VALUES
	('1e3ebeba-c402-449f-8a69-0b431b87137c', 'other', 'Other', NULL, NULL),
	('123341dd-1307-45f4-a6bf-9bf103e6149b', 'phones', 'Phones', 'electronics', '[{"type":"select","label":"Maker","name":"maker","options":["samsung", "lg"]},{"type":"string","name":"model","label":"Model"}]'),
	('72f123dd-1307-45f4-a6bf-9bf103e6149b', 'cameras', 'Cameras', 'photo', '[{"name":"mountType","type":"string","label":"Lens mount type"}]'),
	('94fea3dd-1307-45f4-a6bf-9bf103e6149b', 'computers', 'Computers', 'electronics', '[{"type":"number","min":"1","max":"10","name":"cores","label":"Cores"}]');

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

-- Dumping data for table itemrental.items: ~4 rows (approximately)
DELETE FROM `items`;
INSERT INTO `items` (`id`, `owner`, `name`, `description`, `category`, `images`, `tags`, `details`) VALUES
	('892e9dd3-cc05-45a8-9020-35cfcd9bd28e', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Badge', 'Debug badge', 'other', '["e855b3c2-ae26-49e4-873a-2e33c245c6dd.jpg"]', NULL, '[]'),
	('4ba8efe6-defd-480b-8ea9-81fc90c1cc80', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'asd', 'asd', 'phones', 'null', NULL, '[{"Name":"maker","Value":"samsung"},{"Name":"model","Value":"asd"}]'),
	('8fe61dae-b5fb-48ad-9c6d-d131fa5959e6', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Sony A7S2', '', NULL, '', NULL, ''),
	('fe49778e-561e-4da8-b1e2-f3f0eefb2149', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'asd', 'asd', 'cameras', '["109ef986-6a19-4ca7-9688-6343703319a8.png"]', NULL, '[{"Name":"mountType","Value":"asd"}]');

-- Dumping structure for table itemrental.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` uuid NOT NULL,
  `listing` uuid DEFAULT NULL,
  `user` uuid DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.orders: ~7 rows (approximately)
DELETE FROM `orders`;
INSERT INTO `orders` (`id`, `listing`, `user`, `startDate`, `endDate`, `status`) VALUES
	('cc680e13-9ee2-418e-af47-0600a10af2ba', 'f09d8b6d-643a-485a-8ac9-46254569b9c1', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', '2024-03-26 22:00:00', '2024-03-27 22:00:00', 1),
	('47a43883-a305-460b-a698-2ba8cdd2c1e8', '656ace5f-b27d-4ea3-8dcc-9d9beb734087', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', '2024-03-26 22:00:00', '2024-03-27 22:00:00', 1),
	('f663614e-0d20-4347-8a3c-4572b5437b29', 'c646393c-9067-4793-a004-be8c79443259', 'b7e23fb6-9be5-4abd-9682-681a8cf2847f', '2024-02-29 22:00:00', '2024-03-07 22:00:00', 0),
	('c4994a84-047b-4429-a40a-4bd51d6ad992', 'c646393c-9067-4793-a004-be8c79443259', '8fe27bb1-091c-44e9-81d2-4c36aee488a2', '2024-02-29 22:00:00', '2024-03-07 22:00:00', 0),
	('46189591-c556-4017-a93c-7adf6853cbe0', 'c646393c-9067-4793-a004-be8c79443259', 'b7e23fb6-9be5-4abd-9682-681a8cf2847f', '2024-03-06 22:00:00', '2024-03-07 22:00:00', 0),
	('af813774-1f95-418e-b130-c55dd9e773a2', '656ace5f-b27d-4ea3-8dcc-9d9beb734087', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', '2024-03-28 22:00:00', '2024-03-29 22:00:00', 1),
	('3ab2cd7b-e985-4316-b9cc-e689116e6e3f', 'f09d8b6d-643a-485a-8ac9-46254569b9c1', '13557b17-53e1-4da3-9da2-0496fd7c5474', '2024-03-25 22:00:00', '2024-04-04 21:00:00', 0),
	('e60dce2b-4474-4ee3-bfbb-fa737da59ea5', 'c646393c-9067-4793-a004-be8c79443259', 'b7e23fb6-9be5-4abd-9682-681a8cf2847f', '2024-03-14 22:00:00', '2024-03-21 22:00:00', 0);

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
	('c646393c-9067-4793-a004-be8c79443259', 'd5805055-afc5-45c5-bda3-e366c0d45797', '44fa8ccc-69cf-45bd-bff2-7b8311e200d8', 'Debug rent listing', 'Well used mirror-less camera available for the rental! Renting along the 35mm Sony G-master lens', 19.990000, 'Kaunas, Lithuania'),
	('f09d8b6d-643a-485a-8ac9-46254569b9c1', '892e9dd3-cc05-45a8-9020-35cfcd9bd28e', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'What is lorem ipsum?', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 20.990000, 'Vilnius, Lithuania');

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
