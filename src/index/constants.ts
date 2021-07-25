enum MessageType {
	requestNextBreedData,
}

type MessageTypeString = keyof typeof MessageType;

export { MessageType, MessageTypeString };
