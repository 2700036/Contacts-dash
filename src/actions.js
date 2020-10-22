export const contactsLoaded = payload => ({
  type: "FETCH_CONTACTS",
  payload
});
export const addContact = payload => ({
  type: "ADD_CONTACT",
  payload
});
export const editContact = payload => ({
  type: "EDIT_CONTACT",
  payload
});
export const deleteContact = payload => ({
  type: "DELETE_CONTACT",
  payload
});
export const login = () => ({
  type: "LOGIN"
});
export const logout = () => ({
  type: "LOGOUT"
});

