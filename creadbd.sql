-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bd_sistema_veterinario
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bd_sistema_veterinario
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bd_sistema_veterinario` DEFAULT CHARACTER SET utf8 ;
USE `bd_sistema_veterinario` ;

-- -----------------------------------------------------
-- Table `bd_sistema_veterinario`.`tb_usuariosVeterinaria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_sistema_veterinario`.`tb_usuariosVeterinaria` (
  `idtb_usuariosVeterinaria` INT NOT NULL AUTO_INCREMENT,
  `tb_usuariosVeterinaria_col_claveSeguraidad` VARCHAR(10) NOT NULL,
  `tb_usuariosVeterinaria_col_nombre` VARCHAR(200) NOT NULL,
  `tb_usuariosVeterinaria_col_usuario` VARCHAR(200) NOT NULL,
  `tb_usuariosVeterinaria_col_contrasenna` VARCHAR(200) NOT NULL,
  `tb_usuariosVeterinaria_col_correoElectronico` VARCHAR(200) NOT NULL,
  `tb_usuariosVeterinaria_col_numeroTelefono` INT NOT NULL,
  `tb_usuariosVeterinaria_col_direccion` VARCHAR(1000) NOT NULL,
  `tb_usuariosVeterinaria_col_estado` TINYINT NOT NULL,
  PRIMARY KEY (`idtb_usuariosVeterinaria`),
  UNIQUE INDEX `tb_usuariosVeterinaria_col_claveSeguraidad_UNIQUE` (`tb_usuariosVeterinaria_col_claveSeguraidad` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_sistema_veterinario`.`tb_propietarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_sistema_veterinario`.`tb_propietarios` (
  `tb_propietarios_col_cedula` INT NOT NULL,
  `tb_propietarios_col_nombre` VARCHAR(50) NOT NULL,
  `tb_propietarios_col_direccion` VARCHAR(200) NOT NULL,
  `tb_propietarios_col_numeroTelefono` INT NOT NULL,
  `tb_propietarios_col_correoElectronico` VARCHAR(200) NOT NULL,
  `tb_usuariosVeterinaria_idtb_usuariosVeterinaria` INT NOT NULL,
  PRIMARY KEY (`tb_propietarios_col_cedula`),
  INDEX `fk_tb_propietarios_tb_usuariosVeterinaria1_idx` (`tb_usuariosVeterinaria_idtb_usuariosVeterinaria` ASC) VISIBLE,
  CONSTRAINT `fk_tb_propietarios_tb_usuariosVeterinaria1`
    FOREIGN KEY (`tb_usuariosVeterinaria_idtb_usuariosVeterinaria`)
    REFERENCES `bd_sistema_veterinario`.`tb_usuariosVeterinaria` (`idtb_usuariosVeterinaria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_sistema_veterinario`.`tb_pacientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_sistema_veterinario`.`tb_pacientes` (
  `idtb_pacientes` INT NOT NULL AUTO_INCREMENT,
  `tb_pacientes_col_nombre` VARCHAR(45) NOT NULL,
  `tb_pacientes_col_tipo` VARCHAR(45) NOT NULL,
  `tb_pacientes_col_peso` DECIMAL NOT NULL,
  `tb_pacientes_col_fechaNacimiento` DATE NOT NULL,
  `tb_pacientes_col_sexo` VARCHAR(45) NOT NULL,
  `tb_pacientes_col_edad` DECIMAL NOT NULL,
  `tb_pacientes_col_raza` VARCHAR(45) NULL,
  `tb_pacientes_col_castrado` VARCHAR(45) NOT NULL,
  `tb_pacientes_col_color` VARCHAR(45) NOT NULL,
  `tb_pacientes_col_fechaUltimaConsulta` DATE NOT NULL,
  `tb_usuariosVeterinaria_idtb_usuariosVeterinaria` INT NOT NULL,
  `tb_propietarios_tb_propietarios_col_cedula` INT NOT NULL,
  PRIMARY KEY (`idtb_pacientes`),
  INDEX `fk_tb_pacientes_tb_usuariosVeterinaria_idx` (`tb_usuariosVeterinaria_idtb_usuariosVeterinaria` ASC) VISIBLE,
  INDEX `fk_tb_pacientes_tb_propietarios1_idx` (`tb_propietarios_tb_propietarios_col_cedula` ASC) VISIBLE,
  CONSTRAINT `fk_tb_pacientes_tb_usuariosVeterinaria`
    FOREIGN KEY (`tb_usuariosVeterinaria_idtb_usuariosVeterinaria`)
    REFERENCES `bd_sistema_veterinario`.`tb_usuariosVeterinaria` (`idtb_usuariosVeterinaria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_pacientes_tb_propietarios1`
    FOREIGN KEY (`tb_propietarios_tb_propietarios_col_cedula`)
    REFERENCES `bd_sistema_veterinario`.`tb_propietarios` (`tb_propietarios_col_cedula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_sistema_veterinario`.`tb_consultaGeneral`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_sistema_veterinario`.`tb_consultaGeneral` (
  `idtb_consultaGeneral` INT NOT NULL AUTO_INCREMENT,
  `tb_consultaGeneral_col_nombrePropietario` VARCHAR(200) NOT NULL,
  `tb_consultaGeneral_col_nombrePaciente` VARCHAR(200) NOT NULL,
  `tb_consultaGeneral_col_motivo` VARCHAR(1000) NOT NULL,
  `tb_consultaGeneral_col_medicamentosUtilizados` VARCHAR(200) NOT NULL,
  `tb_consultaGeneral_col_actualizacionPeso` DECIMAL NOT NULL,
  `tb_consultaGeneral_col_fecha` DATE NOT NULL,
  `tb_usuariosVeterinaria_idtb_usuariosVeterinaria` INT NOT NULL,
  `tb_pacientes_idtb_pacientes` INT NULL,
  PRIMARY KEY (`idtb_consultaGeneral`),
  INDEX `fk_tb_consultaGerneral_tb_usuariosVeterinaria1_idx` (`tb_usuariosVeterinaria_idtb_usuariosVeterinaria` ASC) VISIBLE,
  INDEX `fk_tb_consultaGerneral_tb_pacientes1_idx` (`tb_pacientes_idtb_pacientes` ASC) VISIBLE,
  CONSTRAINT `fk_tb_consultaGerneral_tb_usuariosVeterinaria1`
    FOREIGN KEY (`tb_usuariosVeterinaria_idtb_usuariosVeterinaria`)
    REFERENCES `bd_sistema_veterinario`.`tb_usuariosVeterinaria` (`idtb_usuariosVeterinaria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_consultaGerneral_tb_pacientes1`
    FOREIGN KEY (`tb_pacientes_idtb_pacientes`)
    REFERENCES `bd_sistema_veterinario`.`tb_pacientes` (`idtb_pacientes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_sistema_veterinario`.`tb_consultaVacunacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_sistema_veterinario`.`tb_consultaVacunacion` (
  `idtb_consultaVacunacion` INT NOT NULL AUTO_INCREMENT,
  `tb_consultaVacunacion_col_nombrePropietario` VARCHAR(200) NOT NULL,
  `tb_consultaVacunacion_col_nombrePaciente` VARCHAR(200) NOT NULL,
  `tb_consultaVacunacion_col_actualizacionPeso` DECIMAL NOT NULL,
  `tb_consultaVacunacion_col_vacunacion` VARCHAR(45) NULL,
  `tb_consultaVacunacion_col_desparacitacion` VARCHAR(45) NULL,
  `tb_consultaVacunacion_col_fecha` DATE NOT NULL,
  `tb_usuariosVeterinaria_idtb_usuariosVeterinaria` INT NOT NULL,
  `tb_pacientes_idtb_pacientes` INT NULL,
  PRIMARY KEY (`idtb_consultaVacunacion`),
  INDEX `fk_tb_consultaVacunacion_tb_usuariosVeterinaria1_idx` (`tb_usuariosVeterinaria_idtb_usuariosVeterinaria` ASC) VISIBLE,
  INDEX `fk_tb_consultaVacunacion_tb_pacientes1_idx` (`tb_pacientes_idtb_pacientes` ASC) VISIBLE,
  CONSTRAINT `fk_tb_consultaVacunacion_tb_usuariosVeterinaria1`
    FOREIGN KEY (`tb_usuariosVeterinaria_idtb_usuariosVeterinaria`)
    REFERENCES `bd_sistema_veterinario`.`tb_usuariosVeterinaria` (`idtb_usuariosVeterinaria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_consultaVacunacion_tb_pacientes1`
    FOREIGN KEY (`tb_pacientes_idtb_pacientes`)
    REFERENCES `bd_sistema_veterinario`.`tb_pacientes` (`idtb_pacientes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_sistema_veterinario`.`tb_partos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_sistema_veterinario`.`tb_partos` (
  `idtb_partos` INT NOT NULL AUTO_INCREMENT,
  `tb_partos_col_numeroParto` INT NOT NULL,
  `tb_partos_col_fechaParto` DATE NOT NULL,
  `tb_partos_col_cantidad` INT NOT NULL,
  `tb_pacientes_idtb_pacientes` INT NOT NULL,
  PRIMARY KEY (`idtb_partos`),
  INDEX `fk_tb_partos_tb_pacientes1_idx` (`tb_pacientes_idtb_pacientes` ASC) VISIBLE,
  CONSTRAINT `fk_tb_partos_tb_pacientes1`
    FOREIGN KEY (`tb_pacientes_idtb_pacientes`)
    REFERENCES `bd_sistema_veterinario`.`tb_pacientes` (`idtb_pacientes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_sistema_veterinario`.`tb_costosConsultas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_sistema_veterinario`.`tb_costosConsultas` (
  `idtb_costosConsultas` INT NOT NULL AUTO_INCREMENT,
  `tb_costosConsultas_col_medicamentos` DECIMAL(10,2) NOT NULL,
  `tb_costosConsultas_col_extras` DECIMAL(10,2) NOT NULL,
  `tb_costosConsultas_col_consultal` DECIMAL(10,2) NOT NULL,
  `tb_costosConsultas_col_descripcion` VARCHAR(200) NOT NULL,
  `tb_costosConsultas_col_total` DECIMAL(10,2) NOT NULL,
  `tb_costosConsultas_col_tipo` VARCHAR(45) NOT NULL,
  `tb_consultaGeneral_idtb_consultaGeneral` INT NULL,
  `tb_consultaVacunacion_idtb_consultaVacunacion` INT NULL,
  PRIMARY KEY (`idtb_costosConsultas`),
  INDEX `fk_tb_costosConsultas_tb_consultaGeneral1_idx` (`tb_consultaGeneral_idtb_consultaGeneral` ASC) VISIBLE,
  INDEX `fk_tb_costosConsultas_tb_consultaVacunacion1_idx` (`tb_consultaVacunacion_idtb_consultaVacunacion` ASC) VISIBLE,
  CONSTRAINT `fk_tb_costosConsultas_tb_consultaGeneral1`
    FOREIGN KEY (`tb_consultaGeneral_idtb_consultaGeneral`)
    REFERENCES `bd_sistema_veterinario`.`tb_consultaGeneral` (`idtb_consultaGeneral`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_costosConsultas_tb_consultaVacunacion1`
    FOREIGN KEY (`tb_consultaVacunacion_idtb_consultaVacunacion`)
    REFERENCES `bd_sistema_veterinario`.`tb_consultaVacunacion` (`idtb_consultaVacunacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_sistema_veterinario`.`tb_citas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_sistema_veterinario`.`tb_citas` (
  `idtb_citas` INT NOT NULL AUTO_INCREMENT,
  `tb_propietarios_tb_propietarios_col_cedula` INT NOT NULL,
  `tb_pacientes_idtb_pacientes` INT NOT NULL,
  `tb_citas_col_fecha` DATE NOT NULL,
  `tb_citas_col_hora` TIME NOT NULL,
  `tb_citas_col_estado` BIT NOT NULL,
  `tb_citas_col_motivo` VARCHAR(500) NOT NULL,
  `tb_usuariosVeterinaria_idtb_usuariosVeterinaria` INT NOT NULL,
  PRIMARY KEY (`idtb_citas`, `tb_usuariosVeterinaria_idtb_usuariosVeterinaria`),
  INDEX `fk_tb_citas_tb_propietarios1_idx` (`tb_propietarios_tb_propietarios_col_cedula` ASC) VISIBLE,
  INDEX `fk_tb_citas_tb_pacientes1_idx` (`tb_pacientes_idtb_pacientes` ASC) VISIBLE,
  INDEX `fk_tb_citas_tb_usuariosVeterinaria1_idx` (`tb_usuariosVeterinaria_idtb_usuariosVeterinaria` ASC) VISIBLE,
  CONSTRAINT `fk_tb_citas_tb_propietarios1`
    FOREIGN KEY (`tb_propietarios_tb_propietarios_col_cedula`)
    REFERENCES `bd_sistema_veterinario`.`tb_propietarios` (`tb_propietarios_col_cedula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_citas_tb_pacientes1`
    FOREIGN KEY (`tb_pacientes_idtb_pacientes`)
    REFERENCES `bd_sistema_veterinario`.`tb_pacientes` (`idtb_pacientes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_citas_tb_usuariosVeterinaria1`
    FOREIGN KEY (`tb_usuariosVeterinaria_idtb_usuariosVeterinaria`)
    REFERENCES `bd_sistema_veterinario`.`tb_usuariosVeterinaria` (`idtb_usuariosVeterinaria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
