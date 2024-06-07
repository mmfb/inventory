-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: inventory
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `p_id` int NOT NULL AUTO_INCREMENT,
  `p_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`p_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Ovos'),(2,'Leite'),(3,'Pão 500g');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoplist`
--

DROP TABLE IF EXISTS `shoplist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shoplist` (
  `s_id` int NOT NULL AUTO_INCREMENT,
  `s_name` varchar(45) NOT NULL,
  `s_u_id` int NOT NULL,
  PRIMARY KEY (`s_id`),
  KEY `fk_storage_user_idx` (`s_u_id`),
  CONSTRAINT `fk_shoplist_user` FOREIGN KEY (`s_u_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoplist`
--

LOCK TABLES `shoplist` WRITE;
/*!40000 ALTER TABLE `shoplist` DISABLE KEYS */;
INSERT INTO `shoplist` VALUES (1,'Compras 13/05',4);
/*!40000 ALTER TABLE `shoplist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoplist_item`
--

DROP TABLE IF EXISTS `shoplist_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shoplist_item` (
  `si_id` int NOT NULL AUTO_INCREMENT,
  `si_p_id` int NOT NULL,
  `si_s_id` int NOT NULL,
  `si_quant_needed` int NOT NULL,
  `si_quant_bought` int NOT NULL,
  PRIMARY KEY (`si_id`),
  KEY `fk_storage_stor_item_idx` (`si_s_id`),
  KEY `fk_prod_stor_item_idx` (`si_p_id`),
  CONSTRAINT `fk_prod_sl_item` FOREIGN KEY (`si_p_id`) REFERENCES `product` (`p_id`),
  CONSTRAINT `fk_shoplist_sl_item` FOREIGN KEY (`si_s_id`) REFERENCES `shoplist` (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoplist_item`
--

LOCK TABLES `shoplist_item` WRITE;
/*!40000 ALTER TABLE `shoplist_item` DISABLE KEYS */;
INSERT INTO `shoplist_item` VALUES (1,1,1,3,0),(2,3,1,1,0),(3,2,1,6,6);
/*!40000 ALTER TABLE `shoplist_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage`
--

DROP TABLE IF EXISTS `storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storage` (
  `s_id` int NOT NULL AUTO_INCREMENT,
  `s_name` varchar(45) NOT NULL,
  `s_u_id` int NOT NULL,
  PRIMARY KEY (`s_id`),
  KEY `fk_storage_user_idx` (`s_u_id`),
  CONSTRAINT `fk_storage_user` FOREIGN KEY (`s_u_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage`
--

LOCK TABLES `storage` WRITE;
/*!40000 ALTER TABLE `storage` DISABLE KEYS */;
INSERT INTO `storage` VALUES (1,'Pantry',4),(2,'Fridge',4);
/*!40000 ALTER TABLE `storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage_item`
--

DROP TABLE IF EXISTS `storage_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storage_item` (
  `si_id` int NOT NULL AUTO_INCREMENT,
  `si_p_id` int NOT NULL,
  `si_s_id` int NOT NULL,
  `si_date` date DEFAULT NULL,
  `si_quant` int NOT NULL,
  PRIMARY KEY (`si_id`),
  KEY `fk_storage_stor_item_idx` (`si_s_id`),
  KEY `fk_prod_stor_item_idx` (`si_p_id`),
  CONSTRAINT `fk_prod_stor_item` FOREIGN KEY (`si_p_id`) REFERENCES `product` (`p_id`),
  CONSTRAINT `fk_storage_stor_item` FOREIGN KEY (`si_s_id`) REFERENCES `storage` (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage_item`
--

LOCK TABLES `storage_item` WRITE;
/*!40000 ALTER TABLE `storage_item` DISABLE KEYS */;
INSERT INTO `storage_item` VALUES (1,1,1,'2024-05-12',2),(2,2,2,'2024-05-28',3),(3,1,1,'2024-06-10',6);
/*!40000 ALTER TABLE `storage_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `u_id` int NOT NULL AUTO_INCREMENT,
  `u_name` varchar(45) NOT NULL,
  `u_pass` varchar(100) NOT NULL,
  `u_full_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (4,'jc','$2b$10$R8Nkuwt7tvUcuOT5SVCiq.ZIHsIFDUi6jpQ1VJh14d3vM/rjQXOzy','Junior Cesar'),(5,'mb','$2b$10$lSO6ZRUO.bqLKJcBUUCvnun9XG5.FVakKwJeoDr3pjTrKAOt2.SV.','Miguel Bugalho'),(7,'john','$2b$10$iIk2jsY1/Ja2Gscgbmtmd.Ie/nPlG7ZhWqnQYyo60rMWp5Bsugkd.','John Smith');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-04 21:03:00
