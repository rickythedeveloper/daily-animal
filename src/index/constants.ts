enum MessageType {
	requestNextBreedData,
	requestDogsData,
}

type MessageTypeString = keyof typeof MessageType;

export { MessageType, MessageTypeString };
