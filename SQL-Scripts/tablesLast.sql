CREATE DATABASE IF NOT EXISTS SQL_slr_Project;
use sql_slr_Project;

-- Client Table
create table clients (
client_id int not null auto_increment primary key,
client_name varchar(200),
client_entry_date date,
client_address_id int,
foreign key(client_address_id) references address(address_id) on delete cascade,
client_phone varchar(50),
client_email VARCHAR(100) UNIQUE not null,
client_password varchar(50),
client_company_registration date
);

insert into clients (client_firstsName, client_lastName, client_company_name, client_address, client_phone, client_password, client_email) values
('yosef','ibrahim','abu avi', 'al rashid 9', '0545732050', '123', 'xxx@777.com');

select * from clients;

select * from materials;

select * from clients where client_id = 1;

select * from orders;

    SELECT 
    c.client_id,
    o.order_id,
    o.order_date,
    o.delivery_date,
    o.praises,
    o.sticker_quantity,
    m.materials_type
FROM
    orders o
JOIN
    materials m ON m.materials_id = o.materials_id
JOIN
    clients c ON c.client_id = o.client_id
    WHERE
	c.client_id = 42;


--     SELECT 
--     e.first_name,
--     e.last_name,
--     e.phone,
--     d.description AS department_description,
--     p.description AS position_description
-- FROM
--     employees e
-- JOIN
--     departments d ON e.department_id = d.department_id
-- JOIN
--     positions p ON e.position_id = p.position_id
-- WHERE
--     p.position_id = 3;


insert into orders (order_date, delivery_date,praises, sticker_quantity, client_id, materials_id) values
('2025-03-03','2025-04-01',"its wass fantastic", 5100,42,1);

select * from clients
where client_id = 15;

alter table clients
add column client_address varchar(200);

ALTER TABLE clients
DROP COLUMN client_company_registration;

select * from sticker_finish;

-- Address Table
create table address(
address_id int not null auto_increment primary key,
city varchar(50),
street varchar(100),
building_number int,
postal_code int,
additional_info varchar(200),
country varchar(100)
);

-- Knives Table
create table knives (
knives_id int not null auto_increment primary key,
knives_dimensions varchar(50),
knives_stock boolean,
need_to_order boolean,
sent_for_repair boolean
);


-- Engravings Table
create table engravings (
engravings_id int not null auto_increment primary key,
engravings_name varchar(50) unique not null,
engravings_description varchar(100)
);

-- Materials Table
create table materials (
materials_id int not null auto_increment primary key,
material_description varchar(200),
material_width int
);

insert into materials (material_description, material_width) values
('Sable', '250');

select * from materials;

select * from sticker;

create table sticker (
sticker_id int not null auto_increment primary key,
client_id int,
sticker_name varchar(100),
sticker_price int,
order_id int,
foreign key(client_id) references clients(client_id) on delete cascade,
foreign key(order_id) references orders(order_id) on delete cascade
);


CREATE TABLE orders(
order_id int not null auto_increment primary key,
order_date DATE,
delivery_date DATE,
order_arrival_date DATE,
order_feedback VARCHAR(30),
order_sticker_quantity INT,
client_id INT,
knives_id INT,
engravings_id INT,
materials_id INT,
FOREIGN KEY (client_id) REFERENCES clients(client_id),
FOREIGN KEY (knives_id) REFERENCES knives(knives_id),
FOREIGN KEY (engravings_id) REFERENCES engravings(engravings_id),
FOREIGN KEY (materials_id) REFERENCES materials(materials_id)
);

alter table orders
add column sticker_id int;

alter table orders
ADD FOREIGN KEY (sticker_id) REFERENCES sticker(sticker_id);

select * from clients;











 

