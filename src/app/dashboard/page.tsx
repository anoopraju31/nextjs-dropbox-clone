import Dropzone from '@/components/Dropzone'
import { auth } from '@clerk/nextjs'

const DashboardPage = () => {
	const { userId } = auth()

	return (
		<div>
			<Dropzone />
		</div>
	)
}

export default DashboardPage
