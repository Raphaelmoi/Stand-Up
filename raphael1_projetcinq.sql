-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  mar. 17 sep. 2019 à 13:05
-- Version du serveur :  5.7.27-cll-lve
-- Version de PHP :  7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `raphael1_projetcinq`
--

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `date_publication` datetime NOT NULL,
  `comment` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id`, `id_user`, `date_publication`, `comment`) VALUES
(21, 16, '2019-09-09 20:36:39', 'Je'),
(4, 2, '2019-09-01 13:53:48', 'hahahahaha!'),
(16, 11, '2019-09-06 16:45:18', 'c\'est fantstique !'),
(7, 4, '2019-09-03 12:34:55', 'Saisissez votre commentaire'),
(9, 6, '2019-09-06 16:26:58', 'hello\r\n'),
(19, 4, '2019-09-09 07:52:02', 'MECH'),
(18, 14, '2019-09-08 11:20:21', 'k\r\n'),
(13, 9, '2019-09-06 16:36:24', 'stop'),
(17, 13, '2019-09-06 18:37:10', 'Zut...'),
(15, 4, '2019-09-06 16:42:29', 'Mwaahahha');

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `password_resets`
--

INSERT INTO `password_resets` (`id`, `email`, `token`) VALUES
(12, 'rafael46@hotmail.fr', '7936f0dad4be8739b2cde1bfe48e23d842661540ec6805a620d773caf321a2e0071cbefa2c2d6b6b6b6ff5f3ed8eae32c998'),
(11, 'rafael46@hotmail.fr', '4faec01eafee09e9e16ce45926e183809fc0e3a01d84552d751bebcfd50c81d538d3f69d5821a3d7075545770ef7e315f934'),
(10, 'rafael46@hotmail.fr', '484d83c43ddb4ce6bcd29e09f199ad250990aad338116a9b994798673a1aa6ac5d9aeefa2e811b329a0cce7cedfcf43dc684'),
(9, 'rafael46@hotmail.fr', '1c99ca2310f7465dcf977f059fa0e08d917aa22b9319cb0eabd4ffa032a827d78fa4e307769bea7290946cbc4e50d357e164');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `imageprofil` varchar(255) NOT NULL,
  `date_inscription` datetime NOT NULL,
  `game_one` int(11) NOT NULL DEFAULT '0',
  `game_one_bs` int(11) NOT NULL DEFAULT '0',
  `game_two` int(11) NOT NULL DEFAULT '0',
  `game_two_bs` int(11) NOT NULL DEFAULT '0',
  `game_total` int(11) NOT NULL DEFAULT '0',
  `authority` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `pseudo`, `pass`, `mail`, `imageprofil`, `date_inscription`, `game_one`, `game_one_bs`, `game_two`, `game_two_bs`, `game_total`, `authority`) VALUES
(12, 'Nicolas31', '$2y$10$mWObeXVJte7.fGErpGkd..4mqk1OvSNRanfIuHXMGQ7zX/5ZMOMwu', 'lauzier.nicolas@gmail.com', 'https://cdn2.thecatapi.com/images/cle.jpg', '2019-09-06 17:18:35', 0, 0, 0, 0, 0, 0),
(2, 'cat', '$2y$10$AWvKL44fm4bpTHbqd1aZHuIi.sPMm8r3rLtfkJeYqVL1P0ZQRM3Zm', 'cat@hotmail.fr', 'https://cdn2.thecatapi.com/images/2kr.jpg', '2019-09-01 13:53:32', 0, 0, 223, 223, 223, 0),
(4, 'Chat mechant', '$2y$10$3D0BPG0/4MmnBUDB7HMf8.AxGEU/RfvHbz.vY6FYuqEIWys4B/Q3K', 'admin@hotmail.fr', 'https://cdn2.thecatapi.com/images/MTY0MjEyNA.jpg', '2019-04-16 00:00:00', 92, 246, 22, 22, 378, 1),
(11, 'chatObrian', '$2y$10$UCOwGxQLuvgVZmiEK8cE0OgQrZk0b6e0Pr9EzTVanMP6H7jEMWgUu', 'chatobrian@hotmail.fr', 'https://cdn2.thecatapi.com/images/4o.jpg', '2019-09-06 16:43:56', 5, 5, 0, 0, 5, 0),
(6, 'newcut', '$2y$10$FZXh266BPZPYhqKt6SmPae6VEUS2ypwRd2hFnHCGLwbWiAMc5rV3i', 'newcat@hotmail.fr', 'https://cdn2.thecatapi.com/images/bcg.jpg', '2019-09-06 16:26:45', 329, 329, 310, 310, 784, 0),
(7, 'Chat-peron', '$2y$10$9SZM9n58dTMGzWE.zzUxbuMZJOZt/o34s4OQ9uW87a/nFxVBogimq', 'chap@hotmail.fr', 'https://cdn2.thecatapi.com/images/bsk.jpg', '2019-09-06 16:34:26', 0, 0, 0, 0, 0, 0),
(8, 'chatpeau', '$2y$10$IQsFeYTgDZ6k20no388AtO6cC8k6d5hsCMgaeQ5M66M5nRrZPYY42', 'chapo@hotmail.fr', 'https://cdn2.thecatapi.com/images/bp.jpg', '2019-09-06 16:35:23', 0, 0, 0, 0, 0, 0),
(9, 'chat suffit !', '$2y$10$rMNzN39.8uL8sO9w04Nt3OZh5Aug.WnS4Gvla9PJWzhEYSELetVsa', 'chatarran@gmail.com', 'https://cdn2.thecatapi.com/images/99v.jpg', '2019-09-06 16:36:17', 0, 0, 0, 0, 0, 0),
(10, 'chatlameche', '$2y$10$/FepO1bySiqKr8pGhVL.qucDyBJGD2aX3b9jlsbiGQzN4DZDOnv/W', 'chatpol@homa.fr', 'https://cdn2.thecatapi.com/images/MTgwNjM3OA.jpg', '2019-09-06 16:37:19', 0, 0, 0, 0, 0, 0),
(13, 'Chatperlipopette', '$2y$10$sBy49ytXOwHOfNbu/ooPoOihwfuzcvkR3F41RnZfq12rLmZGs5oo6', 'raphmouly@gmail.com', 'https://cdn2.thecatapi.com/images/HqirjA4d1.jpg', '2019-09-06 18:36:38', 0, 0, 0, 0, 0, 0),
(14, 'Chat', '$2y$10$ACjLub7CxGBrlxzB10YMyO/b9t1XXvjqglGM0M4fQftgEBrAqn6IS', 'chat@hotmail.fr', 'https://cdn2.thecatapi.com/images/c5k.jpg', '2019-09-08 11:19:43', 22, 22, 0, 0, 22, 0),
(17, 'chatNoir', '$2y$10$7ONwIDMefrMPKbLyCO7RUOKlbM/KmccXeAIIvBTvw2CVISfqDaC6W', 'chatnoir@hotmail.fr', 'https://cdn2.thecatapi.com/images/387.jpg', '2019-09-11 18:24:46', 4, 4, 0, 0, 4, 0),
(16, 'Kiff', '$2y$10$hm.jgxSHxgMJpDkvk5BHqeh/veEMVFLuNdyDrZUadG9J6VV8h0Pwy', 'raphmaouly@gmail.com', 'https://cdn2.thecatapi.com/images/chs.jpg', '2019-09-09 20:32:31', 54, 54, 0, 0, 54, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
