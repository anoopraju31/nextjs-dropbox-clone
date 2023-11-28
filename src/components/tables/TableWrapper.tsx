'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, doc, orderBy, query } from 'firebase/firestore'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '../../../firebase'
import { Button } from '../ui/button'
import { DataTable } from './Table'
import { columns } from './columns'
import TableSkeleton from './TableSkeleton'

type Props = {
	skeletonFiles: FileType[]
}

const TableWrapper = (props: Props) => {
	const { skeletonFiles } = props
	const { user } = useUser()
	const [initialFiles, setInitialFiles] = useState<FileType[]>([])
	const [sort, setSort] = useState<'asc' | 'desc'>('desc')
	const [docs, loading, error] = useCollection(
		user &&
			query(
				collection(db, 'users', user.id, 'files'),
				orderBy('timestamp', sort),
			),
	)

	useEffect(() => {
		if (!docs) return //defensive programming

		const files: FileType[] = docs.docs.map((doc) => ({
			id: doc.id,
			filename: doc.data().filename || doc.id,
			fullName: doc.data().fullName,
			timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
			downloadUrl: doc.data().downloadUrl,
			size: doc.data().size,
			type: doc.data().type,
		}))

		setInitialFiles(files)
	}, [docs])

	const handleSort = () => setSort((prev) => (prev === 'asc' ? 'desc' : 'asc'))

	// Skeleton UI
	if (docs?.docs.length === undefined)
		return (
			<TableSkeleton
				initialFiles={initialFiles.length}
				skeletonFiles={skeletonFiles}
			/>
		)

	return (
		<div className='flex flex-col space-y-5 pb-10'>
			<Button variant='outline' className='ml-auto w-36' onClick={handleSort}>
				Sort By {sort === 'desc' ? 'Newest' : 'Oldest'}
			</Button>

			<DataTable columns={columns} data={initialFiles} />
		</div>
	)
}

export default TableWrapper
