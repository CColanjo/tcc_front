export const setDocumentTitle = (title: string) => {
	let docTitle = 'DART - template'

	if (title) {
		docTitle += ` - ${title}`
	}

	document.title = docTitle
}
