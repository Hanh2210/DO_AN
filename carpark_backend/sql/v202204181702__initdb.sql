-- init table

-- tbl_user
create table if not exists tbl_user
(
    id          int auto_increment,
    name        varchar(50)        not null,
    address     varchar(100)       null,
    email       varchar(50)        null,
    phonenumber char(15)           not null,
    password    varchar(100)       not null,
    roles       char(5)            not null comment 'ADMIN or USER',
    status      smallint default 1 not null comment 'active: 1, lock: 2, deleted: 0',
    constraint tbl_user_id_uindex
        unique (id)
);

alter table tbl_user
    add primary key (id);


-- tbl_carpark
create table if not exists tbl_carpark
(
    id                 int auto_increment,
    name               varchar(50)                 not null,
    address            varchar(50)                 not null,
    numberOfEmptySlots int      default 0          null,
    openTime           time     default '00:00:00' null,
    closingTime        time     default '23:59:59' null,
    status             smallint default 1          not null comment 'active: 1, lock: 2, deleted: 3',
    constraint tbl_carpark_id_uindex
        unique (id)
);

alter table tbl_carpark
    add primary key (id);

-- tbl_vehicle
create table if not exists tbl_vehicle
(
    id             int auto_increment,
    id_user        int                not null,
    type           varchar(20)        not null comment 'car, motocycle, bicycle',
    lincense_plate varchar(20)        not null,
    color          varchar(10)        not null,
    vehicle_brand  varchar(50)        not null,
    status         smallint default 1 not null comment 'active: 1, parking: 2, deleted: 0',
    constraint tbl_vehicle_id_uindex
        unique (id),
    constraint tbl_vehicle_tbl_user_fk
        foreign key (id_user) references tbl_user (id)
);

alter table tbl_vehicle
    add primary key (id);

-- tbl_parking_ticket_infor
create table if not exists tbl_parking_ticket_infor
(
    id             int auto_increment,
    id_vehicle     int                not null,
    id_carpark     int                not null,
    start_time     time default '00:00:00',
    end_time       time default '23:59:59',
    price          int                not null,
    status         smallint default 1 not null comment 'active: 1, deleted: 0',
    constraint tbl_parking_ticket_infor_id_uindex
        unique (id),
    constraint tbl_parking_ticket_infor_tbl_vehicle_fk
        foreign key (id_vehicle) references tbl_vehicle (id),
    constraint tbl_parking_ticket_infor_tbl_carpark_fk
        foreign key (id_carpark) references tbl_carpark (id)
);

alter table tbl_parking_ticket_infor
    add primary key (id);