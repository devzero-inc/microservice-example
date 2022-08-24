drop table if exists `order_items`;
drop table if exists `menu_items`;
drop table if exists `orders`;

create table if not exists `orders` (
  `id` bigint(20) not null auto_increment,
  `customer_name` varchar(200) not null,
  PRIMARY KEY (`id`)
);

create table if not exists `menu_items` (
  `id` bigint(20) not null auto_increment,
  `name` varchar(200) not null,
  `description` varchar(200) not null,
  `price` decimal (6, 2) not null,   
  PRIMARY KEY (`id`),
  constraint unique (`name`)
);

create table if not exists `order_items` (
  `id` bigint(20) not null auto_increment,
  `order_id` bigint(20) not null,
  `menu_item_id` bigint(20) not null,
  `quantity` tinyint not null,
  PRIMARY KEY (`id`),
  unique (`order_id`, `menu_item_id`),
  FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`)
);

# Seed the DB with some menu items
insert into `menu_items` (`name`, `description`, `price`) values ('Drip coffee', 'Fast, simple, delicious', 3.25);
insert into `menu_items` (`name`, `description`, `price`) values ('Espresso', 'The potent option', 3.00);
insert into `menu_items` (`name`, `description`, `price`) values ('Cortado', 'Espresso with a dash of milk', 3.75);
insert into `menu_items` (`name`, `description`, `price`) values ('Gibraltar', 'Like a Cortado, but different', 3.75);
insert into `menu_items` (`name`, `description`, `price`) values ('Pour over', 'Fancy drip made by a human', 4.50);
insert into `menu_items` (`name`, `description`, `price`) values ('Americano', 'Espresso cut with water', 3.50);