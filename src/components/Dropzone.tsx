'use client'

import DropzoneComponent from 'react-dropzone'

const Dropzone = () => {
	return (
		<DropzoneComponent onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
			{({ getRootProps, getInputProps }) => (
				<section>
					<div {...getRootProps()}>
						<input {...getInputProps()} />
						<p>Drag n drop some files here, or click to select files</p>
					</div>
				</section>
			)}
		</DropzoneComponent>
	)
}

export default Dropzone
