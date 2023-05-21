import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

interface IParams {
	conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const { conversationId } = params;
	} catch (error: any) {
		console.log(error, 'ERROR_MESSAAGES_SEEN');
		return new NextResponse('Internal Server Error', {
			status: 500,
		});
	}
}
