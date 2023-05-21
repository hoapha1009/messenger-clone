'use client';

import { User } from '@prisma/client';
import Image from 'next/image';
import useActiveList from '../hooks/useActiveList';

interface AvatarProps {
	user?: User;
}

const Avatar = ({ user }: AvatarProps) => {
	const { members } = useActiveList();
	const isActive = members.indexOf(user?.email!) !== -1;

	return (
		<div className="relative">
			<div className="relative inline-block overflow-hidden rounded-full h-9 w-9 md:w-11 md:h-11">
				<Image
					alt="Avatar"
					src={user?.image || '/images/placeholder.jpg'}
					fill
				/>
			</div>
			{isActive && (
				<span className="absolute top-0 right-0 block h-2 bg-green-500 rounded-full ring-2 ring-white w2 md:w-3 md:h-3 "></span>
			)}
		</div>
	);
};

export default Avatar;
