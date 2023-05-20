'use client';

import { User } from '@prisma/client';
import UserBox from './UserBox';

interface UserListProps {
	items: User[];
}

const UserList = ({ items }: UserListProps) => {
	return (
		<aside className="fixed inset-y-0 left-0 w-full pb-20 overflow-y-auto border-r lg:pb-0 lg:left-20 lg:w-80 lg:block border-gray-200block">
			<div className="px-5">
				<div className="flex-col">
					<div className="py-4 text-2xl font-bold text-neutral-800">
						People
					</div>
				</div>
				{items.map((item) => (
					<UserBox key={item.id} data={item} />
				))}
			</div>
		</aside>
	);
};

export default UserList;
