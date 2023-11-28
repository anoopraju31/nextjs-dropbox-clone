import Dropzone from '@/components/Dropzone'
import { auth } from '@clerk/nextjs'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase'

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

	console.log(skeletonFiles)

	return (
		<main>
			<Dropzone />
		</main>
	)
}

export default DashboardPage
