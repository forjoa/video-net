create database videonet;

use videonet;

create table users (
	id int primary key auto_increment not null,
    username varchar(255),
    description text,
    photo varchar(255),
    email varchar(255),
    pwd varchar(255)
);

create table videos (
	id int primary key auto_increment not null,
    concept text,
    url varchar(255),
    userID int,
    foreign key (userID) references users(id)
);

create table followers (
	id int primary key auto_increment not null,
    followed int,
    follower int,
    foreign key (followed) references users(id),
    foreign key (follower) references users(id)
);

select * from users;
select * from videos;
select * from followers;
