export default class UserModel {
  constructor(id, name, email, password, options) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.user = options;
  }
  static addUser(name, email, password1, options) {
    const newUser = new UserModel(
      users.length + 1,
      name,
      email,
      password1,
      options
    );
    users.push(newUser);
  }
  static checkUser(email, password) {
    let user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      return user;
    } else {
      return false;
    }
  }
}
const users = [
  {
    id: 1,
    name: "name1",
    email: "email1@example.com",
    password: "password1",
    options: "recruiter",
  },
  {
    id: 2,
    name: "name2",
    email: "email2@example.com",
    password: "password2",
    options: "recruiter",
  },
  {
    id: 3,
    name: "name3",
    email: "email3@example.com",
    password: "password3",
    options: "recruiter",
  },
  {
    id: 4,
    name: "name4",
    email: "email4@example.com",
    password: "password4",
    options: "jobseeker",
  },
  {
    id: 5,
    name: "name5",
    email: "email5@example.com",
    password: "password5",
    options: "jobseeker",
  },
];
