export interface UpdateAccessTokenRepository {
  updateAccesToken (id: string, token: string): Promise<void>
}
