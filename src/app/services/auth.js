import Parse from "./parseConfig";

export async function cadastrarUsuario(username, email, password) {

  const user = new Parse.User();

  user.set("username", username);
  user.set("email", email);
  user.set("password", password);

  try {

    const result = await user.signUp();

    console.log("Usuário criado:", result);

    return result;

  } catch (error) {

    console.error(error.message);

  }
}

export async function login(username, password) {

  try {

    const user = await Parse.User.logIn(username, password);

    console.log("Login realizado:", user);

    return user;

  } catch (error) {

    console.error(error.message);

  }
}

export async function logout() {

  await Parse.User.logOut();

}