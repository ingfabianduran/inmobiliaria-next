const initialState = {
  usuarios: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER': 
      return {
        ...state,
        usuarios: state.usuarios.concat([{ id: action.id, name: action.name }])
      }
    case 'DELETE_USER': 
      return {
        ...state,
        usuarios: state.usuarios.filter(item => item.id != action.id)
      }
    default: 
      return state;
  }
}