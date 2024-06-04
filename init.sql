-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.3.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
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

-- Dumping structure for table itemrental.administrators
CREATE TABLE IF NOT EXISTS `administrators` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` uuid NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Dumping data for table itemrental.administrators: ~2 rows (approximately)
DELETE FROM `administrators`;
INSERT INTO `administrators` (`id`, `user`) VALUES
	(2, '13557b17-53e1-4da3-9da2-0496fd7c5474'),
	(1, '142eae84-432c-4a67-a92b-ece3fb36a109');

-- Dumping structure for table itemrental.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` uuid NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `label` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `parent` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `scheme` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.categories: ~23 rows (approximately)
DELETE FROM `categories`;
INSERT INTO `categories` (`id`, `name`, `label`, `parent`, `scheme`) VALUES
	('1e3ebeba-c402-449f-8a69-0b431b87137c', 'other', 'Kita', NULL, NULL),
	('18607d1a-fcee-432d-a848-110c3ba5fcf8', 'dviraciai', 'Dviračiai', 'sports', NULL),
	('178b77c6-aede-4277-b120-14ad421377e8', 'konsoles', 'Žaidimų konsolės', 'electronics', NULL),
	('75f1f33a-941e-431a-8f4b-15ceb69a589c', 'irankiai', 'Įrankiai', NULL, NULL),
	('93a0387d-4687-442b-92bf-182626764a31', 'optikosfiltrai', 'Objektyvų filtrai', 'video', '[{"type":"string","label":"Tipas","name":"type"}]'),
	('a01cdedf-8b2d-4f60-9775-2949d4c930af', 'elektronika', 'Elektronika', NULL, NULL),
	('9b73883b-fc3a-48de-b4ec-461d2d5dea1b', 'video', 'Video', NULL, ''),
	('e6f4a840-066d-48cc-bf75-4a48a428c5fc', 'auto', 'Auto', NULL, '[{"type":"select","label":"Tipas","name":"type","options":["Automobilis", "Priekaba","Sunkvežemis","Motociklas"]},{"type":"select","label":"Kuro tipas","name":"fueltype","options":["Dyzelis", "Benzinas","EV"]}]'),
	('f61f71e2-9825-496c-b987-5be6e338b50f', 'garsoiranga', 'Audio', NULL, NULL),
	('994853a5-f05f-4781-8a15-6029c011daef', 'stovai', 'Stovai', 'foto', NULL),
	('a484bcc1-e341-4ed4-9c71-63369d0da8ce', 'foto', 'Foto', NULL, NULL),
	('e73e8392-fe00-43d1-b156-6618e7ba8e04', 'postman', 'postman', 'postman', NULL),
	('ee491fb0-1cb8-4447-be5e-8bfb4eaf1329', 'sportas', 'Sportas', NULL, NULL),
	('33f81811-8582-4879-8106-9b8e8c190cdc', 'mikrofonai', 'Mikrofonai', 'audio', '[{"type":"select","label":"Tipas","name":"type","options":["Dinaminis", "Kondensatorinis"]},{"type":"string","name":"model","label":"Modelis"},{"type":"select","label":"Lizdas","name":"connection","options":["USB", "XLR"]}]'),
	('123341dd-1307-45f4-a6bf-9bf103e6149b', 'telefonai', 'Telefonai', 'electronics', '[{"type":"select","label":"Gamintojas","name":"maker","options":["Samsung", "LG", "Xiaomi", "Apple", "Oppo", "HTC", "Poco"]},{"type":"string","name":"model","label":"Modelis"}]'),
	('72f123dd-1307-45f4-a6bf-9bf103e6149b', 'kameros', 'Fotoaparatai', 'video', '[{"name":"mountType","type":"string","label":"Optikos tvirtinimo tipas"}]'),
	('94fea3dd-1307-45f4-a6bf-9bf103e6149b', 'kompiuteriai', 'Kompiuteriai', 'electronics', '[{"type":"number","min":"1","max":"10","name":"cores","label":"Procesoriaus Branduoliai"}]'),
	('71f9fdee-1809-43c7-8d23-9ddc9c96ba49', 'moto', 'Moto', 'auto', NULL),
	('fb55d6cc-d5c2-47d2-b8fa-9e7415068d31', 'optika', 'Objektyvai', 'video', '[{"type":"string","label":"Tvirtinimo tipas","name":"mounttype"},{"type":"string","name":"focallength","label":"Židinio nuotolis"},{"type":"string","label":"Diafragma","name":"apperture"}]'),
	('1e5046cd-0412-4b07-b537-bc25597c6f1f', 'pjūklai', 'Pjūklai', 'tools', NULL),
	('9b66471a-5b52-4dc3-b6bc-dc37b80d6f0e', 'apšvietimas', 'Lempos', 'foto', NULL),
	('8f5051ae-8d77-42dd-959e-f001aa8e94b4', 'drills', 'Grąžtai', 'tools', NULL),
	('02c02bf8-5610-4b8e-bfbb-fbf5845ee3a1', 'apsauga', 'Apsaugos', 'sports', NULL);

-- Dumping structure for table itemrental.comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` uuid NOT NULL,
  `resource` uuid NOT NULL,
  `user` uuid NOT NULL,
  `text` longtext NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Dumping data for table itemrental.comments: ~3 rows (approximately)
DELETE FROM `comments`;
INSERT INTO `comments` (`id`, `resource`, `user`, `text`, `createdAt`) VALUES
	('31898720-015a-4bb8-a0a8-dd195cb91125', '63831671-381d-49d3-b01d-bb1d17839d7c', 'd49ec1b3-fec0-4532-a17c-50376245f15c', 'Nuostabi patirtis! Išsinuomojau šį sportinį BMW F30 savaitgaliui, kad išbandyčiau save lenktynių trasoje. Automobilis puikiai paruoštas ir atitinka visus FIA standartus, kas suteikia tikrą lenktynių jausmą. Saugumo priemonės, kaip pilni saugos lankai ir panikos mygtukas, suteikė papildomą ramybę. Tikrai rekomenduoju visiems automobilių sporto mėgėjams!', '2024-05-12 17:04:13'),
	('dab62f3e-c1df-4d98-a288-782a3f3db2b4', '63831671-381d-49d3-b01d-bb1d17839d7c', '59e8d978-da4b-470b-9beb-6bbcc70ac5fb', 'Super automobilis! BMW F30 buvo tiesiog tobulas pasirinkimas Nemuno žiedo lenktynėms. Važiavimas buvo sklandus ir saugus, nes automobilis turi visas reikiamas saugumo priemones. Patiko, kad viskas buvo įskaičiuota, todėl nereikėjo jaudintis dėl papildomų mokesčių. Puiki patirtis už labai prieinamą kainą – tik 100€ per dieną.', '2024-05-26 09:05:12'),
	('c5fe2bfb-5a9e-4e57-bbbf-28bb09db15e0', '63831671-381d-49d3-b01d-bb1d17839d7c', 'e03a8d2c-6399-4686-958c-14caef3d1519', 'Puikus pasirinkimas adrenalino mėgėjams! Šis BMW F30 yra ne tik galingas, bet ir saugus – pilni saugos lankai ir kitos saugumo priemonės leidžia jaustis užtikrintai trasoje. Be to, automobilis pritaikytas lenktynėms ir visiškai atitinka FIA standartus. Kaina taip pat labai patraukli, 100€ už dieną yra puikus pasiūlymas. Neabejotinai verta išbandyti!', '2024-06-01 17:09:35');

-- Dumping structure for table itemrental.deliveries
CREATE TABLE IF NOT EXISTS `deliveries` (
  `id` uuid NOT NULL,
  `order` varchar(50) NOT NULL DEFAULT '',
  `type` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `location` text DEFAULT NULL,
  `shippingProvider` varchar(50) DEFAULT NULL,
  `shippingId` varchar(50) DEFAULT NULL,
  `comment` longtext DEFAULT NULL,
  `completed` int(11) DEFAULT 0,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.deliveries: ~2 rows (approximately)
DELETE FROM `deliveries`;
INSERT INTO `deliveries` (`id`, `order`, `type`, `role`, `location`, `shippingProvider`, `shippingId`, `comment`, `completed`) VALUES
	('6d493de7-ef44-453e-b7c0-0f25c349207c', 'FOTOFOTO-3', 0, 1, 'Kaunas', '2', 'CE473405152EE', NULL, 0),
	('c3338a0c-b0bc-42f2-8615-461504a72ab8', 'FOTOFOTO-2', 0, 1, 'Kaunas', '2', 'CE473405152EE', NULL, 1),
	('59a99574-bf51-4bf4-90e5-730407a2dd99', 'FOTOFOTO-1', 0, 1, 'Baršausko g. 60, Kaunas', '2', 'CE473405152EE', NULL, 1),
	('ff2aa2b9-9aaf-452d-8cc9-8e946aebc74c', 'FOTOFOTO-1', 0, 0, 'Kaunas, Lithuania', '2', 'CE473405152EE', NULL, 1),
	('9c86419c-5c9d-4807-b750-8f6023cf21c8', 'FOTOFOTO-2', 0, 0, 'Kaunas', '2', 'CE473405152EE', NULL, 0),
	('3cbcc0e5-34f2-47c6-8c95-fa9e9aef7713', 'FOTOFOTO-4', 0, 1, 'Kaunas', '2', 'CE473405152EE', NULL, 1);

-- Dumping structure for table itemrental.eventlog
CREATE TABLE IF NOT EXISTS `eventlog` (
  `rowId` int(11) NOT NULL AUTO_INCREMENT,
  `id` uuid NOT NULL,
  `resource` varchar(50) NOT NULL DEFAULT '',
  `eventName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `description` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`rowId`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.eventlog: ~0 rows (approximately)
DELETE FROM `eventlog`;
INSERT INTO `eventlog` (`rowId`, `id`, `resource`, `eventName`, `title`, `description`, `timestamp`) VALUES
	(119, 'ae711202-f07b-4231-b976-cf308a2b9c9e', 'FOTOFOTO-1', 'Order.Created', 'Rezervacija sukurta', 'Rezervacija sėkmingai sukurta', '2024-06-04 19:59:17'),
	(120, '9e9bcda9-33cc-4e3e-aa50-3e998e566aae', 'FOTOFOTO-1', 'Order.Accepted', 'Revzervacija patvirtinta', 'Rezervacija sėkmingai patvirtinta prekybininko', '2024-06-04 20:23:18'),
	(121, 'e5810082-fbf8-4d4f-b84f-a7de9ea4d230', 'FOTOFOTO-1', 'Order.Dispatched', 'Užsakymas išsiųstas', 'Užsakymas išsiųstas prekybininko', '2024-06-04 20:23:43'),
	(122, '52d2738c-edc2-4ef0-933c-f0294f7b7327', 'FOTOFOTO-1', 'Order.Delivered', 'Užsakymas pristatytas', 'Užsakymas pristatytas klientui', '2024-06-04 20:31:12'),
	(123, '5cdddd1a-c68c-4ecc-811a-aca3a210f113', 'FOTOFOTO-1', 'Order.ReturnDispatched', 'Užsakymas grąžinamas', 'Užsakymas išsiųstas atgal', '2024-06-04 20:32:16'),
	(124, 'df435c08-0f11-43e5-812d-b7e47e0baee3', 'FOTOFOTO-1', 'Order.Returned', 'Užsakymas grąžintas', 'Užsakymas sėkmingai grąžintas', '2024-06-04 20:32:27'),
	(125, '3b190d17-7009-4146-9e63-bdce882831d2', 'FOTOFOTO-1', 'Order.Complete', 'Užsakymas baigtas', 'Nuoma sėkmingai įvykdyta', '2024-06-04 20:32:27'),
	(126, '6452b716-eda0-421c-82af-7bf4cdad7625', 'MATAS-1', 'Order.Created', 'Rezervacija sukurta', 'Rezervacija sėkmingai sukurta', '2024-06-04 20:47:47'),
	(127, '6367ba69-1240-4d93-8642-6f6b29fab552', 'MATAS-2', 'Order.Created', 'Rezervacija sukurta', 'Rezervacija sėkmingai sukurta', '2024-06-04 20:48:09'),
	(128, '3c61247e-06e5-4352-8b5a-6ab56b4e2126', 'FOTOFOTO-2', 'Order.Created', 'Rezervacija sukurta', 'Rezervacija sėkmingai sukurta', '2024-06-04 20:48:23'),
	(129, 'c4eeb0bf-9498-4630-b165-230ef84f910c', 'FOTOFOTO-3', 'Order.Created', 'Rezervacija sukurta', 'Rezervacija sėkmingai sukurta', '2024-06-04 20:48:33'),
	(130, 'c3893d6d-7849-421c-9343-4f32184d1036', 'FOTOFOTO-4', 'Order.Created', 'Rezervacija sukurta', 'Rezervacija sėkmingai sukurta', '2024-06-04 20:48:46'),
	(131, '677ce646-f65d-45a4-8eb9-44985006bddb', 'FOTOFOTO-3', 'Order.Accepted', 'Revzervacija patvirtinta', 'Rezervacija sėkmingai patvirtinta prekybininko', '2024-06-04 20:50:26'),
	(132, '2d68be53-1205-47e6-928f-fe75148478ca', 'FOTOFOTO-3', 'Order.Dispatched', 'Užsakymas išsiųstas', 'Užsakymas išsiųstas prekybininko', '2024-06-04 20:50:32'),
	(133, '6fe340fb-e240-496a-9964-98a962b56ff2', 'FOTOFOTO-4', 'Order.Accepted', 'Revzervacija patvirtinta', 'Rezervacija sėkmingai patvirtinta prekybininko', '2024-06-04 20:50:43'),
	(134, '5a67354d-f3cc-490f-b180-b51f59e1ba80', 'FOTOFOTO-4', 'Order.Dispatched', 'Užsakymas išsiųstas', 'Užsakymas išsiųstas prekybininko', '2024-06-04 20:50:52'),
	(135, '75df2722-554c-4252-9a8e-3a37fc595bbe', 'FOTOFOTO-4', 'Order.Delivered', 'Užsakymas pristatytas', 'Užsakymas pristatytas klientui', '2024-06-04 20:51:00'),
	(136, 'cf49c602-f577-4073-93a5-b20116c10edf', 'FOTOFOTO-2', 'Order.Accepted', 'Revzervacija patvirtinta', 'Rezervacija sėkmingai patvirtinta prekybininko', '2024-06-04 20:51:31'),
	(137, '3510e697-c959-4ae3-9cc8-77e013c1d5a7', 'FOTOFOTO-2', 'Order.Dispatched', 'Užsakymas išsiųstas', 'Užsakymas išsiųstas prekybininko', '2024-06-04 20:51:37'),
	(138, '12b5d573-269c-4899-bc31-e941d8d832f9', 'FOTOFOTO-2', 'Order.Delivered', 'Užsakymas pristatytas', 'Užsakymas pristatytas klientui', '2024-06-04 20:51:47'),
	(139, '5214ac32-6c70-4516-8a26-9c85567b2df4', 'FOTOFOTO-2', 'Order.ReturnDispatched', 'Užsakymas grąžinamas', 'Užsakymas išsiųstas atgal', '2024-06-04 20:51:54'),
	(140, '26ab0f51-0f81-43d1-98f0-3c22a22aa6f2', 'MATAS-3', 'Order.Created', 'Rezervacija sukurta', 'Rezervacija sėkmingai sukurta', '2024-06-04 20:52:39'),
	(141, '269a5f72-540c-49f9-9e2e-3fd2e0dd2086', 'MATAS-4', 'Order.Created', 'Rezervacija sukurta', 'Rezervacija sėkmingai sukurta', '2024-06-04 20:52:57'),
	(142, '72b1c16f-65e9-4ddb-99f1-7d16737c4009', 'MATAS-5', 'Order.Created', 'Rezervacija sukurta', 'Rezervacija sėkmingai sukurta', '2024-06-04 20:53:04'),
	(143, '043bfd83-8922-487c-addf-bae25d175362', 'MATAS-6', 'Order.Created', 'Rezervacija sukurta', 'Rezervacija sėkmingai sukurta', '2024-06-04 20:53:11'),
	(144, '23b2428d-f5e8-4c47-991f-5e41a07901ba', 'FOTOFOTO-5', 'Order.Created', 'Rezervacija sukurta', 'Rezervacija sėkmingai sukurta', '2024-06-04 20:53:55');

-- Dumping structure for table itemrental.inventory_links
CREATE TABLE IF NOT EXISTS `inventory_links` (
  `id` uuid NOT NULL,
  `user` uuid NOT NULL,
  `expiresAt` datetime NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Dumping data for table itemrental.inventory_links: ~0 rows (approximately)
DELETE FROM `inventory_links`;

-- Dumping structure for table itemrental.items
CREATE TABLE IF NOT EXISTS `items` (
  `id` uuid NOT NULL,
  `serialNumber` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `owner` uuid NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `images` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `tags` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '[]',
  `details` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `deleted` tinyint(4) DEFAULT 0,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.items: ~28 rows (approximately)
DELETE FROM `items`;
INSERT INTO `items` (`id`, `serialNumber`, `owner`, `name`, `description`, `category`, `images`, `tags`, `details`, `deleted`) VALUES
	('a5140a5e-a8cf-4760-8d95-0562bb9b0589', '', '59e8d978-da4b-470b-9beb-6bbcc70ac5fb', 'Playstation 3', 'Originali playstation 3 konsolė su visu kompletu', 'konsoles', '["1ec6840c-46b6-4601-a9c4-fec02fe3cb2a.jpg"]', '["playstation","PS","games"]', '[]', 0),
	('5aab285b-6da4-4d4a-b5fe-074c45a8b891', '', '6630ef8d-fd45-4da8-9b29-32c6f7ea4638', 'Sony FX30 Body', 'Profesionali Sony filmavimo kamera', 'foto', '["1f30e3a7-6918-45e9-a99d-a4f103d5c88d.jpg"]', '["Sony","FX30","Cinema"]', '[]', 0),
	('cfaba7fe-e9cf-4e8b-9ca8-0a4e9b4572e7', NULL, '13557b17-53e1-4da3-9da2-0496fd7c5474', 'KOOD lens polalizer filter', '49mm polarizuojantis objektyvo filtras', 'optikosfiltrai', '["974a2b9a-9908-41f0-b365-eeae4e50854a.jpg"]', '', '[{"Name":"type","Value":"Polarizing"}]', 0),
	('2aff7031-b16c-4f86-906d-0d8d7d1946ba', '', '6630ef8d-fd45-4da8-9b29-32c6f7ea4638', 'Sony a6400 + Sony 18-135/f3.5-5.6', 'Sony sisteminis fotoaparatas su objektyvu', 'foto', '["3bcb7055-329f-4d9e-9bbb-c30daf434a03.jpg","75513b2d-e58a-40a9-a022-4297a5bddf80.jpg"]', '["Sony","a6400","Mirroless","Bundle"]', '[]', 0),
	('5e51f0a8-e519-4b73-860d-2c77210e3d55', '', '59e8d978-da4b-470b-9beb-6bbcc70ac5fb', 'Playstation 2', 'Originali playstation žaidimų konsolė', 'kita', '["eaf7b767-29bd-4fc3-9528-3433f4b4a6cf.jpg","00941ce7-640f-4ed7-b248-972cf7329141.png"]', '["playstation","PS","games"]', '[]', 0),
	('fcf53cdc-6f12-4356-879b-2def3d2d186d', NULL, '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Toyota Yaris GR', 'Sportinis miesto automobilis', 'auto', '["67a4d060-690b-4166-a829-782fa494041f.jpg","2879c274-e59d-4782-a844-b74648e90237.jpg"]', NULL, '[{"Name":"type","Value":"Car"},{"Name":"fueltype","Value":"Gasoline"}]', 0),
	('ecb401ce-8fcf-404f-841e-3c20e3f50350', '', '6630ef8d-fd45-4da8-9b29-32c6f7ea4638', 'Canon 550d', 'Canon veidrodinis fotoaparatas', 'foto', '["1140dd3a-5066-4ab5-b487-903c45258e05.jpg"]', '["Canon","550d","Foto","DSLR"]', '[]', 0),
	('55082151-1b43-4451-981d-4b3477b75793', '', '6630ef8d-fd45-4da8-9b29-32c6f7ea4638', 'Sony HXR-MC2500', 'Sony filmavimo kamera', 'foto', '["fb316c0d-c755-43e7-ba56-4698edc63588.jpeg"]', '["Sony","HDCAM","VIDEO","HXR-MC2500"]', '[]', 0),
	('62c42c49-b548-454e-9c46-4d4076b5dd78', NULL, '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Tesla Model S', 'Tesla elektromobilis', 'auto', '["c309d7e9-c9fe-4dba-a61e-afa515c6af1f.jpg","431cbbe0-ad24-45a8-92fd-93f9c1a8199d.jpg"]', NULL, '[{"Name":"type","Value":"Car"},{"Name":"fueltype","Value":"EV"}]', 0),
	('7cbdf583-4b98-4bce-87fc-59585a7ae494', NULL, '13557b17-53e1-4da3-9da2-0496fd7c5474', 'RODE PodMic', 'Studijos lygio mikrofonas', 'mikrofonai', '["6150f019-123b-4564-bda1-71421431f271.jpg"]', '', '[{"Name":"type","Value":"Condenser"},{"Name":"model","Value":"PodMic"},{"Name":"connection","Value":"USB"}]', 0),
	('c6841033-4ab2-41c7-a155-61da6c42a7db', NULL, '13557b17-53e1-4da3-9da2-0496fd7c5474', 'BMW F30', 'BMW trečios klasės benzininis automobilis', 'auto', '["331de3f9-77d6-425b-8418-47f7253f3918.jpeg"]', '', '[{"Name":"type","Value":"Car"},{"Name":"fueltype","Value":"Gasoline"}]', 0),
	('38442e05-7369-4747-ba10-73ee8d6f2ab6', NULL, '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Sony A7S2', 'Pilno kardo fotoaparatas', 'kameros', '["fe98092f-cc84-4613-bb1e-6d1549df6fa5.jpg","3cc526ab-b236-4910-a85b-75c354401d91.png"]', '', '[{"Name":"mountType","Value":"Sony E-Mount"}]', 0),
	('46c5db9a-0e83-4052-83b3-76e656724a44', NULL, '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Genesis Radium 600', 'Studijinis mikrofonas', 'kita', '["c35d4863-e029-4d94-960f-a02d5d139827.jpg"]', '', '[{"Name":"type","Value":"Condenser"},{"Name":"model","Value":"Radium 600"},{"Name":"connection","Value":"USB"}]', 0),
	('700f1862-8a21-486e-bfa2-7d2f99564da9', NULL, '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Žoliapjovė/traktoriukas', 'Naujas traktoriukas skirtas prižiūrėti vejai', 'kita', '["9b40ffe1-37aa-43ec-bf43-9d52ccfb7446.jpg","7f8b2758-469e-458c-b170-de96a0243d3a.jpg","1e209e69-7616-4079-9a0f-1bd2926052c5.jpg"]', '', '[]', 0),
	('4ba8efe6-defd-480b-8ea9-81fc90c1cc80', NULL, '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'asd', 'asd', 'telefonai', 'null', '', '[{"Name":"maker","Value":"samsung"},{"Name":"model","Value":"asd"}]', 0),
	('0f6c4d55-7bb9-4455-8595-84691606635a', '', '59e8d978-da4b-470b-9beb-6bbcc70ac5fb', 'Playstation1', 'Originali retro žaidimų konsolė', 'kita', '["61fe44ac-f279-4c76-8fba-a6677109d005.jpg"]', '["playstation","PS","games"]', '[]', 0),
	('74010154-b180-411e-9420-9fbf7c04d49c', '', '59e8d978-da4b-470b-9beb-6bbcc70ac5fb', 'Playstation 5', 'Originali playstation 5 konsolė su visu kompletu', 'kita', '["818fbc66-48ea-4bef-9e3b-2b6d124d0e35.jpg","ee73cc44-e773-4060-a9d2-d37d1d04bb9b.jpg"]', '["playstation","PS","games"]', '[]', 0),
	('90c0992e-d736-4638-b292-a18c42d949c1', NULL, '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Nikon D5100', 'Veidrodinis Nikon fotoaparatas', 'kameros', '["58895aea-9b1a-4603-bb31-a209efe84b23.jpg"]', '', '[{"Name":"mountType","Value":"Nikon mount"}]', 0),
	('c7700ff4-29b1-42e3-bf05-af8bab66b533', '', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Demonstracinis daiktas', 'Demonstracinis aprašymas', 'other', 'null', '["Demonstracija","Naujas"]', '[]', 1),
	('e58af2d6-ad2c-4250-aa0e-af9a8d5a0885', NULL, '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Elektrinė žolepjovė', 'Mažai naudota žolepjovė, veikianti įjungus į elektros tinklą', 'kita', '["1fd76ae9-7c04-48f4-99f7-6a3035985692.jpg"]', '', '[]', 0),
	('af000421-55ac-433f-8524-d063e7c39d73', NULL, '13557b17-53e1-4da3-9da2-0496fd7c5474', 'GARDEN priekaba', 'Prikabinama automobilinė priekaba', 'auto', '["05fc6c7f-97f6-4a43-b52c-1bfe9b903d2f.png"]', '', '[{"Name":"type","Value":"Trailer"}]', 0),
	('9099dece-eaf2-4609-a229-d6cdb6cfb895', '', '6630ef8d-fd45-4da8-9b29-32c6f7ea4638', 'Canon 70D', 'Canon veidrodinis fotoaparatas', 'foto', '["9d57833d-05b6-4741-97dc-fda50d10eb88.jpg"]', '["Foto","Canon","70D","DSLR"]', '[]', 0),
	('2cacbcdd-e5a9-4280-932e-d8485323dc16', NULL, '13557b17-53e1-4da3-9da2-0496fd7c5474', 'BMW F30 Track Certified', 'Sportinis BMW automobilis skirtas žiedynėms lenktynėms atitinkantis reikiamus standartus', 'auto', '["vairuok-lenktynini-vt3-klases-bmw-f30-nemuno-ziede.jpg"]', '["vehicle","sports","bmw"]', '[{"Name":"type","Value":"Car"},{"Name":"fueltype","Value":"Gasoline"}]', 0),
	('5797ddd0-6ebd-42a0-8307-e00da61d9a3d', '', '6630ef8d-fd45-4da8-9b29-32c6f7ea4638', 'Sony FX30 + Sony 24-70/f4', 'Sony cinema kamera su objektyvu', 'video', '["b6bdfe94-b084-4201-a5f4-1bf6e3a175d0.jpg"]', '["Sony","FX30","Cinema","Lens","Bundle"]', '[]', 0),
	('c4efea99-0a84-4045-88f6-e276d376b61f', '', '6630ef8d-fd45-4da8-9b29-32c6f7ea4638', 'BMPCC 4k', 'Blackmagic cinema kamera', 'video', '["f34cbda0-47e6-469e-b7da-1269c8fb6180.jpg","c07d7b0f-7209-4f1f-b51f-79752a96aa5a.jpg"]', '["Blackmagic","Cinema","4K","BMPCC"]', '[]', 0),
	('fe49778e-561e-4da8-b1e2-f3f0eefb2149', NULL, '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'asd', 'asd', 'kameros', '["109ef986-6a19-4ca7-9688-6343703319a8.png"]', '', '[{"Name":"mountType","Value":"asd"}]', 0),
	('9ac4ca1c-8017-4297-9edd-f8b2adca5858', '', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Demonstracinis daiktas', 'Demonstracinis aprašymas', 'auto', 'null', '["Demonstracija","Naujas"]', '[{"Label":"Type","Name":"type","Value":"Car"},{"Label":"Fuel type","Name":"fueltype","Value":"Diesel"}]', 0),
	('b9885038-af3d-4d2c-b818-f8fcad813341', NULL, '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Audi S3', 'Aukštos klasės audi automobilis', 'auto', '["ca0ddecb-859a-4935-b433-59af4c0c83ce.jpg","adcf34dc-1353-4e4e-88dd-b0bb572e1d26.jpg"]', '', '[{"Name":"type","Value":"Car"},{"Name":"fueltype","Value":"Diesel"}]', 0);

-- Dumping structure for table itemrental.messages
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resource` varchar(50) NOT NULL DEFAULT '',
  `author` uuid NOT NULL,
  `text` longtext NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Dumping data for table itemrental.messages: ~0 rows (approximately)
DELETE FROM `messages`;
INSERT INTO `messages` (`id`, `resource`, `author`, `text`, `created`) VALUES
	(6, 'FOTOFOTO-1', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Sveiki', '2024-06-04 17:32:51'),
	(7, 'FOTOFOTO-1', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Ar būtų galima atsiimti 12:00?', '2024-06-04 17:33:12'),
	(8, 'FOTOFOTO-1', '6630ef8d-fd45-4da8-9b29-32c6f7ea4638', 'Taip, adresą nurodysiu kuriuo galite atvykti jūsų nurodytu laiku', '2024-06-04 17:33:37');

-- Dumping structure for table itemrental.notifications
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` uuid NOT NULL,
  `user` uuid NOT NULL,
  `code` varchar(50) NOT NULL,
  `title` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `description` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `url` longtext DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  `read` tinyint(4) DEFAULT 0,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.notifications: ~0 rows (approximately)
DELETE FROM `notifications`;
INSERT INTO `notifications` (`id`, `user`, `code`, `title`, `description`, `url`, `timestamp`, `read`) VALUES
	('c57504db-e597-437e-b4b7-1534a4756ca6', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Returned', 'Užsąkymas Grąžintas', 'Jūsų užsakymas buvo grąžintas', '/orders/FOTOFOTO-1', '2024-06-04 20:32:27', 0),
	('4ce7ea9b-9750-4fa4-b29a-2093028ce9db', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Accepted', 'Rezervacija patvirtinta', 'Jūsų užsakymas buvo patvirtinta', '/orders/FOTOFOTO-1', '2024-06-04 20:23:18', 0),
	('4e544ddf-18ff-4977-8284-4848eb04d837', 'e03a8d2c-6399-4686-958c-14caef3d1519', 'Order.Created', 'Rezervacija sukurta', 'Jūsų rezervacija buvo sėkmingai sukurta', '/orders/MATAS-5', '2024-06-04 20:53:04', 0),
	('628f4120-2b98-4c49-8e60-48eac5b79ef6', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Created', 'Rezervacija sukurta', 'Jūsų rezervacija buvo sėkmingai sukurta', '/orders/FOTOFOTO-2', '2024-06-04 20:48:23', 0),
	('c97a1d38-7bf2-4bce-a2f9-4f07ad9eed48', 'e03a8d2c-6399-4686-958c-14caef3d1519', 'Order.Created', 'Rezervacija sukurta', 'Jūsų rezervacija buvo sėkmingai sukurta', '/orders/MATAS-4', '2024-06-04 20:52:57', 0),
	('25eb7d20-b988-44ef-95c5-5c979f789b54', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Created', 'Rezervacija sukurta', 'Jūsų rezervacija buvo sėkmingai sukurta', '/orders/FOTOFOTO-4', '2024-06-04 20:48:46', 0),
	('be4021c2-8e48-45f5-bd5a-6b98708c1f29', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Delivered', 'Užsakymas pristatytas', 'Jūsų užsakymas buvo pristatytas', '/orders/FOTOFOTO-1', '2024-06-04 20:31:12', 0),
	('7a574cab-496f-424e-9cc9-70619c7cfd93', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Delivered', 'Užsakymas pristatytas', 'Jūsų užsakymas buvo pristatytas', '/orders/FOTOFOTO-4', '2024-06-04 20:51:00', 0),
	('81432dee-a46a-4914-a45d-8a6c5544c3c6', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Dispatched', 'Užsakymas išsiųstas', 'Jūsų užsakymas buvo išsiųstas', '/orders/FOTOFOTO-4', '2024-06-04 20:50:52', 0),
	('ce6e02a8-1ecf-4428-860b-90008d82ea1c', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Completed', 'Užsakymas baigtas', 'Jūsų užsakymas buvo sėkmingai užbaigtas', '/orders/FOTOFOTO-1', '2024-06-04 20:32:27', 0),
	('c9f3dbe5-225d-41cb-ba63-98006e90d898', 'e03a8d2c-6399-4686-958c-14caef3d1519', 'Order.Created', 'Rezervacija sukurta', 'Jūsų rezervacija buvo sėkmingai sukurta', '/orders/MATAS-6', '2024-06-04 20:53:11', 0),
	('f5c97b84-cb00-4779-9513-a0d4255cdf9e', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Dispatched', 'Užsakymas išsiųstas', 'Jūsų užsakymas buvo išsiųstas', '/orders/FOTOFOTO-3', '2024-06-04 20:50:32', 0),
	('bb7aac17-5bb6-498d-b668-aa3554897347', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Created', 'Rezervacija sukurta', 'Jūsų rezervacija buvo sėkmingai sukurta', '/orders/FOTOFOTO-1', '2024-06-04 19:59:17', 0),
	('72c1b200-bb19-463a-a349-ba02bd466737', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Created', 'Rezervacija sukurta', 'Jūsų rezervacija buvo sėkmingai sukurta', '/orders/MATAS-3', '2024-06-04 20:52:39', 0),
	('466acd3e-18f9-47a5-bc34-bb792ec3e591', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Delivered', 'Užsakymas pristatytas', 'Jūsų užsakymas buvo pristatytas', '/orders/FOTOFOTO-2', '2024-06-04 20:51:47', 0),
	('420dba13-f339-447c-b49f-c8b217dd2d3c', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Created', 'Rezervacija sukurta', 'Jūsų rezervacija buvo sėkmingai sukurta', '/orders/FOTOFOTO-3', '2024-06-04 20:48:33', 0),
	('874bd7e1-a81d-4308-86db-d2f93485d1fa', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Created', 'Rezervacija sukurta', 'Jūsų rezervacija buvo sėkmingai sukurta', '/orders/MATAS-1', '2024-06-04 20:47:47', 0),
	('3bb94951-b4c6-4fee-b91c-d80cb3d00339', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Accepted', 'Rezervacija patvirtinta', 'Jūsų užsakymas buvo patvirtinta', '/orders/FOTOFOTO-3', '2024-06-04 20:50:26', 0),
	('95ca63f9-920e-4fee-82b0-df1984a5d92e', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Accepted', 'Rezervacija patvirtinta', 'Jūsų užsakymas buvo patvirtinta', '/orders/FOTOFOTO-2', '2024-06-04 20:51:31', 0),
	('419a388c-c33a-4afd-bdf3-dfda742a8855', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Accepted', 'Rezervacija patvirtinta', 'Jūsų užsakymas buvo patvirtinta', '/orders/FOTOFOTO-4', '2024-06-04 20:50:43', 0),
	('d9d0f7ed-fe87-46b6-b94c-e0d72a8aa39a', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Created', 'Rezervacija sukurta', 'Jūsų rezervacija buvo sėkmingai sukurta', '/orders/FOTOFOTO-5', '2024-06-04 20:53:55', 0),
	('0dfae830-f1a9-4cde-8f13-e83cc6c6f542', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Dispatched', 'Užsakymas išsiųstas', 'Jūsų užsakymas buvo išsiųstas', '/orders/FOTOFOTO-1', '2024-06-04 20:23:43', 0),
	('639e1f4b-f8fb-4c63-ae3d-fca296365ed0', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Dispatched', 'Užsakymas išsiųstas', 'Jūsų užsakymas buvo išsiųstas', '/orders/FOTOFOTO-2', '2024-06-04 20:51:37', 0),
	('2c169911-dbb7-4106-bf1f-fcee332a6a70', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'Order.Created', 'Rezervacija sukurta', 'Jūsų rezervacija buvo sėkmingai sukurta', '/orders/MATAS-2', '2024-06-04 20:48:09', 0);

-- Dumping structure for table itemrental.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` varchar(50) NOT NULL DEFAULT '',
  `listing` uuid DEFAULT NULL,
  `user` uuid DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `deliveryType` int(11) DEFAULT NULL,
  `comment` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `location` longtext DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.orders: ~1 rows (approximately)
DELETE FROM `orders`;
INSERT INTO `orders` (`id`, `listing`, `user`, `startDate`, `endDate`, `status`, `deliveryType`, `comment`, `location`, `createdAt`) VALUES
	('FOTOFOTO-1', '75f6cbe1-a138-4e57-8195-666ca307431f', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', '2024-06-04', '2024-06-07', 5, 0, 'Universiteto reklamos filmavimas', NULL, '2024-06-04 19:59:17'),
	('FOTOFOTO-2', '2e62415d-4a73-4f54-b218-2f479c16bf27', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', '2024-06-12', '2024-06-13', 4, 0, '', NULL, '2024-06-04 20:48:23'),
	('FOTOFOTO-3', '3e5644a0-e2c2-45e4-9877-f0f581ae51bb', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', '2024-06-19', '2024-06-20', 2, 0, '', NULL, '2024-06-04 20:48:33'),
	('FOTOFOTO-4', '30f7c2e4-3a58-43b6-a83e-421e75084a98', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', '2024-06-25', '2024-06-28', 3, 0, '', NULL, '2024-06-04 20:48:45'),
	('FOTOFOTO-5', '75f6cbe1-a138-4e57-8195-666ca307431f', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', '2024-06-14', '2024-06-15', 0, 0, '', NULL, '2024-06-04 20:53:55'),
	('MATAS-1', 'b8d19c9e-8d1b-4cec-b3cc-2c42cb76b4d2', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', '2024-06-12', '2024-06-13', 0, 1, '', NULL, '2024-06-04 20:47:47'),
	('MATAS-2', '1cd0a3fc-f6cb-4337-baf4-56ad77ec0d1c', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', '2024-06-04', '2024-06-05', 0, 0, '', NULL, '2024-06-04 20:48:09'),
	('MATAS-3', '63831671-381d-49d3-b01d-bb1d17839d7c', '4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', '2024-06-05', '2024-06-06', 0, 0, '', NULL, '2024-06-04 20:52:38'),
	('MATAS-4', '63831671-381d-49d3-b01d-bb1d17839d7c', 'e03a8d2c-6399-4686-958c-14caef3d1519', '2024-06-08', '2024-06-09', 0, 0, '', NULL, '2024-06-04 20:52:57'),
	('MATAS-5', '63831671-381d-49d3-b01d-bb1d17839d7c', 'e03a8d2c-6399-4686-958c-14caef3d1519', '2024-06-11', '2024-06-12', 0, 0, '', NULL, '2024-06-04 20:53:04'),
	('MATAS-6', '63831671-381d-49d3-b01d-bb1d17839d7c', 'e03a8d2c-6399-4686-958c-14caef3d1519', '2024-06-17', '2024-06-21', 0, 0, '', NULL, '2024-06-04 20:53:11');

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
  `location` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `deleted` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.rent_listings: ~31 rows (approximately)
DELETE FROM `rent_listings`;
INSERT INTO `rent_listings` (`id`, `item`, `renter`, `title`, `description`, `price`, `location`, `deleted`) VALUES
	('f09d8b6d-643a-485a-8ac9-46254569b9c1', '892e9dd3-cc05-45a8-9020-35cfcd9bd28e', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'What is lorem ipsum?', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 20.990000, 'Vilnius, Lithuania', 0),
	('b9853a20-47c8-47be-8925-68e8e893a0dd', 'ec0b4bc7-65d1-448b-8255-2de6d9b88727', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Phone rent', '', 5.000000, 'Kaunas, Vilnius', 0),
	('a69a75cb-435b-4e2d-a27d-af545100d73d', 'e58af2d6-ad2c-4250-aa0e-af9a8d5a0885', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Elektrinės žoliapjovės nuoma', 'Mažai naudota elektrinė žolepjovė paruošta naudojimui, neseniai atlikti priežiūros darbai, peilio ašmenys pagalasti.', 4.000000, 'Kaunas, Lithuania', 0),
	('205a4ff4-fcb3-4f69-8486-da3aade46168', '700f1862-8a21-486e-bfa2-7d2f99564da9', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Traktoriukas/žoliapjovė', 'Naujas traktoriukas puikiai tinkantis prižiūrėti veją.', 10.000000, 'Kaunas, Lithuania', 0),
	('63831671-381d-49d3-b01d-bb1d17839d7c', '2cacbcdd-e5a9-4280-932e-d8485323dc16', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Sportinis BMW F30', 'Žiedinėms lenktynėms pritaikytas automobilis kuris atitinka visus FIA standartus. Pilni saugos lankai, saugumo priemonės, panikos mygtukas išjungiantis visas automobilio sistemas. Automobilis pritaikytas kiekvienam norinčiam išbandyti save lenktynių trasoje. Nuoma atliekama Nemuno žiede. Viskas įskaičiuota', 100.000000, 'Nemuno žiedas, Kaunas, Lithuania', 0),
	('c7aa5214-552b-4fa1-8010-1cd753cf1c75', 'b9885038-af3d-4d2c-b818-f8fcad813341', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Audi S3 automobilis', 'Kasdieninis automobilis su patogumo komplektu, labai taupus, kasko draudimas, apsaugantis nuo visų nelaimių kelyje.', 20.000000, 'Vilnius, Lithuania', 0),
	('34f8625b-6525-4806-9363-9a5abe0dbe39', '38442e05-7369-4747-ba10-73ee8d6f2ab6', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Sony A7S2 fotoaparatas', 'Profesionalus pilno kadro fotoaparatas puikiai tinkantis bet kokiam filmavimui. Kartu su fotoaparatu duodamas Sony FE 35mm f/1.8 objektyvas su polarizuojančiu filtru.', 15.000000, 'Kaunas, Lithuania', 0),
	('b8d19c9e-8d1b-4cec-b3cc-2c42cb76b4d2', '90c0992e-d736-4638-b292-a18c42d949c1', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Nikon D5100 fotoaparatas', 'Veidrodinis fotoaparatas skirtas fotografijai, nedidelis kadrų skaičius, pridedamass 18-55mm f/3.5-5.6 objektyvas ir trys papildomos baterijos.', 10.000000, 'Kaunas, Lithuania', 0),
	('9802d975-8fe5-4523-aa15-2fcac5d1c85c', 'af000421-55ac-433f-8524-d063e7c39d73', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'GARDEN priekabos nuoma', 'Lengvasvoriams kroviniams skirta vežti priekaba, paruošta eksplotavimui, tinkamai veikianti elektros jungtis', 30.000000, 'Kaunas, Lithuania', 0),
	('1ed4d290-189f-4ecb-a0af-a84a7dee38c3', 'c6841033-4ab2-41c7-a155-61da6c42a7db', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'BMW F30 330i', 'Trečios klasės BMW automobilis su pilnu komforto komplektu. Turintis daug galios. Galiojantis kasko draudimas nuo visų nelaimių kelyje', 50.000000, 'Kaunas, Lithuania', 0),
	('f938c8eb-aa84-426b-b5e8-925561627282', '62c42c49-b548-454e-9c46-4d4076b5dd78', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Tesla Model S', 'Puikus elektromobilis važinėjimui mieste ir užmiestyje, su pilnu įkrovimu nuvažiuosite net iki 300 kilometrų! Pilnos komplektacijos autopilotas ir kitos saugumo priemonės', 40.000000, 'Kaunas, Lithuania', 0),
	('bae31fcb-76e7-43f7-9185-d1cf6f3e482e', '7cbdf583-4b98-4bce-87fc-59585a7ae494', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Studijinis mikrofonas', 'Mikrofonas puikiai tinkantis pokalbinių įrašams kurti. Audio mėgėjams. Pridedamas ir mikrofono laikiklis stalui', 5.000000, 'Kaunas, Lithuania', 0),
	('e0257641-e540-4eb6-a2d6-1f7517c02167', '46c5db9a-0e83-4052-83b3-76e656724a44', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Genesis Radium 600', 'Megėjiškas mikrofonas skirtas įvairaus pobūdžio įrašų kūrimui. Prie mikrofono pridedamas visas komplektas: pop filtras, transportavimo dėžė, stovas ir laikiklis', 4.000000, 'Kaunas, Lithuania', 0),
	('1cd0a3fc-f6cb-4337-baf4-56ad77ec0d1c', 'cfaba7fe-e9cf-4e8b-9ca8-0a4e9b4572e7', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Polarizuojantis filtras', '49mm dydžio polarizuojantis filtras tinkantis daugumai pilno kadro objektyvų', 2.000000, 'Kaunas, Lithuania', 0),
	('b3f0f53f-58e9-46ec-8e68-795ec855235a', '0f6c4d55-7bb9-4455-8595-84691606635a', '59e8d978-da4b-470b-9beb-6bbcc70ac5fb', 'Playstation 1 originali žaidimų konsolė', 'Originali retro žaidimų konsolė su žinomiausiais žaidimas "Crash" ir kiti. Pridedami du pulteliai. Prijungti naudojama RCA jungtis.', 5.000000, 'Kaunas, Lithuania', 0),
	('39078b4b-d1fc-4169-a00b-fab6cc0c4bb5', '5e51f0a8-e519-4b73-860d-2c77210e3d55', '59e8d978-da4b-470b-9beb-6bbcc70ac5fb', 'Playstation 2 konsolė', 'Žaidimų konsolė su pilnu paketu ir žaidimais', 5.000000, 'Kaunas, Lithuania', 0),
	('ddc222b2-4c9b-442e-84a8-c3f5fb142c7d', 'a5140a5e-a8cf-4760-8d95-0562bb9b0589', '59e8d978-da4b-470b-9beb-6bbcc70ac5fb', 'Playstation 3 žaidimų konsolė', 'Pilnas playstation 3 konsolės rinkinys su daugybe žaidimų, galimybė žaisti tinkle su kitais žaidėjais, aktyvi PS Plus prenumerata.', 10.000000, 'Kaunas, Lithuania', 0),
	('322d5fa3-8cb9-41c1-a940-5142a53df3a7', '74010154-b180-411e-9420-9fbf7c04d49c', '59e8d978-da4b-470b-9beb-6bbcc70ac5fb', 'Playstation 5 konsolė', 'Naujausia playstation žaidimų konsolė, palaikanti ir Playstation 4 žaidimus, aktyvi PS Plus prenumerata suteikianti didžiulią žaidimų biblioteką ir galimybę žaisti tinkle su kitais žaidėjais.', 15.000000, 'Kaunas, Lithuania', 0),
	('38b2b8b8-8fec-40a9-9bbb-827e3605cdb1', 'cbbf7cb6-7a55-481e-8ead-9657db94607b', '13557b17-53e1-4da3-9da2-0496fd7c5474', 'Demonstracins skelbimas', 'Demonstracinis skelbimo aprašymas', 50.000000, 'Kaunas, Lithuania', 0),
	('f0441dca-b60c-41f6-94cd-1339f9493e8e', 'b3e20e08-fa6d-4498-8638-9e001b241d6c', '142eae84-432c-4a67-a92b-ece3fb36a109', 'Postman rent listing', 'This is a test ran by a postman to test creating a rent listing endpoint', 12.990000, 'Kaunas, Lithuania', 0),
	('64f97985-0fb8-410d-996f-9ead4b70e5b4', 'fe2b1ff7-d148-4dba-abba-3d71e77dcd0a', '142eae84-432c-4a67-a92b-ece3fb36a109', 'Postman rent listing', 'This is a test ran by a postman to test creating a rent listing endpoint', 12.990000, 'Kaunas, Lithuania', 0),
	('1ea7200c-fedc-467b-bd58-83aa341ec217', '124a6d60-1aa3-4a77-b0c5-f88adf5008c1', '142eae84-432c-4a67-a92b-ece3fb36a109', 'Postman rent listing', 'This is a test ran by a postman to test creating a rent listing endpoint', 12.990000, 'Kaunas, Lithuania', 0),
	('f9796e0f-eb70-4df9-8dc1-be28a9e2b927', '3c67c89b-1ccd-4606-9795-15b96ed4e898', '142eae84-432c-4a67-a92b-ece3fb36a109', 'Postman rent listing', 'This is a test ran by a postman to test creating a rent listing endpoint', 12.990000, 'Kaunas, Lithuania', 0),
	('21644299-da8f-4ab1-b0af-e69be5d314f0', '87df2594-1bd8-4ac7-84e5-93c924542e55', '142eae84-432c-4a67-a92b-ece3fb36a109', 'Postman rent listing', 'This is a test ran by a postman to test creating a rent listing endpoint', 12.990000, 'Kaunas, Lithuania', 0),
	('c34081dd-d710-4b70-bb89-4499481bd154', 'edf45d7d-9845-4761-a28c-73c9f61bbf61', '142eae84-432c-4a67-a92b-ece3fb36a109', 'Postman rent listing', 'This is a test ran by a postman to test creating a rent listing endpoint', 12.990000, 'Kaunas, Lithuania', 0),
	('7c191cbc-6b5d-4b4d-94f0-6fc27ddf7a6f', '5aab285b-6da4-4d4a-b5fe-074c45a8b891', '6630ef8d-fd45-4da8-9b29-32c6f7ea4638', 'Sony FX30 Body', 'Sony naujausia kino standartus atitinkanti kamera. Nuomojamas tik korpusas!', 20.000000, 'Kaunas, Lithuania', 0),
	('75f6cbe1-a138-4e57-8195-666ca307431f', '5797ddd0-6ebd-42a0-8307-e00da61d9a3d', '6630ef8d-fd45-4da8-9b29-32c6f7ea4638', 'Sony FX30 + Sony 24-70/f4', 'Rinkinys profesionaliam/mėgėjiškui filmavimui. Pridedamas pakrovėjas ir dvi papildomos baterijos. Nuomojama tik su nuomos sutartimi.', 35.000000, 'Kaunas, Lithuania', 0),
	('c04b2980-531c-4a44-9623-74bb42c7a52d', '2aff7031-b16c-4f86-906d-0d8d7d1946ba', '6630ef8d-fd45-4da8-9b29-32c6f7ea4638', 'Sony a6400', 'Sisteminis sony fotoaparatas puikiai tinkantis fotosesijom ir filmavimo darbam, pridedamas parovėjas papildomai ir dvi papildomos baterijos', 25.000000, 'Vilnius, Lithuania', 0),
	('3e5644a0-e2c2-45e4-9877-f0f581ae51bb', 'ecb401ce-8fcf-404f-841e-3c20e3f50350', '6630ef8d-fd45-4da8-9b29-32c6f7ea4638', 'Canon 550d', 'Veidrodinis canon fotoaparatas', 20.000000, 'Kaunas, Lithuania', 0),
	('30f7c2e4-3a58-43b6-a83e-421e75084a98', '55082151-1b43-4451-981d-4b3477b75793', '6630ef8d-fd45-4da8-9b29-32c6f7ea4638', 'Sony HXR-MC2500 Filmavimo kamera', 'Puiki kamera mėgėjiškam filmavimui', 15.000000, 'Kaunas, Lithuania', 0),
	('2e62415d-4a73-4f54-b218-2f479c16bf27', '9099dece-eaf2-4609-a229-d6cdb6cfb895', '6630ef8d-fd45-4da8-9b29-32c6f7ea4638', 'Canon 70d', 'Veidrodinis canon 70d fotoaparatas', 15.000000, 'Kaunas, Lithuania', 0);

-- Dumping structure for table itemrental.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` uuid NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `surname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `avatarURL` text DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `verified` tinyint(4) DEFAULT 0,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table itemrental.users: ~7 rows (approximately)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `username`, `email`, `password`, `name`, `surname`, `avatarURL`, `phone`, `verified`) VALUES
	('13557b17-53e1-4da3-9da2-0496fd7c5474', 'matas', 'matas.kaskadininkas@gmail.com', '$2a$10$hBSs1JwWG10LepzgcHdMVOp8X.6UI6Q6e2CAcS7//CCFEHsRTWYx.', 'Matas', 'Kaskadininkas', 'https://www.part.lt/img/ad9612856988d4fea00ae4644131922f983.png', NULL, 1),
	('e03a8d2c-6399-4686-958c-14caef3d1519', 'jonas_p', 'jonas.petrauskas@example.com', '$2a$10$KYHU..HIaA1NnRDAjA.MTuNB6PrjgKEeO/PW4uyReKTlkRCMZ7XGW', 'Jonas', 'Petrauskas', NULL, '+37067600222', 0),
	('4dc7d983-af45-4bb1-ac7d-2b9edbbbf7fc', 'margarita', 'margarita@gmail.com', '$2a$10$K84SlOwBCYfOcYcb8Xxe/.WGdu/sCLztDVInrpTOY/KIkS7BSsRQm', 'Margarita', 'Peškauskaitė', '', NULL, 0),
	('6630ef8d-fd45-4da8-9b29-32c6f7ea4638', 'fotofoto', 'fotofoto@example.com', '$2a$10$yhoCNBi6WTUbQHYDHvZIZ.vagODRGA.Xy1VhDpWHFGjVKfP38/.Ry', 'Gediminas', 'Stankevičius', NULL, '+37067600222', 0),
	('d49ec1b3-fec0-4532-a17c-50376245f15c', 'Kazimieras', 'kazimieras.kas@gmail.com', '$2a$10$JYOWj.RJoI7Z4H6BCM6Iae2EuCw0yHhKNYLA6BDtYTuxGnInnaiMm', 'Kazimieras', 'Kaskadininkas', '', NULL, 0),
	('59e8d978-da4b-470b-9beb-6bbcc70ac5fb', 'retrogamer', 'retrogamer@itemrental.com', '$2a$10$DZW.gnDoO2yIXKI074GCWO3ow7LBhvEDUAnZnlfXSRIVwb7LUgtCW', 'Emilis', 'Kaskadininkas', '', NULL, 1),
	('142eae84-432c-4a67-a92b-ece3fb36a109', 'postman', 'postman@itemrental.com', '$2a$10$K0LlwL5BKSSDc5nU0qENlewny5JKMj4BlUUaYesWYZDPstt0YikmO', '', '', '', NULL, 0);

-- Dumping structure for table itemrental.verification_requests
CREATE TABLE IF NOT EXISTS `verification_requests` (
  `id` uuid NOT NULL,
  `user` uuid NOT NULL,
  `status` int(11) DEFAULT 0,
  `createdAt` datetime DEFAULT current_timestamp(),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Dumping data for table itemrental.verification_requests: ~2 rows (approximately)
DELETE FROM `verification_requests`;
INSERT INTO `verification_requests` (`id`, `user`, `status`, `createdAt`) VALUES
	('1bcf1750-2f15-4412-92f6-5ab48122e9ff', 'e03a8d2c-6399-4686-958c-14caef3d1519', 0, '2024-06-04 23:56:28'),
	('db494e00-ffcd-420d-9bf8-d49d42ade033', '6630ef8d-fd45-4da8-9b29-32c6f7ea4638', 0, '2024-06-04 23:56:41');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
