'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
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

	const handleSort = () => setSort((prev) => (prev === 'asc' ? 'desc' : 'asc'))

	return (
		<div>
			<Button onClick={handleSort}>
				Sort By {sort === 'desc' ? 'Newest' : 'Oldest'}
			</Button>

			<DataTable columns={columns} data={skeletonFiles} />
		</div>
	)
}

export default TableWrapper
