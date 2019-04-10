export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updateObject
});