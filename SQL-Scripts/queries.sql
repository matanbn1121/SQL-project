-- select 
-- 	e.first_name,
--     e.last_name,
--     d.description,
--     p.description
-- from
-- 	employees e
-- join
-- 	departments d on
--     positions p
-- where
-- 	p.position_id = 3
    
 ---------------------------------------   
    
--     SELECT 
--     e.first_name,
--     e.last_name,
--     e.phone,
--     d.description,
--     p.description
-- FROM
--     employees e
-- JOIN
--     departments d ON e.department_id = d.department_id
-- JOIN
--     positions p ON e.position_id = p.position_id
-- WHERE
--     p.position_id = 3
    
--------------------------------------------   תציג לי את כל העובדים במחלקת הגרפיקה
    
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

-- תציג לי את כל ההזמנות כולל שם לקוח, מידות הסכין, ומס' גלופה שמשתמשים
SELECT
    c.customer_name,
    o.order_date,
    o.delivery_date,
    o.praises,
    k.knives_dimensions,
    e.engravings_name
FROM
    orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN knives k ON o.knives_id = k.knives_id
JOIN engravings e ON e.engravings_id = o.engravings_id;

-- תציג לי שם לקוח וכמה הזמנות יש לו
SELECT
    c.customer_name,
    count(o.customer_id) as count_orders
FROM
    orders o
JOIN customers c ON o.customer_id = c.customer_id
group by o.customer_id
having count(o.customer_id);

-- תציג לי לקוחות שיש להם יותר מהזמנה אחת באותו יום
SELECT
	c.customer_name,
    o.order_date,
    count(o.order_id) as order_count
FROM
	orders o
    JOIN customers c ON o.customer_id = c.customer_id
group by
    o.order_date, c.customer_name
having count(o.order_date)>1;

-- תציג לי ממוצע המשכורות בש.ל.ר
select 
avg(e.salary) as ממוצע_המשכורות_בשלר_הוא
from 
	employees e;

-- תציג לי שם פרטי ומשפחה לעובד הכי וותיק בשלר
SELECT 
    first_name,last_name,
    start_date AS תאריך_התחלת_עבודה
FROM 
    employees 
ORDER BY 
    start_date ASC
LIMIT 1;

    



    