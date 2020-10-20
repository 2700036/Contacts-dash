const initialState = {
  contacts: [],
};

export default (state = initialState, { type, payload }) => {
  console.log(type, payload);

  switch (type) {
    case 'FETCH_CONTACTS':
      return { ...state, contacts: payload };

    case 'ADD_CONTACT':
      const newContacts = [{id: state.contacts.length+1, ...payload}, ...state.contacts]
      return { ...state, contacts: newContacts };

    case 'EDIT_CONTACT':
      const contact = state.contacts.find(({id})=>payload.id == id);
      const newContact = {...contact, ...payload}; 
      return { ...state, 
        contacts: [
          ...state.contacts.slice(0, findIndexById(payload.id, state.contacts)), 
          newContact,
          ...state.contacts.slice(findIndexById(payload.id, state.contacts) + 1, )
        ] 
      };

    case 'DELETE_CONTACT':      
      return { ...state, 
        contacts: [
          ...state.contacts.slice(0, findIndexById(payload, state.contacts)),           
          ...state.contacts.slice(findIndexById(payload, state.contacts) + 1, )
        ] 
      };


    default:
      return state;
  }
};


const findIndexById = (id, contacts) => {
  return contacts.findIndex((el)=> id == el.id);
}

