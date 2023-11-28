'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, doc, orderBy, query } from 'firebase/firestore'
import { db } from '../../../firebase'
import { Button } from '../ui/button'
import { DataTable } from './Table'
import { columns } from './columns'

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

	if (docs?.docs.length === undefined)
		return (
			<div className=''>
				<p className=''> Loading... </p>
			</div>
		)

	return (
		<div>
			<Button onClick={handleSort}>
				Sort By {sort === 'desc' ? 'Newest' : 'Oldest'}
			</Button>

			<DataTable columns={columns} data={initialFiles} />
		</div>
	)
}

export default TableWrapper
