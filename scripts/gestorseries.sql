-- phpMyAdmin SQL Dump
-- version 3.5.5
-- http://www.phpmyadmin.net
--
-- Servidor: localhost:3308
-- Tiempo de generación: 07-03-2013 a las 21:43:25
-- Versión del servidor: 5.5.29
-- Versión de PHP: 5.4.11

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `gestorseries`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actores`
--

CREATE TABLE IF NOT EXISTS `actores` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `nombre_actor` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ape1_actor` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ape2_actor` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `fecha_nac` date NOT NULL,
  `lugar_nac` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=21 ;

--
-- Volcado de datos para la tabla `actores`
--

INSERT INTO `actores` (`id`, `nombre_actor`, `ape1_actor`, `ape2_actor`, `fecha_nac`, `lugar_nac`) VALUES
(2, 'Josh', 'T', 'Radnor', '1974-07-29', 'Ohio'),
(4, 'Alyson', 'Lee', 'Hannigan', '1974-03-24', 'DC'),
(6, 'Jim', 'Joseph', 'Parsons', '1973-03-24', 'Texas'),
(7, 'Josh', 'Lee', 'Holloway', '1969-07-20', 'California'),
(8, 'Matthew', 'Chandler', 'Fox', '1966-07-14', 'Pennsylvania'),
(9, 'Michael', 'Carlyle', 'Hall', '1971-02-01', 'North Carolina'),
(10, 'Jennifer', 'Leann', 'Carpenter', '1979-12-07', 'Kentucky'),
(11, 'Andrew', 'James', 'Lincoln', '1973-09-14', 'England'),
(12, 'Sarah', 'Wayne', 'Callies', '1977-06-01', 'Illinois'),
(13, 'Daniel', 'Louis', 'Castellaneta', '1957-10-29', 'Illinois'),
(14, 'Julie2', 'Deborah', 'Kavner', '1950-09-07', 'California'),
(18, 'Jennifer ', 'Blas', 'Lawrence', '0010-05-24', 'Utah');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE IF NOT EXISTS `generos` (
  `nombre` varchar(100) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`nombre`, `id`) VALUES
('Comedia', 1),
('Drama', 2),
('Accion', 5),
('Thriller', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `series`
--

CREATE TABLE IF NOT EXISTS `series` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `nombre_serie` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `canal` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `temporadas` int(6) NOT NULL,
  `capitulos` int(6) NOT NULL,
  `año` int(4) NOT NULL,
  `genero_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `genero_id` (`genero_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=21 ;

--
-- Volcado de datos para la tabla `series`
--

INSERT INTO `series` (`id`, `nombre_serie`, `canal`, `temporadas`, `capitulos`, `año`, `genero_id`) VALUES
(2, 'The Big Bang Theory', 'CBS', 8, 144, 2007, 1),
(5, 'The Walking Dead', 'AMC', 3, 30, 2010, 1),
(7, 'Smallville', 'CBS', 10, 100, 2001, 5),
(8, 'Juego de tronos', 'HBO', 2, 20, 2011, 1),
(14, 'Cuentame', 'tv1', 3, 15, 2001, 1),
(16, 'El quijote', 'la 1', 10, 10, 2010, 2),
(17, 'Gossip Girl', 'The CW', 6, 203, 2005, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `series_actores`
--

CREATE TABLE IF NOT EXISTS `series_actores` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_serie` int(10) DEFAULT NULL,
  `id_actor` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=31 ;

--
-- Volcado de datos para la tabla `series_actores`
--

INSERT INTO `series_actores` (`id`, `id_serie`, `id_actor`) VALUES
(1, 2, 1),
(3, 1, 3),
(4, 1, 4),
(5, 2, 5),
(7, 3, 7),
(8, 3, 8),
(9, 4, 9),
(10, 4, 10),
(11, 5, 11),
(13, 6, 13),
(14, 6, 14),
(15, 7, 2),
(18, 2, 6),
(19, 8, 2),
(20, 14, 2),
(21, 5, 2),
(22, 15, 2),
(24, 7, 6),
(26, 5, 2),
(28, 8, 2),
(29, 17, 2),
(30, 17, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `apellido` varchar(255) CHARACTER SET ucs2 COLLATE ucs2_unicode_ci NOT NULL,
  `login` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=8 ;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `login`, `password`) VALUES
(1, 'Anna', 'Ramada', 'annasoto', 'annasoto'),
(2, 'Barbara', 'Picard', 'bapicsan', 'bapicsan'),
(3, 'Alicia', 'Navarro', 'alinav', 'alinav'),
(4, 'Elena', 'Garcia', 'elegaor', 'elegaor'),
(5, 'Vicenta', 'Esteve', 'vicenes', 'vicenes'),
(6, 'Marta', 'Perez', 'martape', 'martape'),
(7, 'Sofia', 'Antonella', 'sofiafelix92', 'administrador');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `series`
--
ALTER TABLE `series`
  ADD CONSTRAINT `series_ibfk_1` FOREIGN KEY (`genero_id`) REFERENCES `generos` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
