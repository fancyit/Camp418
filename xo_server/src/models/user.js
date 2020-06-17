class User {
  id;
  name;
  password;
  group;
  constructor(id, name, password, group = 'users') {
    this.id = id;
    this.name = name;
    this.password = password;
    this.group = group;
  }
}
module.exports = User;

