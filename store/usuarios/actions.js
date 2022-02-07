let contadorIndices = 0;

const addUser = (name) => {
  return {
    type: 'ADD_USER',
    id: contadorIndices ++,
    name: `${name} ${contadorIndices}`
  };
};

const deleteUser = (id) => {
  return {
    type: 'DELETE_USER',
    id
  };
};

export { addUser, deleteUser };