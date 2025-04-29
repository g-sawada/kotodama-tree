"use client"

import { useState } from 'react'
import Link from 'next/link';
import SignOutButton from '../ui/authButton/SignOutButton';
import ResizeModal from '../ui/ResizeModal';
import ResetTimer from './ResetTimer';
import Button from '../ui/Button';

export default function Dropdown({ userId }: { userId: string | null }) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [resetTimerOpen, setResetTimerOpen] = useState<boolean>(false);

	const openMenu = ()  =>  {
		setIsOpen(true);
	}
	const closeMenu =  () => {
		setIsOpen(false);
	}

	const openTimer = () => {
		closeMenu();
		setResetTimerOpen(true)
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
							<button onClick={openTimer}>リセット残り時間</button>
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

			<ResizeModal isOpen={resetTimerOpen}>
				<div className='flex flex-col items-center gap-6'>
					<p className='text-xl'>
						世界のリセットまで
					</p>
					<div className='text-4xl'>
						<ResetTimer	timestamp={new Date('2025-04-30 00:00:00').toISOString()}/>
					</div>
					<div>
						<Button text={'閉じる'} buttonType='cancel' handleClick={() => setResetTimerOpen(false)}/>
					</div>
				</div>
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
