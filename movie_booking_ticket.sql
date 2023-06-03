-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.2.3-MariaDB-log - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for movie_booking_ticket
CREATE DATABASE IF NOT EXISTS `movie_booking_ticket` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci */;
USE `movie_booking_ticket`;

-- Dumping structure for table movie_booking_ticket.booking_depot
CREATE TABLE IF NOT EXISTS `booking_depot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discount` int(11) DEFAULT NULL,
  `movie_day_id` int(11) DEFAULT NULL,
  `movie_id` int(11) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `seat_id` int(11) DEFAULT NULL,
  `seat_name` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `booking_depots_id` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKowoco65a48lj3y0xmvyfivo1k` (`user_id`),
  KEY `FK4lie4t5ii2nu1la4y9jeks8r3` (`booking_depots_id`),
  CONSTRAINT `FK4lie4t5ii2nu1la4y9jeks8r3` FOREIGN KEY (`booking_depots_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKowoco65a48lj3y0xmvyfivo1k` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table movie_booking_ticket.booking_depot: ~6 rows (approximately)
DELETE FROM `booking_depot`;
INSERT INTO `booking_depot` (`id`, `discount`, `movie_day_id`, `movie_id`, `order_date`, `room_id`, `seat_id`, `seat_name`, `status`, `user_id`, `booking_depots_id`) VALUES
	(1, 1, 1, 10, '2023-05-14 01:31:56', 1, 1, 'E-6', 2, 'a919d4299d154908a06acf45d69cb64d', NULL),
	(2, 1, 1, 10, '2023-05-14 01:31:56', 1, 1, 'E-7', 2, 'a919d4299d154908a06acf45d69cb64d', NULL),
	(3, 1, 1, 10, '2023-05-14 01:31:56', 1, 1, 'E-8', 2, 'a919d4299d154908a06acf45d69cb64d', NULL),
	(4, 1, 2, 1, '2023-05-14 15:11:25', 3, 1, 'F-10', 2, 'a919d4299d154908a06acf45d69cb64d', NULL),
	(5, 1, 2, 1, '2023-05-14 15:11:25', 3, 1, 'G-10', 2, 'a919d4299d154908a06acf45d69cb64d', NULL),
	(6, 1, 2, 1, '2023-05-14 15:11:25', 3, 1, 'H-10', 2, 'a919d4299d154908a06acf45d69cb64d', NULL),
	(7, 1, 3, 5, '2023-05-23 01:35:09', 3, 1, 'E-7', 2, '1416d5ecbb974f0a941f6c9f0d134635', NULL),
	(8, 1, 3, 5, '2023-05-23 01:35:09', 3, 1, 'E-8', 2, '1416d5ecbb974f0a941f6c9f0d134635', NULL),
	(9, 1, 3, 5, '2023-05-23 01:35:09', 3, 1, 'E-9', 2, '1416d5ecbb974f0a941f6c9f0d134635', NULL),
	(10, 1, 3, 5, '2023-05-23 01:36:27', 3, 1, 'D-8', 2, 'a919d4299d154908a06acf45d69cb64d', NULL),
	(11, 1, 3, 5, '2023-05-23 01:49:27', 3, 1, 'C-5', 1, 'a919d4299d154908a06acf45d69cb64d', NULL);

-- Dumping structure for table movie_booking_ticket.cast
CREATE TABLE IF NOT EXISTS `cast` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cast_name` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table movie_booking_ticket.cast: ~0 rows (approximately)
DELETE FROM `cast`;
INSERT INTO `cast` (`id`, `cast_name`, `image`) VALUES
	(1, 'Demo Cast', NULL),
	(2, 'Viet', '/upload/image/cast_image/cebebc6e68b547aabbf80b5dc4b0bef7076d9b1c98bb0ecf33f6af7a4e0c8ce264031d1.jpg');

-- Dumping structure for table movie_booking_ticket.category
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cate_name` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `parent_id` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `create_by_id` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `category_id` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5qgxc8wdou3f6oy37k5ejnxj3` (`create_by_id`),
  KEY `FKnmbsvtysx8o1s1m1i7s3pimvk` (`category_id`),
  CONSTRAINT `FK5qgxc8wdou3f6oy37k5ejnxj3` FOREIGN KEY (`create_by_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKnmbsvtysx8o1s1m1i7s3pimvk` FOREIGN KEY (`category_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table movie_booking_ticket.category: ~18 rows (approximately)
DELETE FROM `category`;
INSERT INTO `category` (`id`, `cate_name`, `parent_id`, `status`, `create_by_id`, `category_id`) VALUES
	(1, 'Action', NULL, 1, 'e30c3fa7574646948a50b161657ce03f', NULL),
	(2, 'Horror', NULL, 1, 'e30c3fa7574646948a50b161657ce03f', NULL),
	(3, 'Drama', NULL, 1, 'e30c3fa7574646948a50b161657ce03f', NULL),
	(4, 'Science fiction', NULL, 1, 'e30c3fa7574646948a50b161657ce03f', NULL),
	(5, 'Thriller', NULL, 1, 'e30c3fa7574646948a50b161657ce03f', NULL),
	(6, 'Western', NULL, 1, 'e30c3fa7574646948a50b161657ce03f', NULL),
	(7, 'Adventure', NULL, 1, 'e30c3fa7574646948a50b161657ce03f', NULL),
	(8, 'Romance', NULL, 1, 'e30c3fa7574646948a50b161657ce03f', NULL),
	(9, 'Crime film', NULL, 1, 'e30c3fa7574646948a50b161657ce03f', NULL),
	(10, 'Comedy', NULL, 1, 'e30c3fa7574646948a50b161657ce03f', NULL),
	(11, 'Documentary', NULL, 1, 'e30c3fa7574646948a50b161657ce03f', NULL),
	(12, 'Narrative', NULL, 1, 'e30c3fa7574646948a50b161657ce03f', NULL),
	(13, 'Noir', NULL, 1, 'e30c3fa7574646948a50b161657ce03f', NULL),
	(14, 'Musical', NULL, 1, 'e30c3fa7574646948a50b161657ce03f', NULL),
	(15, 'Fantasy', NULL, 1, 'e30c3fa7574646948a50b161657ce03f', NULL),
	(16, 'Experimental', NULL, 1, 'e30c3fa7574646948a50b161657ce03f', NULL),
	(17, 'Teen', NULL, 1, 'e30c3fa7574646948a50b161657ce03f', NULL),
	(18, 'Animation', NULL, 1, 'e30c3fa7574646948a50b161657ce03f', NULL);

-- Dumping structure for table movie_booking_ticket.director
CREATE TABLE IF NOT EXISTS `director` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `director_image` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `director_name` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table movie_booking_ticket.director: ~0 rows (approximately)
DELETE FROM `director`;
INSERT INTO `director` (`id`, `director_image`, `director_name`) VALUES
	(1, NULL, 'Demo Director');

-- Dumping structure for table movie_booking_ticket.movie
CREATE TABLE IF NOT EXISTS `movie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cast` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `rated` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `release_date` datetime DEFAULT NULL,
  `running_time` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `star_number` int(11) DEFAULT NULL,
  `thumnail` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `trailer` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `director_id` int(11) DEFAULT NULL,
  `movie_id` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnvsn9b9a8fok8dh383pspnxlq` (`user_id`),
  KEY `FKbi47w3cnsfi30gc1nu2avgra2` (`director_id`),
  KEY `FKcfty0vyrumyhn7gmvy4yslj53` (`movie_id`),
  CONSTRAINT `FKbi47w3cnsfi30gc1nu2avgra2` FOREIGN KEY (`director_id`) REFERENCES `director` (`id`),
  CONSTRAINT `FKcfty0vyrumyhn7gmvy4yslj53` FOREIGN KEY (`movie_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKnvsn9b9a8fok8dh383pspnxlq` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table movie_booking_ticket.movie: ~10 rows (approximately)
DELETE FROM `movie`;
INSERT INTO `movie` (`id`, `cast`, `description`, `rated`, `release_date`, `running_time`, `star_number`, `thumnail`, `title`, `trailer`, `user_id`, `director_id`, `movie_id`) VALUES
	(1, NULL, 'Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.', ' C16 - MOVIES ARE ALLOWED TO BE DISSEMINATED TO VIEWERS AGED 16 YEARS AND OVER (16+)', '2022-12-16 00:00:00', '100', 1, '/upload/image/movie_image/avatar.jpg', 'Avatar', 'gq2xKJXYZ80', 'e30c3fa7574646948a50b161657ce03f', 1, NULL),
	(2, NULL, 'Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.', ' C16 - MOVIES ARE ALLOWED TO BE DISSEMINATED TO VIEWERS AGED 16 YEARS AND OVER (16+)', '2022-10-06 00:00:00', '100', 1, '/upload/image/movie_image/BlackAdam.jpg', 'Black Adam', 'X0tOpBuYasI', 'e30c3fa7574646948a50b161657ce03f', 1, NULL),
	(3, NULL, 'Inspired by a true story, an oddball group of cops, criminals, tourists and teens converge in a Georgia forest where a 500-pound black bear goes on a murderous rampage after unintentionally ingesting cocaine.', ' C16 - MOVIES ARE ALLOWED TO BE DISSEMINATED TO VIEWERS AGED 16 YEARS AND OVER (16+)', '2023-02-24 00:00:00', '100', 1, '/upload/image/movie_image/CocaineBear.jpg', 'Cocaine Bear', 'DuWEEKeJLMI', 'e30c3fa7574646948a50b161657ce03f', 1, NULL),
	(4, NULL, 'After dominating the boxing world, Adonis Creed has been thriving in both his career and family life. When a childhood friend and former boxing prodigy, Damien Anderson, resurfaces after serving a long sentence in prison, he is eager to prove that he deserves his shot in the ring. The face-off between former friends is more than just a fight. To settle the score, Adonis must put his future on the line to battle Damien — a fighter who has nothing to lose.', ' C16 - MOVIES ARE ALLOWED TO BE DISSEMINATED TO VIEWERS AGED 16 YEARS AND OVER (16+)', '2023-03-24 00:00:00', '100', 1, '/upload/image/movie_image/CreedIII.jpg', 'Creed III', '5zwqo4pcIEE', 'e30c3fa7574646948a50b161657ce03f', 1, NULL),
	(5, NULL, 'With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.', ' C16 - MOVIES ARE ALLOWED TO BE DISSEMINATED TO VIEWERS AGED 16 YEARS AND OVER (16+)', '2023-03-24 00:00:00', '100', 1, '/upload/image/movie_image/JohnWick4.jpg', 'John Wick 4', 'yjRHZEUamCc', 'e30c3fa7574646948a50b161657ce03f', 1, NULL),
	(6, NULL, 'While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.', ' C16 - MOVIES ARE ALLOWED TO BE DISSEMINATED TO VIEWERS AGED 16 YEARS AND OVER (16+)', '2023-04-07 00:00:00', '100', 1, '/upload/image/movie_image/Mario.jpg', 'Mario', 'RjNcTBXTk4I', 'a919d4299d154908a06acf45d69cb64d', 1, NULL),
	(7, NULL, 'Through a series of unfortunate events, three mummies end up in present-day London and embark on a wacky and hilarious journey in search of an old ring belonging to the Royal Family, stolen by ambitious archaeologist Lord Carnaby.', ' C16 - MOVIES ARE ALLOWED TO BE DISSEMINATED TO VIEWERS AGED 16 YEARS AND OVER (16+)', '2023-02-24 00:00:00', '100', 1, '/upload/image/movie_image/Mummies.jpg', 'Mummies', 'WRB8YIc4U68', 'e30c3fa7574646948a50b161657ce03f', 1, NULL),
	(8, NULL, 'Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.', ' C16 - MOVIES ARE ALLOWED TO BE DISSEMINATED TO VIEWERS AGED 16 YEARS AND OVER (16+)', '2024-01-01 00:00:00', '100', 1, '/upload/image/movie_image/PussinBoots.jpg', 'Puss in Boots', 'RqrXhwS33yc', 'a919d4299d154908a06acf45d69cb64d', 1, NULL),
	(9, NULL, 'Billy Batson and his foster siblings, who transform into superheroes by saying "Shazam!", are forced to get back into action and fight the Daughters of Atlas, who they must stop from using a weapon that could destroy the world.', ' C16 - MOVIES ARE ALLOWED TO BE DISSEMINATED TO VIEWERS AGED 16 YEARS AND OVER (16+)', '2023-03-17 00:00:00', '100', 1, '/upload/image/movie_image/Shazam.jpg', 'Shazam', 'l37LjoV9W7M', 'e30c3fa7574646948a50b161657ce03f', 1, NULL),
	(10, NULL, 'Suzume, 17, lost her mother as a little girl. On her way to school, she meets a mysterious young man. But her curiosity unleashes a calamity that endangers the entire population of Japan, and so Suzume embarks on a journey to set things right.', ' C16 - MOVIES ARE ALLOWED TO BE DISSEMINATED TO VIEWERS AGED 16 YEARS AND OVER (16+)', '2023-03-10 00:00:00', '100', 1, '/upload/image/movie_image/Suzume.jpg', 'Suzume Locking up the doors', 'xQ4_c8JfuzI', 'e30c3fa7574646948a50b161657ce03f', 1, NULL);

-- Dumping structure for table movie_booking_ticket.movie_cast
CREATE TABLE IF NOT EXISTS `movie_cast` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cast_id` int(11) DEFAULT NULL,
  `movie_id` int(11) DEFAULT NULL,
  `movie_cast_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmubobrx5vtcog69c067vb5mbe` (`cast_id`),
  KEY `FKiclxo4q0vtqn16tudwy9gg0i0` (`movie_id`),
  KEY `FKgakdtqq0rtqsn1muh9ao1hi0a` (`movie_cast_id`),
  CONSTRAINT `FKgakdtqq0rtqsn1muh9ao1hi0a` FOREIGN KEY (`movie_cast_id`) REFERENCES `movie` (`id`),
  CONSTRAINT `FKiclxo4q0vtqn16tudwy9gg0i0` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`),
  CONSTRAINT `FKmubobrx5vtcog69c067vb5mbe` FOREIGN KEY (`cast_id`) REFERENCES `cast` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table movie_booking_ticket.movie_cast: ~10 rows (approximately)
DELETE FROM `movie_cast`;
INSERT INTO `movie_cast` (`id`, `cast_id`, `movie_id`, `movie_cast_id`) VALUES
	(1, 1, 1, NULL),
	(2, 1, 2, NULL),
	(3, 1, 3, NULL),
	(4, 1, 4, NULL),
	(5, 1, 5, NULL),
	(7, 1, 7, NULL),
	(9, 1, 9, NULL),
	(10, 1, 10, NULL),
	(12, 1, 8, NULL),
	(13, 2, 6, NULL),
	(14, 1, 6, NULL);

-- Dumping structure for table movie_booking_ticket.movie_category
CREATE TABLE IF NOT EXISTS `movie_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `movie_id` int(11) DEFAULT NULL,
  `movie_category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhkem46gi7yq1019e1j8hlvp9y` (`category_id`),
  KEY `FKdhlw8bp2rx2bhkp1orkg12lor` (`movie_id`),
  KEY `FKc5abh3gan3bb4553k882da5jl` (`movie_category_id`),
  CONSTRAINT `FKc5abh3gan3bb4553k882da5jl` FOREIGN KEY (`movie_category_id`) REFERENCES `movie` (`id`),
  CONSTRAINT `FKdhlw8bp2rx2bhkp1orkg12lor` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`),
  CONSTRAINT `FKhkem46gi7yq1019e1j8hlvp9y` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table movie_booking_ticket.movie_category: ~10 rows (approximately)
DELETE FROM `movie_category`;
INSERT INTO `movie_category` (`id`, `category_id`, `movie_id`, `movie_category_id`) VALUES
	(1, 1, 1, NULL),
	(2, 1, 2, NULL),
	(3, 1, 3, NULL),
	(4, 1, 4, NULL),
	(5, 1, 5, NULL),
	(7, 1, 7, NULL),
	(9, 1, 9, NULL),
	(10, 1, 10, NULL),
	(12, 1, 8, NULL),
	(13, 1, 6, NULL);

-- Dumping structure for table movie_booking_ticket.movie_day
CREATE TABLE IF NOT EXISTS `movie_day` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `show_date` datetime DEFAULT NULL,
  `show_time` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table movie_booking_ticket.movie_day: ~2 rows (approximately)
DELETE FROM `movie_day`;
INSERT INTO `movie_day` (`id`, `movie_id`, `room_id`, `show_date`, `show_time`) VALUES
	(1, 10, 1, '2023-05-15 00:00:00', '11:00'),
	(2, 1, 3, '2023-05-19 00:00:00', '17:30'),
	(3, 5, 3, '2023-05-25 00:00:00', '15:20');

-- Dumping structure for table movie_booking_ticket.role
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table movie_booking_ticket.role: ~4 rows (approximately)
DELETE FROM `role`;
INSERT INTO `role` (`role_id`, `role_name`) VALUES
	(1, 'Role_Admin'),
	(2, 'Role_Client'),
	(3, 'Role_Super_Admin'),
	(4, 'Role_staff');

-- Dumping structure for table movie_booking_ticket.room
CREATE TABLE IF NOT EXISTS `room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_name` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table movie_booking_ticket.room: ~3 rows (approximately)
DELETE FROM `room`;
INSERT INTO `room` (`id`, `room_name`) VALUES
	(1, 'Cinemas 1'),
	(2, 'Cinemas 3'),
	(3, 'Cinemas 2');

-- Dumping structure for table movie_booking_ticket.seat
CREATE TABLE IF NOT EXISTS `seat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_vip` int(11) DEFAULT NULL,
  `stand` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table movie_booking_ticket.seat: ~0 rows (approximately)
DELETE FROM `seat`;

-- Dumping structure for table movie_booking_ticket.token
CREATE TABLE IF NOT EXISTS `token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_access` bit(1) DEFAULT NULL,
  `token_key` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table movie_booking_ticket.token: ~20 rows (approximately)
DELETE FROM `token`;
INSERT INTO `token` (`id`, `is_access`, `token_key`, `user_id`) VALUES
	(1, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4Mzk5NzcyNH0.ALIXVtooS1kUmt2oMxv49GE5wRWgWsLVjRMmXfg7fx0', 'a919d4299d154908a06acf45d69cb64d'),
	(2, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4Mzk5NzgxOH0.MQyS1k8Kf_LFhG2LzmK0fSkI15jHFOBH5rCyUGWv4M4', 'a919d4299d154908a06acf45d69cb64d'),
	(3, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4Mzk5Nzg1OH0.WXcFG-WJDsXS5jxzy5gbRebhekhL-oMwqmyQdWcNhXU', 'a919d4299d154908a06acf45d69cb64d'),
	(4, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4Mzk5OTk4OH0.EpNwwns8m-zi_MdG8y_V0wUwxypAMVofnSKCX9eU5SI', 'a919d4299d154908a06acf45d69cb64d'),
	(5, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDAwMDAzNX0.k_MBAJVWlqgFf0mLtmG4xV_DC6qhe2bjKIlXdO66H-4', 'a919d4299d154908a06acf45d69cb64d'),
	(8, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDAwMTc0MX0.7hhwqfoFwueNXOOMwC9k2-cq_jb6eii5Ix8iwuVpKpk', 'a919d4299d154908a06acf45d69cb64d'),
	(10, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDAwMjQxOX0.tk9aSS1xmCGsASRCwQVZTnzKKFuQrGHF3sY_gZIbWno', 'a919d4299d154908a06acf45d69cb64d'),
	(11, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDAwMjk5M30.y2XdwTWd07kSUmxSfuvsrNl9Tur20d_RuAjVmoU8zj4', 'a919d4299d154908a06acf45d69cb64d'),
	(12, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDAwNDU5N30.JTWp_HUDms7ZpUezsc7JYQfWVzVgDVLH4mirUu4lGmY', 'a919d4299d154908a06acf45d69cb64d'),
	(13, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDAwNjExOH0.jqI1Yov47P17w74ugA8gxFN6ZwPSJ65Yx5mkLHMCji8', 'a919d4299d154908a06acf45d69cb64d'),
	(14, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDAwNjExOH0.jqI1Yov47P17w74ugA8gxFN6ZwPSJ65Yx5mkLHMCji8', 'a919d4299d154908a06acf45d69cb64d'),
	(15, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDAwNjExN30.Iq5GonTekubJ_JFXihRT2xD1L_b2n4vW7d_cxAEyKzg', 'a919d4299d154908a06acf45d69cb64d'),
	(16, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDAwNjExN30.Iq5GonTekubJ_JFXihRT2xD1L_b2n4vW7d_cxAEyKzg', 'a919d4299d154908a06acf45d69cb64d'),
	(17, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDAwNjEyMn0.k8WjTFetQ9w_zXmmuJQrDRRZVLKFpkfleUdeTSZiLEg', 'a919d4299d154908a06acf45d69cb64d'),
	(18, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDAwNjEyMn0.k8WjTFetQ9w_zXmmuJQrDRRZVLKFpkfleUdeTSZiLEg', 'a919d4299d154908a06acf45d69cb64d'),
	(20, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDAwNjI2Mn0.yLK7O4jEql777USiD1Qc37SU3mlaVTog_Ou0x38S0gQ', 'a919d4299d154908a06acf45d69cb64d'),
	(21, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDA1NTMwN30.9jCdPi8a0X3qqRrYo3uPKD3Hz-uMkcPccoT4c6Vz33M', 'a919d4299d154908a06acf45d69cb64d'),
	(22, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDA1NTMwNn0.Jei3v3tMcDm9uf6EWKumJ3VoWjx-2RLXjGdOaL-BBsw', 'a919d4299d154908a06acf45d69cb64d'),
	(23, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDA1NTMyNH0.xhonm41JHUe8DedZ6HpoW66xXGrNgJfV8RzPljwg64o', 'a919d4299d154908a06acf45d69cb64d'),
	(27, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDc2ODcxOX0.JN0n4r8lDtvi7SvaHoF5FFLG2vl3eliYOG54ueVTFe0', 'a919d4299d154908a06acf45d69cb64d'),
	(33, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDc4Mzg2MH0.nxDv8K4HezKNfY5_eeb-h8rOxpwRRa-h8D1wG3R0YMs', 'a919d4299d154908a06acf45d69cb64d'),
	(36, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDc4NDUxMH0.vYq4uhPQ21M0Vww3abbUt08J5yBZtTMkdQ_JiLraV5I', 'a919d4299d154908a06acf45d69cb64d'),
	(37, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDc4NDUxMX0.EFEtQohLjLkJ_agQvcRSHjH61S2wa0cB_5MoyWYnGiQ', 'a919d4299d154908a06acf45d69cb64d'),
	(38, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDc4NDk1NX0.f9E_gjCo4JxQ0ym0ajiMXcyx_eFdLKwfNrw2bykGqUY', 'a919d4299d154908a06acf45d69cb64d'),
	(39, b'1', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXR0Njk2OSIsInJvbGVzIjpbIlJvbGVfU3VwZXJfQWRtaW4iXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2dpbiIsImV4cCI6MTY4NDc4NTYxMn0.V7fN-yxc1GaW-S-JBbfhw_9S1eeUh1IuR_jgpE4iqfw', 'a919d4299d154908a06acf45d69cb64d');

-- Dumping structure for table movie_booking_ticket.user
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `date_of_birth` datetime DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table movie_booking_ticket.user: ~6 rows (approximately)
DELETE FROM `user`;
INSERT INTO `user` (`user_id`, `address`, `date_of_birth`, `email`, `full_name`, `gender`, `password`, `phone_number`, `username`) VALUES
	('1416d5ecbb974f0a941f6c9f0d134635', NULL, '2023-05-23 01:26:04', 'Vietdz@yahoo.com', NULL, 1, '$2a$10$DxvkVk977SrIxc2DJHz89OSzVq1hgbqpCT2Wy/37QHKtxFL.nTztG', NULL, 'viet29'),
	('32d27f97bf2648f6b08034dda0b6e37a', 'Ha Noi', '2000-01-01 00:00:00', 'client01@gmail.com', 'Client 01', 1, '$2a$10$4E9UIHZN2lGvPmz4IC9JbOg4K7D2kosmAeZ4sVFjhoIDyH5Z7gt02', '0335795225', 'client01'),
	('a919d4299d154908a06acf45d69cb64d', 'Ha Noi', '2023-05-13 00:00:00', 'quocviet.pham291@gmail.com', 'Admin 1', 1, '$2a$10$l5hLi.QMHh/GO.DrNiKw0uXmQWMpcH/seSK07y5o.ERHzRAS1v4i2', '0335792222', 'vitt6969'),
	('ae2a525fb21843c3ad6552276df5d56c', 'Ha Noi', '2000-01-01 00:00:00', 'staff01@gmail.com', 'Staff2', 1, '$2a$10$4E9UIHZN2lGvPmz4IC9JbOg4K7D2kosmAeZ4sVFjhoIDyH5Z7gt02', '0335795225', 'staff01'),
	('e30c3fa7574646948a50b161657ce03f', 'Ha Noi', '2000-01-01 00:00:00', 'superadmin@gmail.com', 'Super Admin 2', 1, '$2a$10$4E9UIHZN2lGvPmz4IC9JbOg4K7D2kosmAeZ4sVFjhoIDyH5Z7gt02', '0335795225', 'superadmin'),
	('f781db09b0f44c30ac0821e15dcd1a09', 'Ha Noi', '2000-01-01 00:00:00', 'admin01@gmail.com', 'Admin 2', 1, '$2a$10$4E9UIHZN2lGvPmz4IC9JbOg4K7D2kosmAeZ4sVFjhoIDyH5Z7gt02', '0335793465', 'admin01');

-- Dumping structure for table movie_booking_ticket.user_roles
CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKrhfovtciq1l558cw6udg0h0d3` (`role_id`),
  CONSTRAINT `FK55itppkw3i07do3h7qoclqd4k` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKrhfovtciq1l558cw6udg0h0d3` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table movie_booking_ticket.user_roles: ~5 rows (approximately)
DELETE FROM `user_roles`;
INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
	('1416d5ecbb974f0a941f6c9f0d134635', 2),
	('32d27f97bf2648f6b08034dda0b6e37a', 2),
	('a919d4299d154908a06acf45d69cb64d', 3),
	('ae2a525fb21843c3ad6552276df5d56c', 4),
	('e30c3fa7574646948a50b161657ce03f', 3),
	('f781db09b0f44c30ac0821e15dcd1a09', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
