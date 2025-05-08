"use client"

import { useState } from 'react'
import Link from 'next/link';
import SignOutButton from '../ui/authButton/SignOutButton';
import ResizeModal from '../ui/ResizeModal';
import ResetTimer from './ResetTimer';
import Button from '../ui/Button';
import { FetchResult } from '@/types/fetchResult';
import FullSizeModal from '../ui/FullSizeModal';
import HowToPlayText from './HowToPlayText';

interface Maintenance {
  isMaintenance: boolean;
  nextResetStartAt: string | null;
} 

export default function Dropdown({ userId }: { userId: string | null }) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [resetTimerOpen, setResetTimerOpen] = useState<boolean>(false);
	const [resetTime, setResetTime] = useState<string | null>(null)
	const [howToPlayOpen, setHowToPlayOpen] = useState<boolean>(false);

	// Route Handlerを経由してメンテナンス情報を取得
	const fetchMaintenance = async () => { 
		const response = await fetch(`/api/maintenance`);
		const result: FetchResult<Maintenance> = await response.json();
		return result
	}

	const openMenu = ()  =>  {
		setIsOpen(true);
	}
	const closeMenu =  () => {
		setIsOpen(false);
	}

	// タイマーモーダルを開いた際，メンテナンス情報を取得し，nextResetStartAtが取得できたらその時間をセット
	const openTimer = async () => {
		const maintenanceResult = await fetchMaintenance()
		if(maintenanceResult.isOk) {
			const { isMaintenance, nextResetStartAt } = maintenanceResult.body.data
			setResetTime(isMaintenance ? null : nextResetStartAt)
		} else { 
			setResetTime(null)
		}
		closeMenu();
		setResetTimerOpen(true)
	}

	const openHowToPlay = () => {
		closeMenu();
		setHowToPlayOpen(true)
	}

	const transClass = isOpen ? "flex" : "hidden";

	return (
		<>
			<div className="relative">
				<button
					className="font-bold"
					onClick={openMenu}
				>
					メニュー ▽
				</button>
				<div className={`absolute top-10 right-0 z-30 w-[160px] flex flex-col py-8 gap-4 bg-gray-900 items-center rounded-lg border-2 border-white ${transClass}`}>
					{ userId ? (
						<>
							<Link href={`/profile/${userId}`} onClick={closeMenu} className=''>マイページ</Link>
							<button onClick={openTimer}>リセット残り時間</button>
							<button onClick={openHowToPlay}>遊び方</button>
							<Link href={'/'} onClick={closeMenu} className=''>タイトルへ</Link>
							<Link href={'#'} onClick={closeMenu} className=''>お問い合わせ</Link>
							<SignOutButton />
						</>
					) : (
						<>
							<Link href={'/login'} onClick={closeMenu} className=''>ログイン</Link>
							<button onClick={openHowToPlay}>遊び方</button>
							<Link href={'/'} onClick={closeMenu} className=''>タイトルへ</Link>
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
						{ resetTime ? (
								<ResetTimer	timestamp={new Date(resetTime).toISOString()}/>
							) : (
								<div className='flex flex-col items-center'>
									<p>-- : -- : --</p>
									<p className='text-sm text-gray-400 mt-6'>更新をお待ち下さい</p> 
								</div>
							)
						}
					</div>
					<div>
						<Button text={'閉じる'} buttonType='cancel' handleClick={() => setResetTimerOpen(false)}/>
					</div>
				</div>
			</ResizeModal>

			<FullSizeModal isOpen={howToPlayOpen}>
				<div className="absolute">
            <button 
							className="p-1 text-sm bg-gray-500 border-2 border-white rounded"
							onClick={() => setHowToPlayOpen(false)}
							>とじる
						</button>
				</div>
				<div className="flex justify-center items-center">
					<h1 className='text-2xl'>遊び方</h1>
				</div>
				<HowToPlayText />
			</FullSizeModal>

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
