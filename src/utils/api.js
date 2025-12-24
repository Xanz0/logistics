// const BASE_URL = "https://694bbae426e870772068f95a.mockapi.io/orders";

// // Fetch all orders
// export const fetchOrders = async () => {
//   const res = await fetch(BASE_URL);
//   if (!res.ok) throw new Error("Failed to fetch orders");
//   return res.json();
// };

// // Add new order
// export const addOrder = async (order) => {
//   const res = await fetch(BASE_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(order)
//   });
//   if (!res.ok) throw new Error("Failed to add order");
//   return res.json();
// };

// // Edit order
// export const editOrder = async (id, updated) => {
//   const res = await fetch(`${BASE_URL}/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(updated)
//   });
//   if (!res.ok) throw new Error("Failed to update order");
//   return res.json();
// };

// // Delete order
// export const deleteOrder = async (id) => {
//   const res = await fetch(`${BASE_URL}/${id}`, {
//     method: "DELETE"
//   });
//   if (!res.ok) throw new Error("Failed to delete order");
//   return res.json();
// };

const BASE_URL = "https://694bbae426e870772068f95a.mockapi.io/orders";

export const fetchOrders = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const deleteOrder = async (id) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};

export const editOrder = async (id, data) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
