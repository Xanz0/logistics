const KEY = "order_extra_data";

export const getExtraData = () =>
  JSON.parse(localStorage.getItem(KEY)) || {};

export const saveExtraData = (id, data) => {
  const all = getExtraData();
  all[id] = { ...all[id], ...data };
  localStorage.setItem(KEY, JSON.stringify(all));
};
