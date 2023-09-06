import React, { useState, useEffect } from 'react'
import { List, Input, Button } from 'antd'
import { Message } from './Chat.interface'
import { ChatItem } from './ChatItem'

const Chat: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const pageSize = 25

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]')
    setMessages(storedMessages)
  }, [])

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages))
  }, [messages])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = () => {
    if (name && message) {
      const newMessage: Message = {
        name,
        message,
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages([...messages, newMessage])
      setMessage('')
    }
  }

  const handleLoadMore = () => {
    // TODO: Implement load more messages functionality
  }

  const renderChatItem = (msg: Message) => {
    return <ChatItem message={msg} />
  }

  return (
    <div className="chat">
      <div className="chat-header">
        <h1>Chat Room</h1>
      </div>
      <div className="chat-messages">
        <List
          itemLayout="horizontal"
          dataSource={messages.slice(-pageSize)}
          renderItem={renderChatItem}
        />
        {messages.length > pageSize && (
          <Button onClick={handleLoadMore}>Load More</Button>
        )}
      </div>
      <div className="chat-input">
        <Input
          placeholder="Your Name"
          value={name}
          onChange={handleNameChange}
        />
        <Input
          placeholder="Message"
          value={message}
          onChange={handleMessageChange}
        />
        <Button type="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </div>
    </div>
  )
}

export default Chat
