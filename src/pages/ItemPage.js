import React, { useState, useEffect } from "react";
import axios from "axios";

const ItemPage = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get("http://localhost:5000/api/items");
    setItems(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name && form.description) {
      await axios.post("http://localhost:5000/api/items", form);
      setForm({ name: "", description: "" });
      fetchItems();
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems();
  };

  return (
    <div>
      <h1>Item List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>{item.name}:</strong> {item.description}{" "}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemPage;
