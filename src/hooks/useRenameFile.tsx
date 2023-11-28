import { useAppStore } from '@/store/store'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useToast } from '@/components/ui/use-toast'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const useRenameFile = () => {
	const { user } = useUser()
	const [fileId, filename, isRenameModelOpen, setIsRenameModelOpen] =
		useAppStore((state) => [
			state.fileId,
			state.filename,
			state.isRenameModelOpen,
			state.setIsRenameModelOpen,
		])
	const [input, setInput] = useState<string>(filename!)
	const { toast } = useToast()

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
			}).then(() => {
				toast({
					title: 'Renamed file successfully!',
					className: 'bg-green-600',
				})
			})
		} catch (error) {
			console.log(error)
			toast({
				variant: 'destructive',
				title: 'Something Went Wrong!',
			})
		} finally {
			setInput('')
			setIsRenameModelOpen(false)
		}
	}

	const handleOpenChange = (isOpen: boolean) => setIsRenameModelOpen(isOpen)
	const handleClose = () => setIsRenameModelOpen(false)

	return {
		isRenameModelOpen,
		handleOpenChange,
		input,
		handleChange,
		handleKeyDownCapture,
		handleClose,
		renameFile,
	}
}

export default useRenameFile
