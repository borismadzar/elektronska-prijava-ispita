-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema studentska-sluzba
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema studentska-sluzba
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `studentska-sluzba` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `studentska-sluzba` ;

-- -----------------------------------------------------
-- Table `studentska-sluzba`.`nastavni_plan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `studentska-sluzba`.`nastavni_plan` (
  `id` INT NOT NULL,
  `naziv` VARCHAR(50) CHARACTER SET 'utf8' NOT NULL,
  `smjer_oznaka` VARCHAR(10) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `studentska-sluzba`.`predmet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `studentska-sluzba`.`predmet` (
  `id` INT NOT NULL,
  `naziv` VARCHAR(50) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `studentska-sluzba`.`predmet_nastavni_plan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `studentska-sluzba`.`predmet_nastavni_plan` (
  `id` INT NOT NULL,
  `predmet_id` INT NOT NULL,
  `nastavni_plan_id` INT NOT NULL,
  `godina` CHAR(2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `nastavni_plan_fk` (`nastavni_plan_id` ASC) VISIBLE,
  INDEX `predmet___fk` (`predmet_id` ASC) VISIBLE,
  CONSTRAINT `nastavni_plan_fk`
    FOREIGN KEY (`nastavni_plan_id`)
    REFERENCES `studentska-sluzba`.`nastavni_plan` (`id`),
  CONSTRAINT `predmet___fk`
    FOREIGN KEY (`predmet_id`)
    REFERENCES `studentska-sluzba`.`predmet` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `studentska-sluzba`.`student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `studentska-sluzba`.`student` (
  `id` INT NOT NULL,
  `ime` VARCHAR(50) CHARACTER SET 'utf8' NOT NULL,
  `prezime` VARCHAR(50) CHARACTER SET 'utf8' NOT NULL,
  `broj_indeksa` VARCHAR(20) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `student_broj_indeksa_uindex` (`broj_indeksa` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `studentska-sluzba`.`termin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `studentska-sluzba`.`termin` (
  `id` INT NOT NULL,
  `predmet_id` INT NOT NULL,
  `ispitni_rok` VARCHAR(50) NULL DEFAULT NULL,
  `vrijeme` DATETIME NOT NULL,
  `mjesto` VARCHAR(20) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `predmet_fk_idx` (`predmet_id` ASC) VISIBLE,
  CONSTRAINT `predmet_fk`
    FOREIGN KEY (`predmet_id`)
    REFERENCES `studentska-sluzba`.`predmet` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `studentska-sluzba`.`prijava`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `studentska-sluzba`.`prijava` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `student_id` INT NULL DEFAULT NULL,
  `termin_id` INT NOT NULL,
  `ocjena` INT NULL DEFAULT NULL,
  `ukupno_poena` INT NULL DEFAULT NULL,
  `pojavio_se` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `student_fk_idx` (`student_id` ASC) VISIBLE,
  INDEX `termin_fk_idx` (`termin_id` ASC) VISIBLE,
  CONSTRAINT `student_fk`
    FOREIGN KEY (`student_id`)
    REFERENCES `studentska-sluzba`.`student` (`id`),
  CONSTRAINT `termin_fk`
    FOREIGN KEY (`termin_id`)
    REFERENCES `studentska-sluzba`.`termin` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 40
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `studentska-sluzba`.`student_predmet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `studentska-sluzba`.`student_predmet` (
  `id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `predmet_id` INT NOT NULL,
  `odslusao` TINYINT(1) NOT NULL,
  `polozio` TINYINT(1) NULL DEFAULT NULL,
  `ocjena` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `student_fk_idx` (`student_id` ASC) VISIBLE,
  INDEX `predmet_fk_idx` (`predmet_id` ASC) VISIBLE,
  CONSTRAINT `predmet_fk1`
    FOREIGN KEY (`predmet_id`)
    REFERENCES `studentska-sluzba`.`predmet` (`id`),
  CONSTRAINT `student_fk1`
    FOREIGN KEY (`student_id`)
    REFERENCES `studentska-sluzba`.`student` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
