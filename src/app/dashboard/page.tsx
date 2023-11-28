import Dropzone from '@/components/Dropzone'
import { auth } from '@clerk/nextjs'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase'
import TableWrapper from '@/components/tables/TableWrapper'

const DashboardPage = async () => {
	const { userId } = auth()
	const docResults = await getDocs(collection(db, 'users', userId!, 'files'))
	const skeletonFiles: FileType[] = docResults.docs.map((doc) => ({
		id: doc.id,
		filename: doc.data().filename || doc.id,
		fullName: doc.data().fullName,
		timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
		downloadUrl: doc.data().downloadUrl,
		size: doc.data().size,
		type: doc.data().type,
	}))

	return (
		<main className='border-t'>
			<Dropzone />

			<section className='container space-y-5'>
				<h2 className='font-bold'> All Files </h2>

				<div className=''>
					{/* TableWrapper */}
					<TableWrapper skeletonFiles={skeletonFiles} />
				</div>
			</section>
		</main>
	)
}

export default DashboardPage
