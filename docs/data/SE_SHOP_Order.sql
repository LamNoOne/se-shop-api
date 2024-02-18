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
-- Table structure for table `Order`
--

DROP TABLE IF EXISTS `Order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Order` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `orderStatusId` tinyint(3) unsigned NOT NULL,
  `paymentFormId` tinyint(3) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `shipAddress` varchar(100) DEFAULT NULL,
  `phoneNumber` varchar(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `orderStatusId` (`orderStatusId`),
  KEY `paymentFormId` (`paymentFormId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Order_ibfk_1` FOREIGN KEY (`orderStatusId`) REFERENCES `OrderStatus` (`id`),
  CONSTRAINT `Order_ibfk_2` FOREIGN KEY (`paymentFormId`) REFERENCES `PaymentForm` (`id`),
  CONSTRAINT `Order_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order`
--

LOCK TABLES `Order` WRITE;
/*!40000 ALTER TABLE `Order` DISABLE KEYS */;
INSERT INTO `Order` VALUES (10,1,1,1,'Q. Tân Bình, TP. Hồ Chí Minh','0834480241','2023-11-29 04:33:48','2023-12-01 18:16:36'),(11,1,1,1,'Q. Tân Bình, TP. Hồ Chí Minh','0834480241','2023-11-29 08:40:13','2023-11-29 08:40:13'),(12,1,1,1,'Q. Tân Bình, TP. Hồ Chí Minh','0834480241','2023-11-29 08:44:44','2023-11-29 08:44:44'),(13,1,1,1,'Q. Tân Bình, TP. Hồ Chí Minh','0988437477','2023-11-29 15:44:13','2023-11-29 15:44:13'),(14,1,1,1,'Q. Tân Bình, TP. Hồ Chí Minh','0834480241','2023-11-29 15:57:31','2023-11-29 15:57:31'),(15,1,1,1,'Q. Tân Bình, TP. Hồ Chí Minh','0834480241','2023-11-29 15:58:54','2023-11-29 15:58:54'),(16,1,1,1,'Q. Tân Bình, TP. Hồ Chí Minh','0834480241','2023-11-29 16:00:10','2023-11-29 16:00:10'),(17,1,1,1,'Q. Tân Bình, TP. Hồ Chí Minh','0834480241','2023-11-29 16:01:28','2023-11-29 16:01:28'),(18,1,1,1,'Q. Tân Bình, TP. Hồ Chí Minh','0834480241','2023-11-29 17:23:36','2023-11-29 17:23:36'),(19,1,1,1,'Q. Tân Bình, TP. Hồ Chí Minh','0834480241','2023-11-30 02:32:00','2023-11-30 02:32:00'),(20,1,1,1,'Q. Tân Bình, TP. Hồ Chí Minh','0834480241','2023-11-30 02:34:13','2023-11-30 02:34:13'),(21,1,1,1,'Q. Tân Bình, TP. Hồ Chí Minh','0834480241','2023-12-01 07:20:43','2023-12-01 07:20:43'),(22,1,2,1,'Q. Tân Bình, TP. Hồ Chí Minh','0834480241','2023-12-01 07:21:42','2023-12-01 07:21:42'),(23,1,2,1,'Q. Tân Bình, TP. Hồ Chí Minh','0834480241','2023-12-01 07:23:29','2023-12-01 07:23:29'),(24,1,1,1,'Q. Tân Bình, TP. Hồ Chí Minh','0834480241','2023-12-01 08:27:48','2023-12-01 08:27:48'),(25,1,1,1,'Q. Tân Bình, TP. Hồ Chí Minh','0834480241','2023-12-01 09:04:19','2023-12-01 09:04:19'),(26,4,1,7,'ABC tower 123','0834480240','2023-12-01 11:03:14','2023-12-01 18:59:25'),(27,3,1,7,'ABC tower 123','0834480240','2023-12-01 11:09:54','2023-12-01 18:59:35'),(28,2,1,7,'102 Tan Binh','0834480240','2023-12-01 18:53:59','2023-12-01 18:59:51'),(29,4,1,7,'102 Tan Binh','0834480240','2023-12-02 02:40:20','2023-12-02 02:46:20'),(30,1,1,8,'ABC tower 123','0834480248','2023-12-02 10:13:49','2023-12-02 10:13:49'),(31,1,1,8,'ABC tower 123','0834480248','2023-12-02 10:13:59','2023-12-02 10:13:59'),(32,1,1,12,'ABC Tower','0831480259','2023-12-02 13:19:04','2023-12-02 13:19:04'),(33,1,1,12,'ABC Tower','0831480259','2023-12-02 13:19:26','2023-12-02 13:19:26'),(34,1,1,13,'ABC Tower','0834123488','2023-12-02 13:25:01','2023-12-02 13:25:01'),(35,1,1,13,'ABC Tower','0834123488','2023-12-02 13:26:00','2023-12-02 13:26:00'),(36,1,1,14,'ABC Tower','0832038769','2023-12-02 13:38:28','2023-12-02 13:38:28'),(37,1,1,14,'ABC Tower','0832038769','2023-12-02 13:40:08','2023-12-02 13:40:08'),(38,1,1,15,'ABC Tower','0823456789','2023-12-02 13:48:01','2023-12-02 13:48:01'),(39,1,1,15,'ABC Tower','0823456789','2023-12-02 13:48:43','2023-12-02 13:48:43');
/*!40000 ALTER TABLE `Order` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-02 20:59:12
