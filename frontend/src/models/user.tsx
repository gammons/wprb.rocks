type UserInterface = {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export default class User {
  accessToken: string
  refreshToken: string
  expiresIn: number

  constructor(args: UserInterface) {
    this.accessToken = args.accessToken
    this.refreshToken = args.refreshToken
    this.expiresIn = args.expiresIn
  }
}
