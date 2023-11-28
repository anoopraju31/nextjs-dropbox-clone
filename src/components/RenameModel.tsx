'use client'

import useRenameFile from '@/hooks/useRenameFile'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'

export function RenameModel() {
	const {
		isRenameModelOpen,
		handleOpenChange,
		input,
		handleChange,
		handleKeyDownCapture,
		handleClose,
		renameFile,
	} = useRenameFile()

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
						onClick={handleClose}>
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
