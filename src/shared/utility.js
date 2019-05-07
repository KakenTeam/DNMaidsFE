
export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties
});


export function renderGender(value) {
  return value == 1 ? "Nam": "Nữ"
}

export function renderServiceType(value) {
  return value == 0 ? "Dùng lẻ" : "Dùng định kỳ"
}

export function formatMoney(value) {
  const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  return priceSplitter(value) + "₫";
}