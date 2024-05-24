import { UserInterface } from "./userInterface.js"

declare global {
  namespace Express {
    interface Request {
      user?: UserInterface
    }
  }
}
