'use client'

import useFiles from '@/hooks/useFiles'
import { Button } from '../ui/button'
import { DataTable } from './Table'
import { columns } from './columns'
import TableSkeleton from './TableSkeleton'

type Props = {
	skeletonFiles: FileType[]
}

const TableWrapper = (props: Props) => {
	const { skeletonFiles } = props
	const { initialFiles, sort, handleSort, docs } = useFiles()

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
