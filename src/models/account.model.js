export class Account {
  constructor({ id, name, email, password }) {
    this.id = id || null;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  toDTO() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
