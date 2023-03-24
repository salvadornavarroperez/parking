-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-03-2023 a las 11:34:04
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `parking`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fechas`
--

CREATE TABLE `fechas` (
  `id_fecha` int(11) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodo_pago`
--

CREATE TABLE `metodo_pago` (
  `id_metodo` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `numero_tarjeta` int(18) NOT NULL,
  `nombre_tarjeta` varchar(50) NOT NULL,
  `fecha_caducidad` date NOT NULL,
  `cvc` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos_socios`
--

CREATE TABLE `pagos_socios` (
  `Id_pago` int(11) NOT NULL,
  `id_socio` int(11) NOT NULL,
  `id_fecha` int(11) NOT NULL,
  `monto` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plazas`
--

CREATE TABLE `plazas` (
  `Id_plaza` int(11) NOT NULL,
  `número_plaza` int(11) NOT NULL,
  `disponible` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `plazas`
--

INSERT INTO `plazas` (`Id_plaza`, `número_plaza`, `disponible`) VALUES
(1, 1, 0),
(2, 2, 1),
(3, 3, 1),
(4, 4, 0),
(5, 5, 0),
(6, 6, 0),
(7, 7, 0),
(8, 8, 1),
(9, 9, 1),
(10, 10, 0),
(11, 11, 1),
(12, 12, 1),
(13, 13, 1),
(14, 14, 0),
(15, 15, 1),
(16, 16, 0),
(17, 17, 1),
(18, 18, 1),
(19, 19, 1),
(20, 20, 0),
(21, 21, 0),
(22, 22, 1),
(23, 23, 0),
(24, 24, 1),
(25, 25, 0),
(26, 26, 1),
(27, 27, 1),
(28, 28, 0),
(29, 29, 0),
(30, 30, 1),
(31, 31, 0),
(32, 32, 0),
(33, 33, 0),
(34, 34, 0),
(35, 35, 0),
(36, 36, 0),
(37, 37, 1),
(38, 38, 0),
(39, 39, 0),
(40, 40, 1),
(41, 41, 1),
(42, 42, 0),
(43, 43, 1),
(44, 44, 0),
(45, 45, 0),
(46, 46, 0),
(47, 47, 1),
(48, 48, 1),
(49, 49, 0),
(50, 50, 1),
(51, 51, 1),
(52, 52, 1),
(53, 53, 1),
(54, 54, 0),
(55, 55, 0),
(56, 56, 1),
(57, 57, 0),
(58, 58, 1),
(59, 59, 0),
(60, 60, 1),
(61, 61, 0),
(62, 62, 1),
(63, 63, 1),
(64, 64, 1),
(65, 65, 0),
(66, 66, 0),
(67, 67, 1),
(68, 68, 1),
(69, 69, 0),
(70, 70, 0),
(71, 71, 0),
(72, 72, 1),
(73, 73, 1),
(74, 74, 0),
(75, 75, 0),
(76, 76, 0),
(77, 77, 1),
(78, 78, 1),
(79, 79, 1),
(80, 80, 1),
(81, 81, 1),
(82, 82, 0),
(83, 83, 1),
(84, 84, 1),
(85, 85, 1),
(86, 86, 0),
(87, 87, 1),
(88, 88, 1),
(89, 89, 0),
(90, 90, 1),
(91, 91, 0),
(92, 92, 1),
(93, 93, 0),
(94, 94, 0),
(95, 95, 1),
(96, 96, 0),
(97, 97, 0),
(98, 98, 0),
(99, 99, 1),
(100, 100, 0),
(101, 101, 0),
(102, 102, 1),
(103, 103, 1),
(104, 104, 0),
(105, 105, 1),
(106, 106, 0),
(107, 107, 1),
(108, 108, 0),
(109, 109, 0),
(110, 110, 1),
(111, 111, 0),
(112, 112, 0),
(113, 113, 0),
(114, 114, 1),
(115, 115, 1),
(116, 116, 1),
(117, 117, 0),
(118, 118, 1),
(119, 119, 1),
(120, 120, 1),
(121, 121, 0),
(122, 122, 1),
(123, 123, 0),
(124, 124, 1),
(125, 125, 0),
(126, 126, 1),
(127, 127, 0),
(128, 128, 0),
(129, 129, 1),
(130, 130, 1),
(131, 131, 1),
(132, 132, 1),
(133, 133, 0),
(134, 134, 1),
(135, 135, 0),
(136, 136, 1),
(137, 137, 0),
(138, 138, 1),
(139, 139, 1),
(140, 140, 1),
(141, 141, 0),
(142, 142, 1),
(143, 143, 0),
(144, 144, 1),
(145, 145, 1),
(146, 146, 1),
(147, 147, 0),
(148, 148, 0),
(149, 149, 0),
(150, 150, 1),
(151, 151, 0),
(152, 152, 1),
(153, 153, 0),
(154, 154, 1),
(155, 155, 1),
(156, 156, 0),
(157, 157, 1),
(158, 158, 0),
(159, 159, 1),
(160, 160, 1),
(161, 161, 1),
(162, 162, 0),
(163, 163, 0),
(164, 164, 1),
(165, 165, 0),
(166, 166, 0),
(167, 167, 1),
(168, 168, 1),
(169, 169, 0),
(170, 170, 0),
(171, 171, 1),
(172, 172, 1),
(173, 173, 0),
(174, 174, 1),
(175, 175, 1),
(176, 176, 0),
(177, 177, 0),
(178, 178, 0),
(179, 179, 0),
(180, 180, 1),
(181, 181, 1),
(182, 182, 0),
(183, 183, 1),
(184, 184, 1),
(185, 185, 0),
(186, 186, 0),
(187, 187, 0),
(188, 188, 1),
(189, 189, 1),
(190, 190, 0),
(191, 191, 1),
(192, 192, 0),
(193, 193, 1),
(194, 194, 1),
(195, 195, 1),
(196, 196, 0),
(197, 197, 1),
(198, 198, 1),
(199, 199, 0),
(200, 200, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `Id_reserva` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_plaza` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora_entrada` datetime NOT NULL,
  `hora_salida` datetime NOT NULL,
  `importe` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `tipo_rol` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `tipo_rol`) VALUES
(1, 'usuario'),
(2, 'socio'),
(3, 'administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `socios`
--

CREATE TABLE `socios` (
  `Id_Socio` int(11) NOT NULL,
  `Id_usuario` int(11) NOT NULL,
  `plaza_fija` tinyint(1) NOT NULL,
  `id_plaza` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Id_usuario` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Correo` varchar(255) DEFAULT NULL,
  `Token` varchar(255) DEFAULT NULL,
  `rol` int(11) NOT NULL,
  `matricula` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `fechas`
--
ALTER TABLE `fechas`
  ADD PRIMARY KEY (`id_fecha`);

--
-- Indices de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  ADD PRIMARY KEY (`id_metodo`),
  ADD UNIQUE KEY `numero_tarjeta` (`numero_tarjeta`),
  ADD KEY `metodo_pago_fk0` (`usuario`);

--
-- Indices de la tabla `pagos_socios`
--
ALTER TABLE `pagos_socios`
  ADD PRIMARY KEY (`Id_pago`),
  ADD KEY `Pagos_socios_fk0` (`id_socio`),
  ADD KEY `Pagos_socios_fk1` (`id_fecha`);

--
-- Indices de la tabla `plazas`
--
ALTER TABLE `plazas`
  ADD PRIMARY KEY (`Id_plaza`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`Id_reserva`),
  ADD KEY `Reservas_fk0` (`id_usuario`),
  ADD KEY `Reservas_fk1` (`id_plaza`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `socios`
--
ALTER TABLE `socios`
  ADD PRIMARY KEY (`Id_Socio`),
  ADD KEY `Socios_fk0` (`Id_usuario`),
  ADD KEY `Socios_fk1` (`id_plaza`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id_usuario`),
  ADD UNIQUE KEY `matricula` (`matricula`),
  ADD UNIQUE KEY `Correo` (`Correo`),
  ADD KEY `Usuarios_fk0` (`rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `fechas`
--
ALTER TABLE `fechas`
  MODIFY `id_fecha` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  MODIFY `id_metodo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pagos_socios`
--
ALTER TABLE `pagos_socios`
  MODIFY `Id_pago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `plazas`
--
ALTER TABLE `plazas`
  MODIFY `Id_plaza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `Id_reserva` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `socios`
--
ALTER TABLE `socios`
  MODIFY `Id_Socio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  ADD CONSTRAINT `metodo_pago_fk0` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`Id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pagos_socios`
--
ALTER TABLE `pagos_socios`
  ADD CONSTRAINT `Pagos_socios_fk0` FOREIGN KEY (`id_socio`) REFERENCES `socios` (`Id_Socio`) ON DELETE CASCADE,
  ADD CONSTRAINT `Pagos_socios_fk1` FOREIGN KEY (`id_fecha`) REFERENCES `fechas` (`id_fecha`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `Reservas_fk0` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`Id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `Reservas_fk1` FOREIGN KEY (`id_plaza`) REFERENCES `plazas` (`Id_plaza`) ON DELETE CASCADE;

--
-- Filtros para la tabla `socios`
--
ALTER TABLE `socios`
  ADD CONSTRAINT `Socios_fk0` FOREIGN KEY (`Id_usuario`) REFERENCES `usuarios` (`Id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `Socios_fk1` FOREIGN KEY (`id_plaza`) REFERENCES `plazas` (`Id_plaza`) ON DELETE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `Usuarios_fk0` FOREIGN KEY (`rol`) REFERENCES `roles` (`id_rol`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
