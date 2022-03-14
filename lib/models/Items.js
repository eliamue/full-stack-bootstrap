import pool from '../utils/pool.js';

export default class Items {
  id;
  title;
  website;
  logo;
  textfield;
  truthy_thing;
  number_thing;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.textfield = row.textfield;
    this.website = row.website;
    this.logo = row.logo;
    this.truthy_thing = row.truthy_thing;
    this.number_thing = row.number_thing;
  }

  static async insert({
    title,
    textfield,
    website,
    logo,
    truthy_thing,
    number_thing,
  }) {
    const { rows } = await pool.query(
      'INSERT INTO items (title, textfield, website, logo, truthy_thing, number_thing) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, textfield, website, logo, truthy_thing, number_thing]
    );
    return new Items(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM items');
    return rows.map((row) => new Items(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM items WHERE id=$1', [
      id,
    ]);
    return new Items(rows[0]);
  }

  static async update(
    id,
    { title, website, logo, textfield, truthy_thing, number_thing }
  ) {
    const existingItem = await Companies.getById(id);
    const new_title = title ?? existingItem.title;
    const new_website = website ?? existingItem.website;
    const new_logo = logo ?? existingItem.logo;
    const new_textfield = textfield ?? existingItem.textfield;
    const new_truthy_thing = truthy_thing ?? existingItem.truthy_thing;
    const new_number_thing = number_thing ?? existingItem.number_thing;

    const { rows } = await pool.query(
      'UPDATE items SET title=$1, textfield=$2, website=$3, logo=$4, truthy_thing=$5, number_thing=$6 WHERE id=$7 RETURNING *',
      [
        new_title,
        new_website,
        new_logo,
        new_textfield,
        new_truthy_thing,
        new_number_thing,
        id,
      ]
    );
    return new Items(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM items WHERE id=$1 RETURNING *',
      [id]
    );
    return new Items(rows[0]);
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      textfield: this.textfield,
      website: this.website,
      logo: this.logo,
      truthy_thing: this.truthy_thing,
      number_thing: this.number_thing
    };
  }
}
