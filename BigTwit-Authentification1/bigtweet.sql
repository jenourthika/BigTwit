-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Client :  localhost:8889
-- Généré le :  Dim 25 Juin 2017 à 00:41
-- Version du serveur :  5.5.42
-- Version de PHP :  7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `Bigtwit`
--

-- --------------------------------------------------------

--
-- Structure de la table `bigtweet`
--

DROP TABLE IF EXISTS `bigtweet`;
CREATE TABLE `bigtweet` (
  `ID` varchar(6) NOT NULL,
  `Pseudo` varchar(15) NOT NULL DEFAULT 'thithy',
  `Message` varchar(1000) NOT NULL,
  `DateHeure` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `bigtweet`
--

INSERT INTO `bigtweet` (`ID`, `Pseudo`, `Message`, `DateHeure`) VALUES
('56', 'thithy', ' Test de Mercredi 15 juin 2017 à 18h22 by Aminata Jena Thiepthy', '2017-06-15 16:22:27'),
('22', 'thithy', ' test de 21h22  -19h02', '2017-06-14 19:22:41'),
('61', 'thithy', ' ,fzmeflzmfzm', '2017-06-18 18:36:07'),
('43', 'thithy', ' test de 17h58 - 19h42 ', '2017-06-15 15:58:17'),
('129', 'thithy', 'nsvksvm', '2017-06-19 19:37:58'),
('0hsj4v', 'thithy', 'hello22', '2017-06-22 13:31:45'),
('qkjip4', 'thithy', 'nkvsdmvds', '2017-06-22 13:32:50'),
('tzlu32', 'thithy', 'vjhl=bm', '2017-06-22 13:36:37'),
('yudpy2', 'thithy', 'bk:jl', '2017-06-22 13:54:03'),
('z8kzyl', 'thithy', 'knm,', '2017-06-22 13:54:44'),
('6doru1', 'thithy', 'qvsvs', '2017-06-22 13:55:11'),
('ipn11c', 'thithy', 'nmùm;', '2017-06-22 13:55:40'),
('478trn', 'thithy', 'jjo,ùl', '2017-06-22 13:58:11'),
('e8fyq0', 'thithy', 'nokmkm', '2017-06-22 13:59:15'),
('dznlyj', 'thithy', 'nlmcqnc', '2017-06-22 14:06:16'),
('0e3x7k', 'thithy', 'test de 16H15', '2017-06-22 14:15:51');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `bigtweet`
--
ALTER TABLE `bigtweet`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `bigtweet`
--
ALTER TABLE `bigtweet`
AUTO_INCREMENT=130;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
