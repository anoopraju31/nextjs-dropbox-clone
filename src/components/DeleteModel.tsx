'use client'

import useDeleteFile from '@/hooks/useDeleteFile'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

export function DeleteModel() {
	const { isDeleteModelOpen, setIsDeleteModelOpen, deleteFile } =
		useDeleteFile()

	return (
		<Dialog
			open={isDeleteModelOpen}
			onOpenChange={(isOpen) => setIsDeleteModelOpen(isOpen)}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle> Are you sure you want to delete? </DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your
						file!
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className='flex space-x-2 py-3'>
					{/* Cancel Button */}
					<Button
						size='sm'
						className='px-3 flex-1'
						variant='ghost'
						onClick={() => setIsDeleteModelOpen(false)}>
						<span className='sr-only'> Cancel </span>
						<span> Cancel </span>
					</Button>

					{/* Delete Button */}
					<Button
						type='submit'
						variant='destructive'
						size='sm'
						className='px-3 flex-1'
						onClick={deleteFile}>
						<span className='sr-only'> Delete </span>
						<span> Delete </span>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
