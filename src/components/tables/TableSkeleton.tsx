import React from 'react'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

type Props = {
	skeletonFiles: FileType[]
	initialFiles: number
}

const TableSkeleton = (props: Props) => {
	const { skeletonFiles, initialFiles } = props
	return (
		<div className='flex flex-col'>
			<Button variant='outline' className='ml-auto w-36 h-10 mb-5'>
				<Skeleton className='w-full h-5' />
			</Button>

			<div className='border rounded-lg'>
				<div className='border-b h-12' />

				{/* Files exists */}
				{skeletonFiles.map((file) => (
					<div key={file.id} className='flex items-center space-x-4 p-5 w-full'>
						<Skeleton className='w-12 h-12' />
						<Skeleton className='w-full h-12' />
					</div>
				))}

				{/* No Files */}
				{initialFiles === 0 && (
					<div className='flex items-center space-x-4 p-5 w-full'>
						<Skeleton className='w-12 h-12' />
						<Skeleton className='w-full h-12' />
					</div>
				)}
			</div>
		</div>
	)
}
export default TableSkeleton
