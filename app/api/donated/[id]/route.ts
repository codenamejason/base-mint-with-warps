import { FrameRequest, FrameValidationData, getFrameMessage } from '@coinbase/onchainkit';
import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL, START_IMAGE } from '../../../config';
import { getFrameHtml } from '../../../lib/getFrameHtml';

async function getResponse(req: NextRequest) {
  console.log('req.nextUrl', req.nextUrl);
  // // const searchParams = req.nextUrl.searchParams;
  // // const donationId = searchParams.get('id') ?? '?';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY,
  });
  const id = req.nextUrl.pathname.split('/')[3];

  console.log('is Valid from donated ->', { isValid, message, id });

  // const isActive = message?.raw.action.interactor.active_status === 'active';
  // let session = ((await kv.get(`session:${message?.interactor.fid}`)) ?? {}) as Session;

  return new NextResponse(
    getFrameHtml({
      buttons: [{ label: 'Share', action: 'link', target: 'https://google.com' }],
      image: `${START_IMAGE}`,
    }),
  );
}

export async function POST(req: NextRequest) {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
