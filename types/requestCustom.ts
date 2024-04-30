import { UserInterface } from "./userInterface"

declare global {
  namespace Express {
    interface Request {
      user?: UserInterface
    }
  }
}
