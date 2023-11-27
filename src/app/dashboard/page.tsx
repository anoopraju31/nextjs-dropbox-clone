import Dropzone from '@/components/Dropzone'
import { auth } from '@clerk/nextjs'

const DashboardPage = () => {
	const { userId } = auth()

	return (
		<main>
			<Dropzone />
		</main>
	)
}

export default DashboardPage
