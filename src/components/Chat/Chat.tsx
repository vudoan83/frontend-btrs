import React, { useState, useEffect, useRef, useCallback } from 'react'
import { List, Input, Button, InputRef } from 'antd'
import { Message } from './Chat.interface'
import { ConversationItem } from './ConversationItem'

const Chat: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [enteredChat, setEnteredChat] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [pageCount, setPageCount] = useState<number>(1)
  const pageSize = 5
  const messageInput = useRef<InputRef>(null)

  const updateMessagesState = useCallback(() => {
    const storedMessages: Message[] = JSON.parse(localStorage.getItem('chatMessages') || '[]')
    setMessages(storedMessages.sort(sortDescByTimestamp))
  }, [])


  useEffect(() => {
    window.addEventListener('storage', () => {
      updateMessagesState()
    })
    updateMessagesState()
  }, [updateMessagesState])

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

  const sortDescByTimestamp = (a: Message, b: Message) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
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
    setPageCount((count) => count + 1)
  }

  const renderConversationItem = (msg: Message) => {
    return <ConversationItem message={msg} isGuess={msg.name !== name} />
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
          <List
            className="max-h-72 overflow-y-auto"
            itemLayout="horizontal"
            dataSource={messages.slice(-pageSize * pageCount)}
            renderItem={renderConversationItem}
          />
          {messages.length > pageSize * pageCount && (
            <div className="my-3 h-8 text-center">
              <Button className='bg-[#1677ff] text-center text-white' onClick={handleLoadMore}>Load more</Button>
            </div>
          )}
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
