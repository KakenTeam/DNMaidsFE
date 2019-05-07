export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties
});


export function renderGender(value) {
  return value == 1 ? "Nam": "Nữ"
}