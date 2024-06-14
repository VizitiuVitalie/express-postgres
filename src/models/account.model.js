export class Account {
  constructor(id, name, email, password) {
    this.user_id = id;
    this.user_name = name;
    this.user_email = email;
    this.user_password = password;
  }

  toDTO() {
    return {
      user_id: this.user_id,
      user_name: this.user_name,
      user_email: this.user_email,
    };
  }
}
