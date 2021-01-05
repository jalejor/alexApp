/* Replace with your SQL commands */

CREATE TABLE `auth`(
    `id` varchar(128) NOT NULL,
    `username` varchar(128) DEFAULT NULL,
    `password` varchar(128) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE= InnoDB DEFAULT CHARSET=utf8;
