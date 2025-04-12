CREATE DATABASE IF NOT EXISTS SQL_slr_Project;
use SQL_slr_Project;

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

create table sticker (
sticker_id int not null auto_increment primary key,
client_id int,
sticker_name varchar(100),
sticker_price int,
order_id int,
foreign key(client_id) references clients(client_address_id) on delete cascade
);


CREATE TABLE orders(
order_id int not null auto_increment primary key,
order_date DATE,
delivery_date DATE,
order_arrival_date DATE,
order_praises VARCHAR(30),
order_sticker_quantity TINYINT,
client_id INT,
knives_id INT,
engravings_id INT,
sticker_id INT,
materials_id INT,
FOREIGN KEY (client_id) REFERENCES clients(client_id),
FOREIGN KEY (knives_id) REFERENCES knives(knives_id),
FOREIGN KEY (engravings_id) REFERENCES engravings(engravings_id),
FOREIGN KEY (sticker_id) REFERENCES sticker(sticker_id),
FOREIGN KEY (materials_id) REFERENCES materials(materials_id)
);








select * from employees;

-- קשרתי את המזהה מחלקה לטבלת מחלקות
alter table employees
add constraint fk_department_id
foreign key (department_id)
references departments(department_id)
on delete cascade;

-- תפקידים בעבודה
create table positions (
position_id int not null auto_increment primary key,
description varchar(50) not null
);

-- מחלקות בעבודה
create table departments (
department_id int not null auto_increment primary key,
description varchar(50) not null
);




-- טבלת הזמנות
create table orders (
order_id int not null auto_increment primary key,
customer_id int,
foreign key(customer_id) references customers(customer_id) on delete cascade,
order_date date not null,
delivery_date date not null,
praises enum('Gloss varnish', 'Matte varnish', 'Matte lamination', 'Glossy lamination' ,
'Embossing and debossing', 'Foil stampin only', 'Silk screen'),
knives_id int,
foreign key(knives_id) references knives(knives_id) on delete cascade,
engravings_id int,
foreign key(engravings_id) references engravings(engravings_id) on delete cascade
);












 

