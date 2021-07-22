enum MessageType {
	requestBreedData,
	requestBreedPhotos,
}

type MessageTypeString = keyof typeof MessageType;

export { MessageType, MessageTypeString };
