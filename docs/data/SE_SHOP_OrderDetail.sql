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
-- Table structure for table `OrderDetail`
--

DROP TABLE IF EXISTS `OrderDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderDetail` (
  `orderId` int(10) unsigned NOT NULL,
  `productId` int(10) unsigned NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  `price` bigint(20) unsigned NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderId`,`productId`),
  KEY `productId` (`productId`),
  CONSTRAINT `OrderDetail_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `Order` (`id`),
  CONSTRAINT `OrderDetail_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderDetail`
--

LOCK TABLES `OrderDetail` WRITE;
/*!40000 ALTER TABLE `OrderDetail` DISABLE KEYS */;
INSERT INTO `OrderDetail` VALUES (10,3,1,12300000,'2023-11-29 04:33:48','2023-11-29 04:33:48'),(10,5,1,12300000,'2023-11-29 04:33:48','2023-11-29 04:33:48'),(11,2,1,12300000,'2023-11-29 08:40:13','2023-11-29 08:40:13'),(11,581,1,999,'2023-11-29 08:40:13','2023-11-29 08:40:13'),(12,4,1,12300000,'2023-11-29 08:44:44','2023-11-29 08:44:44'),(12,107,1,7777,'2023-11-29 08:44:44','2023-11-29 08:44:44'),(13,2,3,12300000,'2023-11-29 15:44:13','2023-11-29 15:44:13'),(14,201,1,12234,'2023-11-29 15:57:31','2023-11-29 15:57:31'),(15,201,1,12234,'2023-11-29 15:58:54','2023-11-29 15:58:54'),(15,203,1,12234,'2023-11-29 15:58:54','2023-11-29 15:58:54'),(16,111,2,7777,'2023-11-29 16:00:10','2023-11-29 16:00:10'),(16,309,4,899,'2023-11-29 16:00:10','2023-11-29 16:00:10'),(17,205,1,12234,'2023-11-29 16:01:28','2023-11-29 16:01:28'),(17,581,2,999,'2023-11-29 16:01:28','2023-11-29 16:01:28'),(18,102,4,7777,'2023-11-29 17:23:36','2023-11-29 17:23:36'),(19,201,1,12234,'2023-11-30 02:32:00','2023-11-30 02:32:00'),(19,581,1,999,'2023-11-30 02:32:00','2023-11-30 02:32:00'),(20,301,4,999,'2023-11-30 02:34:13','2023-11-30 02:34:13'),(21,203,1,12234,'2023-12-01 07:20:43','2023-12-01 07:20:43'),(22,9,1,1111222,'2023-12-01 07:21:42','2023-12-01 07:21:42'),(23,212,1,1110,'2023-12-01 07:23:29','2023-12-01 07:23:29'),(24,8,3,1111111,'2023-12-01 08:27:48','2023-12-01 08:27:48'),(24,201,4,12234,'2023-12-01 08:27:48','2023-12-01 08:27:48'),(25,3,1,12300000,'2023-12-01 09:04:19','2023-12-01 09:04:19'),(26,11,7,9999999,'2023-12-01 11:03:14','2023-12-01 11:03:14'),(27,11,4,9999999,'2023-12-01 11:09:54','2023-12-01 11:09:54'),(27,403,2,597,'2023-12-01 11:09:54','2023-12-01 11:09:54'),(28,103,1,7777,'2023-12-01 18:53:59','2023-12-01 18:53:59'),(29,203,3,12234,'2023-12-02 02:40:20','2023-12-02 02:40:20'),(30,3,1,12300000,'2023-12-02 10:13:49','2023-12-02 10:13:49'),(30,305,1,899,'2023-12-02 10:13:49','2023-12-02 10:13:49'),(31,4,1,12300000,'2023-12-02 10:13:59','2023-12-02 10:13:59'),(32,4,1,12300000,'2023-12-02 13:19:04','2023-12-02 13:19:04'),(32,103,5,7777,'2023-12-02 13:19:04','2023-12-02 13:19:04'),(33,4,1,12300000,'2023-12-02 13:19:26','2023-12-02 13:19:26'),(34,201,6,12234,'2023-12-02 13:25:01','2023-12-02 13:25:01'),(34,304,5,899,'2023-12-02 13:25:01','2023-12-02 13:25:01'),(35,4,1,12300000,'2023-12-02 13:26:00','2023-12-02 13:26:00'),(36,3,3,12300000,'2023-12-02 13:38:28','2023-12-02 13:38:28'),(36,103,3,7777,'2023-12-02 13:38:28','2023-12-02 13:38:28'),(37,4,1,12300000,'2023-12-02 13:40:08','2023-12-02 13:40:08'),(38,103,6,7777,'2023-12-02 13:48:01','2023-12-02 13:48:01'),(38,201,4,12234,'2023-12-02 13:48:01','2023-12-02 13:48:01'),(39,107,3,7777,'2023-12-02 13:48:43','2023-12-02 13:48:43');
/*!40000 ALTER TABLE `OrderDetail` ENABLE KEYS */;
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
