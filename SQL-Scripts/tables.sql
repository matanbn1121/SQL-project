CREATE DATABASE IF NOT EXISTS SLR_DataBase;
use slr_database;

-- טבלת עובדים
create table Employeesdepartments(
employees_id INT NOT NULL auto_increment primary key,
first_name varchar(50) not null,
last_name varchar(50) not null,
gender enum('male','female') not null,
address varchar(100) not null,
phone char(10),
email VARCHAR(100) NOT NULL UNIQUE,
start_date date not null,
position_id int NOT NULL,
salary DECIMAL(10) NOT NULL,
department_id int not null
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

-- טבלת לקוחות
create table customers (
customer_id int not null auto_increment primary key,
customer_name varchar(200),
entry_date date);

-- טבלת חומרי גלם
create table materials (
materials_id int not null auto_increment primary key,
material_description varchar(200),
material_width int,
material_pet boolean
);

-- טבלת סכינים
create table knives (
knives_id int not null auto_increment primary key,
knives_dimensions varchar(50),
materials_id int,
foreign key(materials_id) references materials(materials_id) on delete cascade,
in_stock boolean,
need_to_order boolean,
sent_for_repair boolean
);

-- טבלת גלופות
create table engravings (
engravings_id int not null auto_increment primary key,
engravings_name varchar(50) unique not null,
engravings_description varchar(100)
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












 

