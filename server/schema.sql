


-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'clients'
-- 
-- ---

DROP TABLE IF EXISTS `clients`;
		
CREATE TABLE `clients` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `location` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `avg_rating` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'workers'
-- 
-- ---

DROP TABLE IF EXISTS `workers`;
		
CREATE TABLE `workers` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `location` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `avg_rating` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'jobs'
-- 
-- ---

DROP TABLE IF EXISTS `jobs`;
		
CREATE TABLE `jobs` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `id_workers` INTEGER NULL DEFAULT NULL,
  `id_clients` INTEGER NULL DEFAULT NULL,
  `applicants` INTEGER NULL DEFAULT NULL,
  `budget` INTEGER NULL DEFAULT NULL,
  `summary` VARCHAR(255) NULL DEFAULT NULL,
  `skills_needed` VARCHAR(255) NULL DEFAULT NULL,
  `completed_field` DATE NULL DEFAULT NULL,
  `state` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'workers_open_jobs'
-- 
-- ---

DROP TABLE IF EXISTS `workers_open_jobs`;
		
CREATE TABLE `workers_open_jobs` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_workers` INTEGER NULL DEFAULT NULL,
  `id_open_jobs` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'client_reviews'
-- 
-- ---

DROP TABLE IF EXISTS `client_reviews`;
		
CREATE TABLE `client_reviews` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `comment` VARCHAR(255) NULL DEFAULT NULL,
  `id_clients` INTEGER NULL DEFAULT NULL,
  `rating` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'worker_reviews'
-- 
-- ---

DROP TABLE IF EXISTS `worker_reviews`;
		
CREATE TABLE `worker_reviews` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `comment` VARCHAR(255) NULL DEFAULT NULL,
  `rating` INTEGER NULL DEFAULT NULL,
  `id_workers` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `jobs` ADD FOREIGN KEY (id_workers) REFERENCES `workers` (`id`);
ALTER TABLE `jobs` ADD FOREIGN KEY (id_clients) REFERENCES `clients` (`id`);
ALTER TABLE `workers_open_jobs` ADD FOREIGN KEY (id_workers) REFERENCES `workers` (`id`);
ALTER TABLE `workers_open_jobs` ADD FOREIGN KEY (id_open_jobs) REFERENCES `jobs` (`id`);
ALTER TABLE `client_reviews` ADD FOREIGN KEY (id_clients) REFERENCES `clients` (`id`);
ALTER TABLE `worker_reviews` ADD FOREIGN KEY (id_workers) REFERENCES `workers` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `clients` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `workers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `jobs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `workers_open_jobs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `client_reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `worker_reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `clients` (`id`,`name`,`location`,`email`,`avg_rating`) VALUES
-- ('','','','','');
-- INSERT INTO `workers` (`id`,`name`,`location`,`email`,`avg_rating`) VALUES
-- ('','','','','');
-- INSERT INTO `jobs` (`id`,`title`,`id_workers`,`id_clients`,`applicants`,`budget`,`summary`,`skills_needed`,`completed_field`,`state`) VALUES
-- ('','','','','','','','','','');
-- INSERT INTO `workers_open_jobs` (`id`,`id_workers`,`id_open_jobs`) VALUES
-- ('','','');
-- INSERT INTO `client_reviews` (`id`,`comment`,`id_clients`,`rating`) VALUES
-- ('','','','');
-- INSERT INTO `worker_reviews` (`id`,`comment`,`rating`,`id_workers`) VALUES
-- ('','','','');

