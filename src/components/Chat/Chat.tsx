import React, { useState, useEffect, useRef } from 'react'
import { List, Input, Button, InputRef } from 'antd'
import { Message } from './Chat.interface'
import { ConversationItem } from './ConversationItem'

const Chat: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [enteredChat, setEnteredChat] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const pageSize = 5
  const messageInput = useRef<InputRef>(null)

  useEffect(() => {
    window.addEventListener('storage', () => {
      const storedMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]')
      setMessages(storedMessages)
    })
    
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]')
    setMessages(storedMessages)
  }, [])

  useEffect(() => {
    // Set auto focus on message input when user enters chat
    if (enteredChat) {
      messageInput.current?.focus({
        cursor: 'end',
      })
    }
  }, [enteredChat])

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
      localStorage.setItem('chatMessages', JSON.stringify([...messages, newMessage]))
      window.dispatchEvent(new Event("storage"))
      setMessage('')
    }
  }

  const handleLoadMore = () => {
    // TODO: Implement load more messages functionality
  }

  const renderConversationItem = (msg: Message) => {
    return <ConversationItem message={msg} isGuess={msg.name !== name}/>
  }

  return (
    <div className="w-6/12 mx-2.5">
      <div className="chat-header">
        <h1>Chat Room {name}</h1>
        {!enteredChat ? (
          <Input
            placeholder="Your Name"
            value={name}
            onChange={handleNameChange}
            onPressEnter={() => setEnteredChat(true)}
          />
        ) : null}
      </div>
      
      {enteredChat ? (
        <>
          <div className="chat-messages">
            <List
              itemLayout="horizontal"
              dataSource={messages.slice(-pageSize)}
              renderItem={renderConversationItem}
            />
            {messages.length > pageSize && (
              <Button className='bg-[#1677ff]' onClick={handleLoadMore}>Load More</Button>
            )}
          </div>
          <div className="chat-input">
            <Input
              placeholder="Message"
              value={message}
              onChange={handleMessageChange}
              onPressEnter={handleSendMessage}
              ref={messageInput}
            />
            <Button className='bg-[#1677ff] mt-2.5' type="primary" onClick={handleSendMessage}>
              Send
            </Button>
          </div>
        </>
      ) : null}
      
    </div>
  )
}

export default Chat
