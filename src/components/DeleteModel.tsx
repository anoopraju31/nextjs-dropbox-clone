'use client'

import { useUser } from '@clerk/nextjs'
import { useAppStore } from '@/store/store'
import { deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { db, storage } from '../../firebase'
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
	const { user } = useUser()
	const [fileId, isDeleteModelOpen, setIsDeleteModelOpen] = useAppStore(
		(state) => [
			state.fileId,
			state.isDeleteModelOpen,
			state.setIsDeleteModelOpen,
		],
	)

	async function deleteFile() {
		if (!user || !fileId) return

		const fileRef = ref(storage, `users/${user.id}/files/${fileId}`)

		try {
			await deleteObject(fileRef).then(async () => {
				deleteDoc(doc(db, 'users', user.id, 'files', fileId)).then(() => {
					console.log('File Deleted!')
				})
			})
		} catch (error) {
			console.log(error)
		} finally {
			setIsDeleteModelOpen(false)
		}
	}

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
