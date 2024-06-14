export class Session {
  constructor({ sessionId, userId, accessToken, refreshToken }) {
    this.id = sessionId;
    this.user_id = userId;
    this.access_token = accessToken;
    this.refresh_token = refreshToken;
  }

  toDTO() {
    return {
      id: this.id,
      user_id: this.user_id,
    };
  }
}
