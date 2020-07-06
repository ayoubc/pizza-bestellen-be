-- PIZZA TABLE --
CREATE TABLE `pizza` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `discription` VARCHAR(255) NOT NULL,
  `rating` DECIMAL(2) NULL,
  PRIMARY KEY (`id`));
  
ALTER TABLE `pizza` 
CHANGE COLUMN `id` `id` INT NOT NULL AUTO_INCREMENT ;

ALTER TABLE `pizza` 
ADD COLUMN `price` DECIMAL(2) NOT NULL AFTER `rating`;



-- ORDER TABLE --

CREATE TABLE `pizza_order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `total_price` DECIMAL(2) NOT NULL DEFAULT 0,
  `customer_id` INT NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `created_at` DATETIME default now(),
  `update_at` DATETIME default now(),
  PRIMARY KEY (`id`));

-- CUSTOMER TABLE --
CREATE TABLE `customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

-- UPDATING ADD FOREIGN KEY --
ALTER TABLE `pizza_order` 
ADD INDEX `FK_CUSTOMER_ID_idx` (`customer_id` ASC) VISIBLE;
;
ALTER TABLE `pizza_order` 
ADD CONSTRAINT `FK_CUSTOMER_ID`
  FOREIGN KEY (`customer_id`)
  REFERENCES `customer` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
ALTER TABLE `customer` 
ADD UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE;
;


-- ORDER_DETAIL --
CREATE TABLE `order_detail` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `pizza_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_ORDER_ID`
    FOREIGN KEY (`order_id`)
    REFERENCES `pizza_order` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_PIZZA_ID`
    FOREIGN KEY (`pizza_id`)
    REFERENCES `pizza` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- UPDATE TABLE PIZZA: ADD IMAGE --
ALTER TABLE `pizza` 
ADD COLUMN `image` BLOB NULL DEFAULT NULL AFTER `price`;

ALTER TABLE `pizza` 
CHANGE COLUMN `image` `image` LONGTEXT NULL DEFAULT NULL ;


