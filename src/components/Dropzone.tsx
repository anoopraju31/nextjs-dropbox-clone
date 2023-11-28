'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import DropzoneComponent from 'react-dropzone'
import { cn } from '@/lib/utils'
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore'
import { db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const Dropzone = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const { isLoaded, isSignedIn, user } = useUser()

	// * MAX FILE SIZE 20MB
	const maxSize = 20971520
	const onDrop = (acceptedFiles: File[]) => {
		acceptedFiles.forEach((file) => {
			const reader = new FileReader()

			reader.onload = async () => {
				await uploadPost(file)
			}

			reader.readAsArrayBuffer(file)
		})
	}

	const uploadPost = async (selectedFile: File) => {
		if (loading) return
		if (!user) return

		setLoading(true)

		const docRef = await addDoc(collection(db, 'users', user.id, 'files'), {
			userId: user.id,
			filename: selectedFile.name,
			fullName: user.fullName,
			profileImg: user.imageUrl,
			timestamp: serverTimestamp(),
			type: selectedFile.type,
			size: selectedFile.size,
		})

		const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`)

		uploadBytes(imageRef, selectedFile).then(async () => {
			const downloadUrl = await getDownloadURL(imageRef)

			await updateDoc(doc(db, 'users', user.id, 'files', docRef.id), {
				downloadUrl,
			})
		})

		setLoading(false)
	}

	return (
		<DropzoneComponent
			minSize={0}
			maxSize={maxSize}
			onDrop={(acceptedFiles) => onDrop(acceptedFiles)}>
			{({
				getRootProps,
				getInputProps,
				isDragActive,
				isDragReject,
				fileRejections,
			}) => {
				const isFileTooLarge =
					fileRejections.length > 0 && fileRejections[0].file.size > maxSize
				return (
					<section className='m-4'>
						<div
							className={cn(
								'w-full container h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center',
								isDragActive
									? 'bg-[#035FFE] text-white animate-pulse'
									: 'bg-slate-100/50 dark:bg-slate-800/80 text-slate-400',
							)}
							{...getRootProps()}>
							<input {...getInputProps()} />
							{!isDragActive && 'Click here or drop a file to upload!'}
							{isDragActive &&
								!isDragReject &&
								'Drop to upload this file!'}{' '}
							{isFileTooLarge && (
								<div className='text-danger mt2'> File is too large. </div>
							)}
						</div>
					</section>
				)
			}}
		</DropzoneComponent>
	)
}

export default Dropzone
