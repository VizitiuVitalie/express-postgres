export class Account {
  constructor({ id, name, email, password }) {
    if (!id) {
      this.id = id;
    }
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
