'use client'

import { useAppStore } from '@/store/store'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

export function DeleteModel() {
	const [fileId, isDeleteModelOpen, setIsDeleteModelOpen] = useAppStore(
		(state) => [
			state.fileId,
			state.isDeleteModelOpen,
			state.setIsDeleteModelOpen,
		],
	)

	async function deleteFile() {}

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

				<div className='flex space-x-2 py-3'>
					<Button
						size='sm'
						className='px-3 flex-1'
						variant='ghost'
						onClick={() => setIsDeleteModelOpen(false)}>
						<span className='sr-only'> Cancel </span>
						<span> Cancel </span>
					</Button>

					<Button
						type='submit'
						size='sm'
						className='px-3 flex-1'
						onClick={() => {}}>
						<span className='sr-only'> Delete </span>
						<span> Delete </span>
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
