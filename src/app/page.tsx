import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
	return (
		<main>
			<div className=''>
				<div className='p-10 flex flex-col bg-[#2b2929] dark:bg-slate-800 text-white space-y-5'>
					<h1 className='text-5xl font-bold'>
						Welcome to Dropbox.
						<br />
						<br />
						Storing everything for you and your business needs. All in one
						place.
					</h1>

					<p className='pb-20'>
						Enhance your personal storage with Dropbox, offering a simple and
						efficient way to upload, organize, and access files from anywhere.
						Securely store important documents and media, and experience the
						convenience of easy file management and sharing in one centralized
						solution.
					</p>

					<Link
						href='/dashboard'
						className='flex cursor-pointer bg-blue-500 p-5 w-fit'>
						<span> Try it for free! </span>
						<ArrowRight className='ml-10' />
					</Link>
				</div>
			</div>
		</main>
	)
}
