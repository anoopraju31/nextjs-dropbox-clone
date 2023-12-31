'use client'

import { useAppStore } from '@/store/store'
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { PencilIcon, TrashIcon } from 'lucide-react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Button } from '../ui/button'
import { DeleteModel } from '../DeleteModel'
import { RenameModel } from '../RenameModel'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})
	const [setFileId, setFilename, setIsDeleteModelOpen, setIsRenameModelOpen] =
		useAppStore((state) => [
			state.setFileId,
			state.setFilename,
			state.setIsDeleteModelOpen,
			state.setIsRenameModelOpen,
		])

	const openDeleteModel = (fieldId: string) => {
		setFileId(fieldId)
		setIsDeleteModelOpen(true)
	}

	const openRenameModel = (fieldId: string, filename: string) => {
		setFileId(fieldId)
		setFilename(filename)
		setIsRenameModelOpen(true)
	}

	return (
		<div className='rounded-md border'>
			<DeleteModel />
			<RenameModel />

			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
											  )}
									</TableHead>
								)
							})}
							<TableHead key='delete'> Delete </TableHead>
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{cell.column.id === 'timestamp' ? (
											<div className='flex flex-col'>
												<div className='text-sm'>
													{(cell.getValue() as Date).toLocaleDateString()}
												</div>

												<div className='text-sm text-gray-500'>
													{(cell.getValue() as Date).toLocaleTimeString()}
												</div>
											</div>
										) : cell.column.id === 'filename' ? (
											<Button
												variant='link'
												className='underline flex items-center text-blue-500 hover:cursor-pointer'
												onClick={() => {
													openRenameModel(
														(row.original as FileType).id,
														(row.original as FileType).filename,
													)
												}}>
												{cell.getValue() as string}{' '}
												<PencilIcon size={15} className='ml-2' />
											</Button>
										) : (
											flexRender(cell.column.columnDef.cell, cell.getContext())
										)}
									</TableCell>
								))}
								<TableCell key={(row.original as FileType).id}>
									<Button
										variant='destructive'
										onClick={() => {
											openDeleteModel((row.original as FileType).id)
										}}>
										<TrashIcon size={20} />
									</Button>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className='h-24 text-center'>
								You have no Files.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
