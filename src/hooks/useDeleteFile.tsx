import { useAppStore } from '@/store/store'
import { useUser } from '@clerk/nextjs'
import { useToast } from '@/components/ui/use-toast'
import { deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { db, storage } from '../../firebase'

const useDeleteFile = () => {
	const { user } = useUser()
	const [fileId, isDeleteModelOpen, setIsDeleteModelOpen] = useAppStore(
		(state) => [
			state.fileId,
			state.isDeleteModelOpen,
			state.setIsDeleteModelOpen,
		],
	)
	const { toast } = useToast()

	async function deleteFile() {
		if (!user || !fileId) return

		const fileRef = ref(storage, `users/${user.id}/files/${fileId}`)

		await deleteObject(fileRef)
			.then(async () => {
				deleteDoc(doc(db, 'users', user.id, 'files', fileId)).catch((error) => {
					console.log(error)

					toast({
						variant: 'destructive',
						title: 'Something Went Wrong!',
					})
				})
			})
			.then(() => {
				toast({
					title: 'Deleted file successfully!',
					className: 'bg-green-500',
				})
			})
			.catch((error) => {
				console.log(error)

				toast({
					variant: 'destructive',
					title: 'Something Went Wrong!',
				})
			})
			.finally(() => setIsDeleteModelOpen(false))
	}

	return {
		isDeleteModelOpen,
		setIsDeleteModelOpen,
		deleteFile,
	}
}

export default useDeleteFile
