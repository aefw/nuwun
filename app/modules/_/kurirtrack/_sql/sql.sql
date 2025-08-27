SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `{prefix}kurirtrack_data` (
  `id_kurirtrack_data` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_users` int(11) DEFAULT NULL,
  `kode_kirim` varchar(100) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `dari` varchar(255) DEFAULT NULL,
  `dari_kota` varchar(255) DEFAULT NULL,
  `kepada` varchar(255) DEFAULT NULL,
  `menuju_kota` varchar(255) DEFAULT NULL,
  `keterangan` text,
  PRIMARY KEY (`id_kurirtrack_data`),
  UNIQUE KEY `kode_kirim` (`kode_kirim`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `{prefix}kurirtrack_tracking` (
  `id_kurirtrack_tracking` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_kurirtrack_works` int(10) UNSIGNED DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lat` varchar(25) DEFAULT NULL,
  `lng` varchar(25) DEFAULT NULL,
  `catatan` text,
  PRIMARY KEY (`id_kurirtrack_tracking`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `{prefix}kurirtrack_works` (
  `id_kurirtrack_works` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `kode_tugas` varchar(100) DEFAULT NULL,
  `finish` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_kurirtrack_works`),
  UNIQUE KEY `kode_tugas` (`kode_tugas`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `{prefix}kurirtrack_works_data` (
  `id_kurirtrack_works` int(11) UNSIGNED NOT NULL,
  `id_kurirtrack_data` int(11) UNSIGNED DEFAULT NULL,
  KEY `kurirtrack_works_data_kurirtrack_works` (`id_kurirtrack_works`),
  KEY `kurirtrack_works_data_kurirtrack_data` (`id_kurirtrack_data`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `{prefix}kurirtrack_works_users` (
  `id_kurirtrack_works` int(11) UNSIGNED NOT NULL,
  `id_users` int(11) DEFAULT NULL,
  UNIQUE KEY `id_kurirtrack_works` (`id_kurirtrack_works`,`id_users`),
  KEY `kurirtrack_works_users_users` (`id_users`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `{prefix}kurirtrack_works_data`
  ADD CONSTRAINT `kurirtrack_works_data_kurirtrack_data` FOREIGN KEY (`id_kurirtrack_data`) REFERENCES `{prefix}kurirtrack_data` (`id_kurirtrack_data`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `kurirtrack_works_data_kurirtrack_works` FOREIGN KEY (`id_kurirtrack_works`) REFERENCES `{prefix}kurirtrack_works` (`id_kurirtrack_works`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `{prefix}kurirtrack_works_users`
  ADD CONSTRAINT `kurirtrack_works_users_kurirtrack_works` FOREIGN KEY (`id_kurirtrack_works`) REFERENCES `{prefix}kurirtrack_works` (`id_kurirtrack_works`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `kurirtrack_works_users_users` FOREIGN KEY (`id_users`) REFERENCES `{prefix}users` (`id_users`) ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
