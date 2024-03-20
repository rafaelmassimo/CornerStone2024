type UpdateDivider = {
	title: string;
	titleSize: number;
};

type UpdateImage =
	| { caption: string; captionSize: number }
	| { position: "left" | "center" | "right" };

type UpdateText =
	| { heading: string; headingSize:number }
	| { content: string; contentSize: number}
	| { position: 'left' | 'center' | 'right' };

type UpdateImageText =
	| { imgCaption: string; imgCaptionSize: number}
	| { txtHeading: string; txtHeadingSize: number}
	| { txtContent: string; txtContentSize: number}
	| { position: 'text_img' | 'img_text' };

export const updateSectionDivider = async (sectionId: string, updateData: UpdateDivider) => {
	const response = await fetch(`http://localhost:4000/api/section-divider/${sectionId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(updateData)
	});

	return response.json();
};

export const updateSectionImage = async (sectionId: string, updateData: UpdateImage) => {
	const response = await fetch(`http://localhost:4000/api/section-image/${sectionId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(updateData)
	});
	return response.json();
};

export const uploadSectionImage = async (sectionId: string, imageFile: File) => {
	try{
		const formData = new FormData();
        formData.append('image', imageFile);

        const response = await fetch(`http://localhost:4000/api/section-image/upload/${sectionId}`, {
            method: 'PATCH',
            body: formData,
        });

	return response.json();
	} catch (error) {
		console.error( "There has been a problem with your fetch operation: ", error );
		throw error;
	}
};

export const uploadSectionImageText = async (sectionId: string, imageFile: File) => {
	try{
		const formData = new FormData();
	
		formData.append('image', imageFile);

		const response = await fetch(`http://localhost:4000/api/section-image-text/upload/${sectionId}`, {
				method: 'PATCH',
				body: formData,
		});

		return response.json();
	} catch (error) {
		console.error( "There has been a problem with your fetch operation: ", error );
		throw error;
	}
};

export const updateSectionText = async (sectionId: string, updateData: UpdateText) => {
	const response = await fetch(`http://localhost:4000/api/section-text/${sectionId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(updateData)
	});

	return response.json();
};

export const updateSectionImageText = async (sectionId: string, updateData: UpdateImageText) => {
	const response = await fetch(`http://localhost:4000/api/section-image-text/${sectionId}`, {
		method: 'PATCH',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(updateData)
	});

	return response.json();
};