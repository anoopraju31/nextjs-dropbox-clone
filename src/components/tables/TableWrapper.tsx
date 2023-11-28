import { Button } from '../ui/button'
import { DataTable } from './Tables'
import { columns } from './columns'

type Props = {
	skeletonFiles: FileType[]
}

const TableWrapper = (props: Props) => {
	const { skeletonFiles } = props
	return (
		<div>
			<Button> Sort By </Button>

			<DataTable columns={columns} data={skeletonFiles} />
		</div>
	)
}

export default TableWrapper
