import { create } from 'zustand'

interface AppState {
	isDeleteModelOpen: boolean
	setIsDeleteModelOpen: (open: boolean) => void

	isRenameModelOpen: boolean
	setIsRenameModelOpen: (open: boolean) => void

	fileId: string | null
	setFileId: (fileId: string) => void

	filename: string | null
	setFilename: (filename: string) => void
}

export const useAppStore = create<AppState>()((set) => ({
	fileId: null,
	setFileId: (fileId: string) => set((state) => ({ fileId })),

	filename: '',
	setFilename: (filename: string) => set((state) => ({ filename })),

	isRenameModelOpen: false,
	setIsRenameModelOpen: (open: boolean) =>
		set((state) => ({ isRenameModelOpen: open })),

	isDeleteModelOpen: false,
	setIsDeleteModelOpen: (open: boolean) =>
		set((state) => ({ isDeleteModelOpen: open })),
}))
