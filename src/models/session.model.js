export class Session {
  constructor({ session_id, user_id, access_token, refresh_token }) {
    this.id = session_id;
    this.user_id = user_id;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }

  toDTO() {
    return {
      id: this.id,
      user_id: this.user_id,
    };
  }
}
