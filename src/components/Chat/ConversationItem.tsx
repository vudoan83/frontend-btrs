import React from "react"
import { List, Avatar } from 'antd'
import { MessageProps } from "./Chat.interface"

export const ConversationItem = ({ message }: MessageProps) => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src="https://randomuser.me/api/portraits/women/63.jpg"/>}
        title={<strong>{message.name}:</strong>}
        description={`${message.message} (${message.timestamp})`}
      />
    </List.Item>
  )
}