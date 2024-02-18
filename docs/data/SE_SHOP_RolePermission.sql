-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: SE_SHOP
-- ------------------------------------------------------
-- Server version	5.7.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `RolePermission`
--

DROP TABLE IF EXISTS `RolePermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RolePermission` (
  `roleId` tinyint(3) unsigned NOT NULL,
  `permissionId` int(10) unsigned NOT NULL,
  `assignerId` int(10) unsigned NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`roleId`,`permissionId`),
  KEY `permissionId` (`permissionId`),
  KEY `assignerId` (`assignerId`),
  CONSTRAINT `RolePermission_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `Role` (`id`),
  CONSTRAINT `RolePermission_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `Permission` (`id`),
  CONSTRAINT `RolePermission_ibfk_3` FOREIGN KEY (`assignerId`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RolePermission`
--

LOCK TABLES `RolePermission` WRITE;
/*!40000 ALTER TABLE `RolePermission` DISABLE KEYS */;
INSERT INTO `RolePermission` VALUES (1,3,1,'2023-11-28 11:20:04','2023-11-28 11:20:04'),(1,4,1,'2023-11-28 11:20:43','2023-11-28 11:20:43'),(1,5,1,'2023-11-28 11:20:54','2023-11-28 11:20:54'),(1,6,1,'2023-11-28 11:20:59','2023-11-28 11:20:59'),(1,7,1,'2023-11-28 11:21:02','2023-11-28 11:21:02'),(1,8,1,'2023-11-28 11:21:04','2023-11-28 11:21:04'),(1,9,1,'2023-11-28 11:21:07','2023-11-28 11:21:07'),(1,10,1,'2023-11-28 11:21:10','2023-11-28 11:21:10'),(1,11,1,'2023-11-28 11:21:17','2023-11-28 11:21:17'),(1,12,1,'2023-11-28 11:21:24','2023-11-28 11:21:24'),(1,13,1,'2023-11-28 11:21:26','2023-11-28 11:21:26'),(1,14,1,'2023-11-28 11:21:29','2023-11-28 11:21:29'),(1,15,1,'2023-11-28 11:21:38','2023-11-28 11:21:38'),(1,16,1,'2023-11-28 11:21:43','2023-11-28 11:21:43'),(1,17,1,'2023-11-28 11:22:06','2023-11-28 11:22:06'),(1,18,1,'2023-11-28 11:22:20','2023-11-28 11:22:20'),(1,19,1,'2023-11-28 11:22:24','2023-11-28 11:22:24'),(1,20,1,'2023-11-28 11:22:47','2023-11-28 11:22:47'),(1,22,1,'2023-11-28 11:22:56','2023-11-28 11:22:56'),(1,23,1,'2023-11-28 11:23:14','2023-11-28 11:23:14'),(1,24,1,'2023-11-28 11:23:17','2023-11-28 11:23:17'),(1,25,1,'2023-11-28 11:23:19','2023-11-28 11:23:19'),(1,26,1,'2023-11-28 11:23:22','2023-11-28 11:23:22'),(1,27,1,'2023-11-28 11:23:25','2023-11-28 11:23:25'),(1,28,1,'2023-11-28 11:23:29','2023-11-28 11:23:29'),(1,29,1,'2023-11-28 11:23:33','2023-11-28 11:23:33'),(1,30,1,'2023-11-28 11:23:41','2023-11-28 11:23:41'),(1,31,1,'2023-11-28 11:23:45','2023-11-28 11:23:45'),(1,32,1,'2023-11-28 11:23:47','2023-11-28 11:23:47'),(1,33,1,'2023-11-28 11:23:49','2023-11-28 11:23:49'),(1,34,1,'2023-11-28 11:23:52','2023-11-28 11:23:52'),(1,35,1,'2023-11-28 11:24:02','2023-11-28 11:24:02'),(1,36,1,'2023-11-28 11:24:04','2023-11-28 11:24:04'),(1,37,1,'2023-11-28 11:24:09','2023-11-28 11:24:09'),(1,38,1,'2023-11-28 11:24:11','2023-11-28 11:24:11'),(1,39,1,'2023-11-28 11:24:14','2023-11-28 11:24:14'),(1,40,1,'2023-11-28 11:24:19','2023-11-28 11:24:19'),(1,41,1,'2023-11-28 11:24:23','2023-11-28 11:24:23'),(1,42,1,'2023-11-28 11:24:25','2023-11-28 11:24:25'),(1,43,1,'2023-11-28 11:24:28','2023-11-28 11:24:28'),(1,44,1,'2023-11-28 11:24:33','2023-11-28 11:24:33'),(1,45,1,'2023-11-28 11:24:38','2023-11-28 11:24:38'),(1,46,1,'2023-11-28 11:24:40','2023-11-28 11:24:40'),(1,47,1,'2023-11-28 11:24:44','2023-11-28 11:24:44'),(1,49,1,'2023-11-28 11:25:06','2023-11-28 11:25:06'),(1,50,1,'2023-11-28 11:25:15','2023-11-28 11:25:15'),(1,51,1,'2023-11-28 11:25:18','2023-11-28 11:25:18'),(1,53,1,'2023-11-28 11:26:17','2023-11-28 11:26:17'),(1,57,1,'2023-11-28 11:32:22','2023-11-28 11:32:22'),(1,58,1,'2023-11-28 11:32:27','2023-11-28 11:32:27'),(1,59,1,'2023-11-28 11:32:30','2023-11-28 11:32:30'),(1,60,1,'2023-11-28 11:32:33','2023-11-28 11:32:33'),(1,64,1,'2023-11-28 11:32:48','2023-11-28 11:32:48'),(1,65,1,'2023-11-28 11:32:52','2023-11-28 11:32:52'),(1,66,1,'2023-11-28 11:32:55','2023-11-28 11:32:55'),(1,67,1,'2023-11-28 11:32:58','2023-11-28 11:32:58'),(1,68,1,'2023-11-28 11:33:00','2023-11-28 11:33:00'),(1,69,1,'2023-11-28 11:33:03','2023-11-28 11:33:03'),(1,70,1,'2023-11-28 11:33:09','2023-11-28 11:33:09'),(1,71,1,'2023-11-28 11:33:11','2023-11-28 11:33:11'),(1,74,1,'2023-11-28 11:33:22','2023-11-28 11:33:22'),(1,75,1,'2023-11-28 11:33:24','2023-11-28 11:33:24'),(1,76,1,'2023-11-29 01:45:32','2023-11-29 01:45:32'),(1,77,1,'2023-11-29 01:42:50','2023-11-29 01:42:50'),(1,79,1,'2023-11-29 14:37:51','2023-11-29 14:37:51'),(1,81,1,'2023-11-29 07:29:38','2023-11-29 07:29:38'),(1,82,1,'2023-11-29 07:29:49','2023-11-29 07:29:49'),(1,83,1,'2023-11-29 15:48:26','2023-11-29 15:48:26'),(1,84,1,'2023-11-29 03:30:37','2023-11-29 03:30:37'),(1,88,1,'2023-11-28 11:44:18','2023-11-28 11:44:18'),(1,89,1,'2023-11-28 11:44:23','2023-11-28 11:44:23'),(1,90,1,'2023-11-28 11:44:30','2023-11-28 11:44:30'),(1,91,1,'2023-11-28 11:44:33','2023-11-28 11:44:33'),(1,96,1,'2023-11-29 14:25:03','2023-11-29 14:25:03'),(1,97,1,'2023-11-29 11:48:52','2023-11-29 11:48:52'),(1,102,1,'2023-11-29 15:58:47','2023-11-29 15:58:47'),(1,103,1,'2023-11-30 17:57:51','2023-11-30 17:57:51'),(2,4,1,'2023-11-28 11:58:03','2023-11-28 11:58:03'),(2,35,1,'2023-11-28 11:47:17','2023-11-28 11:47:17'),(2,36,1,'2023-11-28 11:47:27','2023-11-28 11:47:27'),(2,40,1,'2023-11-28 11:47:54','2023-11-28 11:47:54'),(2,41,1,'2023-11-28 11:48:02','2023-11-28 11:48:02'),(2,57,1,'2023-11-28 11:49:16','2023-11-28 11:49:16'),(2,58,1,'2023-11-28 11:49:24','2023-11-28 11:49:24'),(2,59,1,'2023-11-28 11:49:29','2023-11-28 11:49:29'),(2,60,1,'2023-11-28 11:49:33','2023-11-28 11:49:33'),(2,64,1,'2023-11-28 11:49:49','2023-11-28 11:49:49'),(2,65,1,'2023-11-28 11:49:53','2023-11-28 11:49:53'),(2,66,1,'2023-11-28 11:50:05','2023-11-28 11:50:05'),(2,67,1,'2023-11-28 11:50:08','2023-11-28 11:50:08'),(2,70,1,'2023-11-28 11:50:33','2023-11-28 11:50:33'),(2,71,1,'2023-11-28 11:50:40','2023-11-28 11:50:40'),(2,88,1,'2023-11-28 11:52:46','2023-11-28 11:52:46'),(2,89,1,'2023-11-28 11:52:49','2023-11-28 11:52:49'),(2,90,1,'2023-11-28 11:52:55','2023-11-28 11:52:55'),(2,91,1,'2023-11-28 11:53:00','2023-11-28 11:53:00'),(3,4,1,'2023-11-28 11:58:06','2023-11-28 11:58:06'),(3,70,1,'2023-11-28 11:53:42','2023-11-28 11:53:42'),(3,71,1,'2023-11-28 11:53:48','2023-11-28 11:53:48'),(3,76,1,'2023-11-28 11:54:13','2023-11-28 11:54:13'),(3,77,1,'2023-11-28 11:54:19','2023-11-28 11:54:19'),(3,78,1,'2023-11-28 11:54:28','2023-11-28 11:54:28'),(3,79,1,'2023-11-28 11:54:30','2023-11-28 11:54:30'),(3,81,1,'2023-11-28 11:54:39','2023-11-28 11:54:39'),(3,82,1,'2023-11-28 11:54:51','2023-11-28 11:54:51'),(3,83,1,'2023-11-28 11:55:00','2023-11-28 11:55:00'),(3,84,1,'2023-11-28 11:55:07','2023-11-28 11:55:07'),(3,85,1,'2023-11-28 11:55:12','2023-11-28 11:55:12'),(3,86,1,'2023-11-28 11:55:16','2023-11-28 11:55:16'),(3,87,1,'2023-11-28 11:55:27','2023-11-28 11:55:27'),(3,96,1,'2023-11-29 11:48:03','2023-11-29 11:48:03'),(3,102,1,'2023-12-01 11:09:36','2023-12-01 11:09:36'),(3,104,1,'2023-12-01 10:29:57','2023-12-01 10:29:57'),(3,105,1,'2023-12-01 10:30:01','2023-12-01 10:30:01'),(3,106,1,'2023-12-01 10:30:05','2023-12-01 10:30:05');
/*!40000 ALTER TABLE `RolePermission` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-02 20:59:13
