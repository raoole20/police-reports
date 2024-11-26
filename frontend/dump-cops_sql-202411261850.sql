-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: cops_sql
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Condena`
--

DROP TABLE IF EXISTS `Condena`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Condena` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `sentencia` varchar(255) DEFAULT NULL,
  `tiempo_duracion` varchar(255) DEFAULT NULL,
  `condiciones` text,
  `reportes_id` int NOT NULL,
  `reportes_cargos_cometidos_cargos_id` int NOT NULL,
  PRIMARY KEY (`id`,`reportes_id`,`reportes_cargos_cometidos_cargos_id`),
  KEY `fk_Condena_reportes1_idx` (`reportes_id`,`reportes_cargos_cometidos_cargos_id`),
  CONSTRAINT `fk_Condena_reportes1` FOREIGN KEY (`reportes_id`) REFERENCES `reportes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Condena`
--

LOCK TABLES `Condena` WRITE;
/*!40000 ALTER TABLE `Condena` DISABLE KEYS */;
/*!40000 ALTER TABLE `Condena` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargos`
--

DROP TABLE IF EXISTS `cargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `fecha` date DEFAULT NULL,
  `delitos_id` int NOT NULL,
  `reportes_id` int NOT NULL,
  PRIMARY KEY (`id`,`delitos_id`,`reportes_id`),
  KEY `fk_cargos_delitos1_idx` (`delitos_id`),
  KEY `fk_cargos_reportes1_idx` (`reportes_id`),
  CONSTRAINT `fk_cargos_delitos1` FOREIGN KEY (`delitos_id`) REFERENCES `delitos` (`id`),
  CONSTRAINT `fk_cargos_reportes1` FOREIGN KEY (`reportes_id`) REFERENCES `reportes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargos`
--

LOCK TABLES `cargos` WRITE;
/*!40000 ALTER TABLE `cargos` DISABLE KEYS */;
INSERT INTO `cargos` VALUES (1,NULL,NULL,1,25),(2,NULL,NULL,1,28),(4,NULL,NULL,1,29),(6,NULL,NULL,1,30),(7,NULL,NULL,2,6),(9,NULL,NULL,1,31),(11,NULL,NULL,1,33),(13,NULL,NULL,1,34),(14,NULL,NULL,2,34),(15,NULL,NULL,3,34),(16,NULL,NULL,8,35),(17,NULL,NULL,5,35),(18,NULL,NULL,4,35),(19,NULL,NULL,6,35),(20,NULL,NULL,7,35),(21,NULL,NULL,10,35),(22,NULL,NULL,6,36),(23,NULL,NULL,2,36),(24,NULL,NULL,1,36),(25,NULL,NULL,4,36),(26,NULL,NULL,9,36),(27,NULL,NULL,5,36),(28,NULL,NULL,7,36),(29,NULL,NULL,8,36),(30,NULL,NULL,4,37);
/*!40000 ALTER TABLE `cargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudadanos`
--

DROP TABLE IF EXISTS `ciudadanos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudadanos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `cedula` int NOT NULL,
  `sexo` enum('M','F') NOT NULL,
  `estado_civil` enum('SOLTERO','CASADO','DIVORCIADO','VIUDO') NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cedula_UNIQUE` (`cedula`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudadanos`
--

LOCK TABLES `ciudadanos` WRITE;
/*!40000 ALTER TABLE `ciudadanos` DISABLE KEYS */;
INSERT INTO `ciudadanos` VALUES (1,'Juan','Pérez',123456789,'M','SOLTERO','1990-01-01'),(5,'Juan','Pérez',123456739,'M','SOLTERO','1990-01-01'),(7,'123','123',30643473,'M','DIVORCIADO','2024-11-04'),(12,'123','123',1231231230,'M','DIVORCIADO','2024-11-04'),(13,'123','123',123,'M','DIVORCIADO','2024-11-04'),(14,'123','123',123213,'M','DIVORCIADO','2024-11-04'),(15,'123','123',123213123,'M','DIVORCIADO','2024-11-04'),(16,'123','123',1232123,'M','DIVORCIADO','2024-11-04'),(20,'Raul Espina','123',31,'F','DIVORCIADO','2024-11-04'),(26,'123324','123234',82455255,'F','DIVORCIADO','2024-10-28'),(27,'123324','123234',306434799,'F','CASADO','2024-10-28'),(28,'Raul Espina','espina',30643,'F','CASADO','2024-11-05'),(29,'Raul Espina','123',88888,'F','CASADO','2024-11-18'),(31,'123123123','123123',30643471,'F','CASADO','2024-11-05'),(32,'Raul Espina','123',30647,'F','DIVORCIADO','2024-10-29'),(33,'123324','123123',30643474,'F','CASADO','2024-10-28'),(36,'232','2323423423',30643472,'F','CASADO','2024-11-13'),(37,'Raul Espina','123123',30643123,'F','DIVORCIADO','2024-11-04'),(38,'Raul Easdfspina','12312asfd3',30643127,'M','CASADO','2024-10-29'),(39,'Raul Espina','1erqw',7555555,'F','DIVORCIADO','1222-12-12'),(40,'asdfasdf','espina',51651654,'F','DIVORCIADO','2024-10-30');
/*!40000 ALTER TABLE `ciudadanos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contactos`
--

DROP TABLE IF EXISTS `contactos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contactos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_ciudadano` int NOT NULL,
  `tipo` enum('TELEFONO','CORREO') NOT NULL,
  `dato` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `id_ciudadano` FOREIGN KEY (`id`) REFERENCES `ciudadanos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactos`
--

LOCK TABLES `contactos` WRITE;
/*!40000 ALTER TABLE `contactos` DISABLE KEYS */;
/*!40000 ALTER TABLE `contactos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delitos`
--

DROP TABLE IF EXISTS `delitos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delitos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delitos`
--

LOCK TABLES `delitos` WRITE;
/*!40000 ALTER TABLE `delitos` DISABLE KEYS */;
INSERT INTO `delitos` VALUES (1,'Asesinato','Descripción de Asesinato'),(2,'Homicidio','Descripción de Homicidio'),(3,'Duelo','Descripción de Duelo'),(4,'Duelo','Descripción de Duelo'),(5,'Feminicidio','Descripción de Feminicidio'),(6,'Genocidio','Descripción de Genocidio'),(7,'Infanticidio','Descripción de Infanticidio'),(8,'Lesiones','Descripción de Lesiones'),(9,'Magnicidio','Descripción de Magnicidio'),(10,'Matricidio','Descripción de Matricidio');
/*!40000 ALTER TABLE `delitos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `descripcion_fisica`
--

DROP TABLE IF EXISTS `descripcion_fisica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `descripcion_fisica` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rasgos_faciales` varchar(255) NOT NULL,
  `color_cabello` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `estatura` float NOT NULL,
  `complexion` varchar(45) NOT NULL,
  `color_ojos` varchar(45) NOT NULL,
  `lentes` tinyint DEFAULT '0',
  `tatuajes` tinyint DEFAULT '0',
  `tipo_cabello` varchar(45) NOT NULL,
  `ciudadanos_id` int NOT NULL,
  `peso` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_descripcion_fisica_ciudadanos` (`ciudadanos_id`),
  CONSTRAINT `fk_descripcion_fisica_ciudadanos` FOREIGN KEY (`ciudadanos_id`) REFERENCES `ciudadanos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `descripcion_fisica`
--

LOCK TABLES `descripcion_fisica` WRITE;
/*!40000 ALTER TABLE `descripcion_fisica` DISABLE KEYS */;
INSERT INTO `descripcion_fisica` VALUES (1,'ESTO ES UN TEXTO DE PRUEBA','#000',12.2,'gordo','#000',0,0,'erizado',1,0),(2,'Nariz recta, cejas pobladas','Negro',1.75,'Atlética','Marrón',0,1,'Lacio',1,0),(3,'Nariz recta, cejas pobladas','Negro',1.75,'Atlética','Marrón',0,1,'Lacio',1,0),(9,'Nariz recta, cejas pobladas','Negro',1.75,'Atlética','Marrón',0,1,'Lacio',1,0),(10,'None','#905a5a',3,'None','#e1b7b7',1,1,'None',7,0),(11,'None','#af4b4b',3,'None','#c29494',1,1,'None',7,0),(12,'None','#af4b4b',3,'None','#c29494',1,1,'None',7,0),(13,'None','#af4b4b',3,'None','#c29494',1,1,'None',7,0),(14,'234234','#905a5a',3,'3323423','#e1b7b7',1,1,'None',7,0),(15,'234234','#905a5a',3,'3323423','#e1b7b7',1,1,'None',7,0),(16,'Nariz recta, cejas pobladas','Negro',1.75,'Atlética','Marrón',0,1,'Lacio',1,123),(17,'234234','#905a5a',3,'3323423','#e1b7b7',1,1,'None',7,4),(18,'esto es una descripcion','#602020',5,'12','#8e4343',1,1,'None',39,3),(19,'esto es una descripcion 3','#602020',5,'12','#8e4343',1,1,'None',39,3),(20,'32234234324324234','#402b2b',4,'3323423','#6a5353',1,1,'None',40,4);
/*!40000 ALTER TABLE `descripcion_fisica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direcciones`
--

DROP TABLE IF EXISTS `direcciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direcciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `pais` varchar(100) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `ciudad` varchar(100) NOT NULL,
  `codigo_postal` int NOT NULL,
  `ciudadanos_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_direcciones_ciudadanos1_idx` (`ciudadanos_id`),
  CONSTRAINT `fk_direcciones_ciudadanos1` FOREIGN KEY (`ciudadanos_id`) REFERENCES `ciudadanos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direcciones`
--

LOCK TABLES `direcciones` WRITE;
/*!40000 ALTER TABLE `direcciones` DISABLE KEYS */;
INSERT INTO `direcciones` VALUES (1,'Calle Falsa 123','País Ejemplo','Estado Ejemplo','Ciudad Ejemplo',12345,1);
/*!40000 ALTER TABLE `direcciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evidencia`
--

DROP TABLE IF EXISTS `evidencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evidencia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` text,
  `fecha_hora` datetime DEFAULT NULL,
  `tipo` text,
  `estado` enum('REVISION','REVISADA','ACEPTADA','RECHAZADA') DEFAULT NULL,
  `reportes_id` int NOT NULL,
  PRIMARY KEY (`id`,`reportes_id`),
  KEY `fk_evidencia_reportes1_idx` (`reportes_id`),
  CONSTRAINT `fk_evidencia_reportes1` FOREIGN KEY (`reportes_id`) REFERENCES `reportes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evidencia`
--

LOCK TABLES `evidencia` WRITE;
/*!40000 ALTER TABLE `evidencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `evidencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policias`
--

DROP TABLE IF EXISTS `policias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `rango` enum('CADETE','OFICIAL') DEFAULT 'CADETE',
  `contrasena` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `id_policia` varchar(225) NOT NULL,
  `cedula` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cedula` (`cedula`),
  CONSTRAINT `policias_chk_1` CHECK ((`cedula` > 0)),
  CONSTRAINT `policias_chk_2` CHECK ((`cedula` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policias`
--

LOCK TABLES `policias` WRITE;
/*!40000 ALTER TABLE `policias` DISABLE KEYS */;
INSERT INTO `policias` VALUES (6,'raul01','un apellido','OFICIAL','/oGhWc9L0os+kG+BfkUQPotIHIdgCh7gDDbFvjS4X9o=','f288b086-a9d7-11ef-abe0-0242ac120002',30643473,'2024-11-23 20:19:27','2024-11-25 02:48:03'),(16,'raul01','un apellido','CADETE','E2/eDCBWKTylw10LvfcRzHqUE3zYDGFf/JlyQTL3JT0=','0eac0545-a9da-11ef-abe0-0242ac120002',30643471,'2024-11-23 20:32:28','2024-11-24 23:18:21'),(17,'Raul Espina','espina','CADETE','cq/jSnW6kMlpls32UZAP6/lIpBlP3gTc7v8vvQMmgM8=','c2c0e37c-aac6-11ef-b4b1-0242ac120002',434234234,'2024-11-25 00:46:51','2024-11-25 02:48:16'),(19,'Raul Espina123','espina','OFICIAL','ZWdyfXVlJhoJ3+aGZ/9a/pffYou6aqTR0/X/+aGNSXQ=','41e3f601-aad6-11ef-b4b1-0242ac120002',4532,'2024-11-25 02:37:47','2024-11-25 02:37:47'),(20,'Raul Espina','espina','OFICIAL','ATLNP3Nie9G0BvLzW1WTd9Z00VAbKIDJ57/erY0E2dk=','cac0179c-aad7-11ef-b4b1-0242ac120002',4,'2024-11-25 02:48:46','2024-11-25 02:48:46'),(21,'melany','molero','OFICIAL','K3WbJQUYhGcBtnRP4a3tUa2GUoOlSj02YG6HgnE/6r8=','838daf7b-ac46-11ef-96a5-0242ac120002',30070094,'2024-11-26 22:33:52','2024-11-26 22:33:52');
/*!40000 ALTER TABLE `policias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportes`
--

DROP TABLE IF EXISTS `reportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `id_policia` int NOT NULL,
  `descripcion` text NOT NULL,
  `estatus` enum('IMPUTADO','CULPABLE','INOCENTE') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'IMPUTADO',
  `ciudadanos_id` int NOT NULL,
  `direcciones_id1` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reportes_ciudadanos1_idx` (`ciudadanos_id`),
  KEY `fk_reportes_direcciones1_idx` (`direcciones_id1`),
  CONSTRAINT `fk_reportes_ciudadanos1` FOREIGN KEY (`ciudadanos_id`) REFERENCES `ciudadanos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportes`
--

LOCK TABLES `reportes` WRITE;
/*!40000 ALTER TABLE `reportes` DISABLE KEYS */;
INSERT INTO `reportes` VALUES (6,'2024-11-26',6,'123123123','CULPABLE',1,NULL),(16,'2024-11-26',6,'123123123','INOCENTE',1,NULL),(17,'2024-11-26',6,'123123123','CULPABLE',1,NULL),(19,'2024-11-26',6,'123123123','CULPABLE',1,NULL),(20,'2024-11-26',6,'123123123','IMPUTADO',1,NULL),(25,'2024-11-26',6,'123123123','IMPUTADO',1,NULL),(26,'2023-10-15',6,'Descripción del reporte','IMPUTADO',1,NULL),(27,'2023-10-15',6,'Descripción del reporte','IMPUTADO',1,NULL),(28,'2023-10-15',6,'Descripción del reporte','IMPUTADO',1,NULL),(29,'2023-10-15',6,'Descripción del reporte','IMPUTADO',1,NULL),(30,'2023-10-15',6,'Descripción del reporte','IMPUTADO',1,NULL),(31,'2023-10-15',6,'Descripción del reporte','IMPUTADO',1,NULL),(32,'2024-11-26',6,'123123123','IMPUTADO',1,NULL),(33,'2023-10-15',6,'Descripción del reporte','IMPUTADO',1,NULL),(34,'2023-10-15',6,'Descripción del reporte','IMPUTADO',1,NULL),(35,'2024-11-13',6,'fgdfgfdg','IMPUTADO',7,NULL),(36,'2024-11-13',21,'23123123','IMPUTADO',40,NULL),(37,'2024-11-20',21,'tgfdgdsfgsfdsfdgfdsgsfdg','IMPUTADO',40,NULL);
/*!40000 ALTER TABLE `reportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cops_sql'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-26 18:50:02
