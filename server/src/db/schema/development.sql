INSERT INTO users (first_name, last_name, email, password, address, city, province, postal_code, phone_number, map)
VALUES ('Alice', 'McLoud', 'mcloud@gmail.com', '123456', '3104 46 ave', 'Calgary', 'Alberta', 'T3H5X5', '4034445566', 'https://maps.googleapis.com/maps/api/staticmap?fillcolor:black&center=Calgary,+AB+T3H+5X5&zoom=16&size=400x400&key={process.env.REACT_APP_API_GOOGLE_API}');
INSERT INTO users (first_name, last_name, email, password, address, city, province, postal_code, phone_number, map)
VALUES ('John', 'Doe', 'doe@gmail.com', '123456', '3104 46 ave', 'Calgary', 'Alberta', 'T3E6XS6', '4034445566', 'https://maps.googleapis.com/maps/api/staticmap?fillcolor:black&center=Calgary,+AB+T3H+5X5&zoom=16&size=400x400&key=${process.env.REACT_APP_API_GOOGLE_API}');
INSERT INTO users (first_name, last_name, email, password, address, city, province, postal_code, phone_number, map)
VALUES ('Marry', 'Doe', 'marryd@gmail.com', '123456', '3104 46 ave', 'Calgary', 'Alberta', 'T3H2H3', '4034445566', 'https://maps.googleapis.com/maps/api/staticmap?fillcolor:black&center=Calgary,+AB+T3H+5X5&zoom=16&size=400x400&key={process.env.REACT_APP_API_GOOGLE_API}');

INSERT INTO items (user_id,  created_on, title, description, daily_rate, deposit, photo)
VALUES ('1', '2019-11-01', 'Hammer', 'Good for hitting nails', 2, 3, 'https://images.unsplash.com/photo-1566937169390-7be4c63b8a0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60');
INSERT INTO items (user_id, created_on, title, description, daily_rate, deposit, photo)
VALUES ('2', '2019-11-01', 'Hammer', 'Good for hitting nails', 3, 3, 'https://images.unsplash.com/photo-1566937169390-7be4c63b8a0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60');
INSERT INTO items (user_id, created_on, title, description, daily_rate, deposit, photo)
VALUES ('3', '2019-11-01', 'Hammer', 'Good for hitting nails', 3, 3, 'https://images.unsplash.com/photo-1566937169390-7be4c63b8a0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60');

