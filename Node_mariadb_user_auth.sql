-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               10.5.9-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for mern_stack_auth
CREATE DATABASE IF NOT EXISTS `mern_stack_auth` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `mern_stack_auth`;

-- Dumping structure for table mern_stack_auth.tbl_page
CREATE TABLE IF NOT EXISTS `tbl_page` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `pageName` varchar(255) DEFAULT '0',
  `pageLink` varchar(255) DEFAULT '0',
  `hide` tinyint(1) DEFAULT NULL,
  `menuText` varchar(255) DEFAULT NULL,
  `menuTootltip` varchar(255) DEFAULT NULL,
  `menuOrder` varchar(255) DEFAULT NULL,
  `pageTitle` varchar(255) DEFAULT NULL,
  `pageText` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table mern_stack_auth.tbl_page: ~0 rows (approximately)
DELETE FROM `tbl_page`;
/*!40000 ALTER TABLE `tbl_page` DISABLE KEYS */;
INSERT INTO `tbl_page` (`id`, `pageName`, `pageLink`, `hide`, `menuText`, `menuTootltip`, `menuOrder`, `pageTitle`, `pageText`) VALUES
	(2, 'sadsadasdas', 'wewqewqe', 1, 'qweqwewqe', 'qwewqe', 'wqewqewqew', 'qwewqewq', 'wqewqewqqw');
/*!40000 ALTER TABLE `tbl_page` ENABLE KEYS */;

-- Dumping structure for table mern_stack_auth.tbl_user
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT '0',
  `user_password` varchar(255) DEFAULT '0',
  `user_email` varchar(255) DEFAULT '0',
  `profile_pic` varchar(255) DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table mern_stack_auth.tbl_user: ~0 rows (approximately)
DELETE FROM `tbl_user`;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
