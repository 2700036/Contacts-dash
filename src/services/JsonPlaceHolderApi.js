class JsonPlaceHolderApi {
  getUsers = () => {
    return fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .then((res) => {
        return res.map(({ id, name, email, address, phone, website, company }) => {
          return { id, name, email, address, phone, website, company };
        });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };
  
 
}

const jsonPlaceHolderApi = new JsonPlaceHolderApi();

export default jsonPlaceHolderApi;
