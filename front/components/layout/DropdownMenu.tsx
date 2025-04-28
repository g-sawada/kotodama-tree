"use client"

import { useState } from 'react'
import Link from 'next/link';

export default function Dropdown() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggle = () => {
		setIsOpen(old => !old);
	}
	const transClass = isOpen ? "flex" : "hidden";

	return (
		<>
			<div className="relative">
				<button
					className="hover:text-blue-400"
					onClick={toggle}
				>
					Menu
				</button>
				<div className={`absolute top-10 right-1 z-30 w-[160px] flex flex-col p-4 gap-4 bg-zinc-400 rounded-md ${transClass}`}>
					<Link href={'/'} onClick={toggle}>トップページ</Link>
					<Link href={'/login'} onClick={toggle}>ログイン</Link>
						{/* {
								menuItems.map(item =>
										<Link
												key={item.route}
												className="hover:bg-zinc-300 hover:text-zinc-500 px-4 py-1"
												href={item?.route || ''}
												onClick={toggle}
										>{item.title}</Link>
								)
						} */}
				</div>
			</div>
			{/* メニュー外をクリックして閉じるための透過スクリーン */}
			{ isOpen ?
				<div
					className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black/40"
					onClick={toggle}
				></div>
				:
				<></>
			}
		</>
	)
}
