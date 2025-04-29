"use client"

import { useState } from 'react'
import Link from 'next/link';
import SignOutButton from '../ui/authButton/SignOutButton';
import ResizeModal from '../ui/ResizeModal';
import ResetTimer from './ResetTimer';

export default function Dropdown({ userId }: { userId: string | null }) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openMenu = ()  =>  {
		setIsOpen(true);
	}
	const closeMenu =  () => {
		setIsOpen(false);
	}

	const transClass = isOpen ? "flex" : "hidden";

	return (
		<>
			<div className="relative">
				<button
					className="hover:text-blue-400"
					onClick={openMenu}
				>
					メニュー ▽
				</button>
				<div className={`absolute top-10 right-0 z-30 w-[160px] flex flex-col py-8 gap-4 bg-gray-900 items-center rounded-lg border-2 border-white ${transClass}`}>
					{ userId ? (
						<>
							<Link href={`/profile/${userId}`} onClick={closeMenu} className=''>マイページ</Link>
							<Link href={'#'} onClick={closeMenu} className=''>遊び方</Link>
							<Link href={'/'} onClick={closeMenu} className=''>タイトルへ</Link>
							<Link href={'#'} onClick={closeMenu} className=''>お問い合わせ</Link>
							<SignOutButton />
						</>
					) : (
						<>
							<Link href={'#'} onClick={closeMenu} className=''>遊び方</Link>
							<Link href={'/login'} onClick={closeMenu} className=''>ログイン</Link>
							<Link href={'#'} onClick={closeMenu} className=''>お問い合わせ</Link>
						</>
					)}
				</div>
			</div>

			<ResizeModal isOpen={true}>
				<p className='flex justify-center text-xl'>
					世界のリセットまで
				</p>
				<p className='text-4xl'>
					<ResetTimer	timestamp={new Date('2025-04-30 00:00:00').toISOString()}/>
				</p>
			</ResizeModal>

			{/* メニュー外をクリックして閉じるための透過スクリーン */}
			{ isOpen ?
				<div
					className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black/40"
					onClick={closeMenu}
				></div>
				:
				<></>
			}
		</>
	)
}
