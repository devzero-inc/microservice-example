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
insert into `menu_items` (`name`, `description`) values ('Drip coffee', 'Fast, simple, delicious');
insert into `menu_items` (`name`, `description`) values ('Espresso', 'The potent option');
insert into `menu_items` (`name`, `description`) values ('Cortado', 'Espresso with a dash of milk');
insert into `menu_items` (`name`, `description`) values ('Gibraltar', 'Like a Cortado, but different');
insert into `menu_items` (`name`, `description`) values ('Pour over', 'Fancy drip made by a human');
insert into `menu_items` (`name`, `description`) values ('Americano', 'Espresso cut with water');