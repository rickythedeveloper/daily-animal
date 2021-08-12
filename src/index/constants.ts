enum MessageType {
	requestNextBreedData,
	requestDogsData,
	requestBreedPhotoUrls,
}

type MessageTypeString = keyof typeof MessageType;

export { MessageType, MessageTypeString };
