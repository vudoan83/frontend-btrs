import React from "react"
import { List, Avatar } from 'antd'
import { MessageProps } from "./Chat.interface"
import { twJoin } from "tailwind-merge"

export const ConversationItem = ({ message, isGuess = false }: MessageProps) => {
  return (
    <List.Item>
      <List.Item.Meta
        className={twJoin("", !isGuess ? "flex-row-reverse text-right" : "")}
        avatar={<Avatar src="https://randomuser.me/api/portraits/women/63.jpg"/>}
        title={<strong>{message.name}:</strong>}
        description={`${message.message} (${message.timestamp})`}
      />
    </List.Item>
  )
}