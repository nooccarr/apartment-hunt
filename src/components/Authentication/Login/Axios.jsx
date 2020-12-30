import axios from 'axios';

const login = (email, password) => {
  axios
    .post('/login', {
      email,
      password,
    })
    .then((res) => {
      console.log(res);
    });
};

const signUp = (email, password, username) => {
  axios.post('/signup', {
    email,
    password,
    username,
  });
};

export { login, signUp };
