import Parse from "./parseConfig";

export async function login(email: string, password: string) {
  await Parse.User.logOut();

  const user = await Parse.User.logIn(email, password);
  return user;
}

export async function cadastrarUsuario(
  playerName: string,
  email: string,
  password: string
) {
  await Parse.User.logOut();

  const user = new Parse.User();

  user.set("username", email);
  user.set("email", email);
  user.set("password", password);
  user.set("playerName", playerName);

  await user.signUp();

  return user;
}

export async function logout() {
  await Parse.User.logOut();
}