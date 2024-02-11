import { NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL, ZORA_COLLECTION_ADDRESS } from '../config';
import { getFrameHtml } from './getFrameHtml';

export function errorResponse() {
  return new NextResponse(
    getFrameHtml({
      image: `${NEXT_PUBLIC_URL}/api/images/error`,
    }),
  );
}

export async function mintResponse() {
  return new NextResponse(
    getFrameHtml({
      buttons: [
        {
          label: 'Share',
          target: `https://shareme.com`, // todo: udpate
        },
      ],
      image: `${NEXT_PUBLIC_URL}/api/images/donated`,
    }),
  );
}
