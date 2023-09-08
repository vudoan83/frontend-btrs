export type Message = {
  name: string;
  message: string;
  timestamp: string;
}

export interface MessageProps {
  message: Message,
  isGuess?: boolean
}