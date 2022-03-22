
create table if not exists `users` (
  `id` bigint(20) not null auto_increment,
  `username` varchar(200) not null,
  `email` varchar(200) not null,
  PRIMARY KEY (`id`),
  constraint unique (`username`),
  constraint unique (`email`)
);

insert into users (username, email) values ('JoeSmith', 'joe.smith@example.com')