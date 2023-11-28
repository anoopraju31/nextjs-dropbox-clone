'use client'

import { useUser } from '@clerk/nextjs'
import { useAppStore } from '@/store/store'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { db } from '../../firebase'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'

export function RenameModel() {
	const { user } = useUser()
	const [fileId, filename, isRenameModelOpen, setIsRenameModelOpen] =
		useAppStore((state) => [
			state.fileId,
			state.filename,
			state.isRenameModelOpen,
			state.setIsRenameModelOpen,
		])
	const [input, setInput] = useState<string>(filename!)

	useEffect(() => {
		setInput(isRenameModelOpen ? filename! : '')
	}, [isRenameModelOpen, filename])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setInput(e.target.value)
	const handleKeyDownCapture = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') renameFile()
	}
	const renameFile = async () => {
		if (!user || !fileId || !filename || !input) return

		try {
			await updateDoc(doc(db, 'users', user.id, 'files', fileId), {
				filename: input,
			})
		} catch (error) {
			console.log(error)
		} finally {
			setIsRenameModelOpen(false)
		}

		setInput('')
	}

	const handleOpenChange = (isOpen: boolean) => setIsRenameModelOpen(isOpen)

	return (
		<Dialog open={isRenameModelOpen} onOpenChange={handleOpenChange}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle> Are you sure you want to rename? </DialogTitle>
				</DialogHeader>

				<div className='grid flex-1 gap-2'>
					<Label htmlFor='filename' className='sr-only'>
						File Name
					</Label>
					<Input
						id='filename'
						value={input}
						onChange={handleChange}
						onKeyDownCapture={handleKeyDownCapture}
					/>
				</div>

				<DialogFooter className='flex space-x-2 py-3'>
					<Button
						size='sm'
						className='px-3 flex-1'
						variant='ghost'
						onClick={() => setIsRenameModelOpen(false)}>
						<span className='sr-only'> Cancel </span>
						<span> Cancel </span>
					</Button>

					<Button
						type='submit'
						size='sm'
						className='px-3 flex-1'
						onClick={renameFile}>
						<span className='sr-only'> Rename </span>
						<span> Rename </span>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
