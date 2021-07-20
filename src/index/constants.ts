enum MessageType {
  someAsyncMessage = 'someAsyncMessage',
  someAsyncReply = 'someAsyncReply',
  someSyncMessage = 'someSyncMessage',
}

type MessageTypeString = keyof typeof MessageType;

export { MessageType, MessageTypeString };
