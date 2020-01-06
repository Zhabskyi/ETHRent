const getUserByEmail = function(db, email) {
  return db
    .query(
      `
    SELECT * FROM users
    WHERE users.email = $1
  `,
      [email]
    )
    .then(res => res.rows)
    .catch(err => console.log(err));
};

const addUser = function(db, user) {
  return db
    .query(
      `
    INSERT INTO users (
      first_name, last_name, email, password, address, city, province, postal_code, phone_number, map)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
  `,
      [
        user.first_name,
        user.last_name,
        user.email,
        user.password,
        user.address,
        user.city,
        user.province,
        user.postal_code,
        user.phone_number,
        user.map
      ]
    )
    .then(res => res.rows)
    .catch(err => console.log(err));
};

const getUserById = function(db, userId) {
  return db
    .query(
      `
    SELECT * FROM users
    WHERE id = $1
  `,
      [userId]
    )
    .then(res => res.rows[0])
    .catch(err => console.log(err));
};

const addItem = function(db, item) {
  return db
    .query(
      `
    INSERT INTO items (
     title, description, daily_rate, deposit, user_id, photo)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `,
      [
        item.title,
        item.description,
        item.daily_rate,
        item.deposit,
        item.user_id,
        item.photo
      ]
    )
    .then(res => res.rows[0])
    .catch(err => console.log(err));
};

const updateItem = function(db, item, id) {
  return db
    .query(
      `
    UPDATE items
    SET title = $2,
        description = $3,
        daily_rate = $4,
        deposit = $5,
        photo = $6
    WHERE id = $1
    RETURNING *;
  `,
      [
        id,
        item.title,
        item.description,
        item.daily_rate,
        item.deposit,
        item.photo
      ]
    )
    .then(res => res.rows[0])
    .catch(err => console.log(err));
};

const deleteItemById = function(db, itemId) {
  return db
    .query(
      `
    DELETE FROM items WHERE items.id = $1;
  `,
      [itemId]
    )
    .catch(err => console.log(err));
};

module.exports = {
  addUser,
  getUserByEmail,
  getUserById,
  addItem,
  updateItem,
  deleteItemById
};
