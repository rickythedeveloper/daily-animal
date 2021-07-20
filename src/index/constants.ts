enum MessageType {
	requestBreedData,
	returnBreedData,
}

type MessageTypeString = keyof typeof MessageType;

export { MessageType, MessageTypeString };
