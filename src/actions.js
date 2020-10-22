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
export const updateUserEmail = payload => ({
  type: "UPDATE_EMAIL",
  payload
});
export const setInfoPopupData = payload => ({
  type: "UPDATE_INFO_POPUP",
  payload
});
export const closeInfoPopup = () => ({
  type: "CLOSE_INFO_POPUP"
});
export const login = () => ({
  type: "LOGIN"
});
export const logout = () => ({
  type: "LOGOUT"
});


