export class Session {
  constructor(sessionId, userId, accessToken, refreshToken) {
    this.session_id = sessionId;
    this.user_id = userId;
    this.access_token = accessToken;
    this.refresh_token = refreshToken;
  }
}
