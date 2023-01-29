export function formatDate(date: Date) {
	// Return date in dd-mm-yyyy format
	return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}
