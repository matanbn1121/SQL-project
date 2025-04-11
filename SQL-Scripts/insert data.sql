insert into positions (description) values
("CEO");

select * from positions;

insert into departments (description) values
('Offices');

select * from departments;

insert into employees (first_name, last_name, gender, address, phone, email, start_date, position_id,salary, department_id) values
('eyal','zalman','female','kenaton','0547997909','eyal@slr.co.il','2006-3-1',3,25000,2);

select * from employees;

insert into customers (Customer_name, entry_date) values
('Dalton','2012-08-01'),('Matar','2020-09-04'),('Yekev Bazak','2025-01-09');

select * from customers;

insert into materials (material_description, material_width, material_pet) values
('Silver PP', 280, 0),('White PE',300,0),('Silver PE',300,0),('Ivory',270,1)
,('Rustic',250,0),('Chromo',250,0),('White PP',250,0),('Aqurello',330,1);

select * from materials;

insert into knives (knives_dimensions, materials_id, in_stock, need_to_order, sent_for_repair) values
('95x90',6,1,0,0);

select * from knives;

insert into engravings (engravings_name, engravings_description) values
('EM0030','Embossing');

select * from engravings;

insert into orders (customer_id, order_date, delivery_date, praises, knives_id, engravings_id) values
(6, '2024-02-01', '2024-03-1', 'Silk screen',1 ,5);

select * from orders;

-- Gloss varnish', 'Matte varnish', 'Matte lamination', 'Glossy lamination' ,
-- 'Embossing and debossing', 'Foil stampin only', 'Silk screen'),



