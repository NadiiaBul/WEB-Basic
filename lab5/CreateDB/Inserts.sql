INSERT INTO [dbo].[Info] ([Name], [Surname], [Patronymic], [Group], [Phone], [IdCard], [Variant])
VALUES 
  ('John', 'Doe', 'Smith', 'A101', '555-555-5555', 'ID1234', '1'),
  ('Jane', 'Doe', 'Smith', 'A102', '555-555-5555', 'ID5678', '2'),
  ('Bob', 'Johnson', NULL, 'B101', '555-555-5555', 'ID9101', '3'),
  ('Alice', 'Johnson', NULL, 'B102', '555-555-5555', 'ID1121', '4'),
  ('Mike', 'Smith', NULL, 'C101', '555-555-5555', 'ID3141', '5');

go
-- Insert into AuthTable table
INSERT INTO [dbo].[AuthTable] ([Login], [Password], [Role], [IdInfo])
VALUES 
  ('admin', 'admin', 0, null),
  ('john_doe', 'password123', 1, 1),
  ('jane_doe', 'password123', 2, 2),
  ('bob_johnson', 'password123', 2, 3),
  ('alice_johnson', 'password123', 2, 4),
  ('mike_smith', 'password123', 1, 5);
