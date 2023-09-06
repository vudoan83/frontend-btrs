import React from "react"
import { List } from 'antd'
import { MessageProps } from "./Chat.interface"

export const ChatItem = ({ message }: MessageProps) => {
  return (
    <List.Item>
      <List.Item.Meta
        title={<strong>{message.name}:</strong>}
        description={`${message.message} (${message.timestamp})`}
      />
    </List.Item>
  )
}