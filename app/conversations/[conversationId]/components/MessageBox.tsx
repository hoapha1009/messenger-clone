import Avatar from '@/app/components/Avatar';
import { FullMessageType } from '@/app/types';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import ImageModal from './ImageModal';

interface MessageBoxProps {
	isLast: boolean;
	data: FullMessageType;
}

const MessageBox = ({ isLast, data }: MessageBoxProps) => {
	const session = useSession();
	const [imageModalOpen, setImageModalOpen] = useState(false);

	const isOwn = useMemo(
		() => session?.data?.user?.email === data?.sender?.email,
		[session?.data?.user?.email, data?.sender?.email]
	);

	const seenList = useMemo(() => {
		return (data?.seen || [])
			.filter((user) => user.email !== data?.sender?.email)
			.map((user) => user.name)
			.join(', ');
	}, [data?.seen, data?.sender?.email]);

	const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');

	const avatar = clsx(isOwn && 'order-2');

	const body = clsx('flex flex-col gap-2', isOwn && 'items-end');

	const message = clsx(
		'text-sm w-fit overflow-hidden',
		isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
		data.image ? 'rounded-md bg-neutral-800 p-0' : 'rounded-full py-2 px-3'
	);

	return (
		<div className={container}>
			<div className={avatar}>
				<Avatar user={data.sender} />
			</div>
			<div className={body}>
				<div className="flex items-center gap-1">
					<div className="text-sm text-gray-500">
						{data.sender.name}
					</div>
					<div className="text-xs text-gray-400">
						{format(new Date(data.createdAt), 'p')}
					</div>
				</div>

				<div className={message}>
					<ImageModal
						src={data.image}
						isOpen={imageModalOpen}
						onClose={() => setImageModalOpen(false)}
					/>
					{data.image ? (
						<Image
							onClick={() => setImageModalOpen(true)}
							alt={`${data.sender.name}-image`}
							src={data.image}
							height={288}
							width={288}
							className="object-contain transition-all cursor-pointer hover:brightness-90"
						/>
					) : (
						<div className="">{data.body}</div>
					)}
				</div>

				{isLast && isOwn && seenList.length > 0 && (
					<div className="text-xs font-light text-gray-500">
						{`Seen by ${seenList}`}
					</div>
				)}
			</div>
		</div>
	);
};

export default MessageBox;
