const initialState = {
  contacts: [],
  loggedIn: false,
  userEmail: null,
  infoPopupData: false,
};

export default (state = initialState, { type, payload }) => {
 
  switch (type) {
    case 'FETCH_CONTACTS':
      return { ...state, contacts: payload };

    case 'ADD_CONTACT':
      const newContacts = [{ id: state.contacts.length + 1, ...payload }, ...state.contacts];
      return { ...state, contacts: newContacts };

    case 'EDIT_CONTACT':
      const contact = state.contacts.find(({ id }) => payload.id == id);
      const newContact = { ...contact, ...payload };
      return {
        ...state,
        contacts: [
          ...state.contacts.slice(0, findIndexById(payload.id, state.contacts)),
          newContact,
          ...state.contacts.slice(findIndexById(payload.id, state.contacts) + 1),
        ],
      };

    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: [
          ...state.contacts.slice(0, findIndexById(payload, state.contacts)),
          ...state.contacts.slice(findIndexById(payload, state.contacts) + 1),
        ],
      };
    case 'LOGIN':
      return { ...state, loggedIn: true };
    case 'LOGOUT':
      return { ...state, loggedIn: false };
    case 'UPDATE_EMAIL':
      return { ...state, userEmail: payload };
    case 'UPDATE_INFO_POPUP':
      return { ...state, infoPopupData: payload };
    case 'CLOSE_INFO_POPUP':
      return { ...state, infoPopupData: null };

    default:
      return state;
  }
};

const findIndexById = (id, contacts) => {
  return contacts.findIndex((el) => id == el.id);
};
