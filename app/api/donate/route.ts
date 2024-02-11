import { FrameRequest, FrameValidationData, getFrameMessage } from '@coinbase/onchainkit';
import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL, START_IMAGE } from '../../config';
import { getAddressButtons } from '../../lib/addresses';
import signMintData from '../../lib/signMint';
import { allowedOrigin } from '../../lib/origin';
import { getFrameHtml } from '../../lib/getFrameHtml';
import { errorResponse, mintResponse } from '../../lib/responses';
import { Session } from '../../lib/types';

function validButton(message?: FrameValidationData) {
  return message?.button && message?.button > 0 && message?.button < 5;
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: process.env.NEYNAR_API_KEY,
  });

  console.log('is Valid', isValid, message);

  // const isActive = message?.raw.action.interactor.active_status === 'active';
  // let session = ((await kv.get(`session:${message?.interactor.fid}`)) ?? {}) as Session;

  if (isValid) {
    //  && allowedOrigin(message)
    // Donate 1$
    if (message.button === 1) {
      return new NextResponse(
        getFrameHtml({
          buttons: [
            {
              label: 'Donate 1$ 💵',
            },
          ],
          image: `${START_IMAGE}`,
          post_url: `${NEXT_PUBLIC_URL}/api/donated/1`,
        }),
      );
      // Donate 3$
    } else if (message.button === 2) {
      return new NextResponse(
        getFrameHtml({
          buttons: [
            {
              label: 'Donate 3$ 💵',
            },
          ],
          image: `${START_IMAGE}`,
          post_url: `${NEXT_PUBLIC_URL}/api/donated/3`,
        }),
      );
      // Donate 5$
    } else if (message.button === 3) {
      return new NextResponse(
        getFrameHtml({
          buttons: [
            {
              label: 'Donate 5$ 💵',
            },
          ],
          image: `${START_IMAGE}`,
          post_url: `${NEXT_PUBLIC_URL}/api/donated/5`,
        }),
      );
    } else if (message.button === 4) {
      return new NextResponse(
        getFrameHtml({
          buttons: [
            {
              label: 'Share',
            },
          ],
          image: `${START_IMAGE}/api/images/share`,
          post_url: `${NEXT_PUBLIC_URL}/api/share`,
        }),
      );
    } else {
      // if (isActive && session?.address) {
      //   const { address } = session;
      //   const sig = await signMintData({
      //     to: address,
      //     tokenId: 1,
      //     fid: message.interactor.fid,
      //   });
      //   const res = await fetch('https://frame.syndicate.io/api/mint', {
      //     method: 'POST',
      //     headers: {
      //       'content-type': 'application/json',
      //       Authorization: `Bearer ${process.env.SYNDICATE_API_KEY}`,
      //     },
      //     body: JSON.stringify({
      //       frameTrustedData: body.trustedData.messageBytes,
      //       args: [address, 1, message.interactor.fid, sig],
      //     }),
      //   });
      //   if (res.status === 200) {
      //     const {
      //       success,
      //       data: { transactionId },
      //     } = await res.json();
      //     if (success) {
      //       session = { ...session, transactionId };
      //       await kv.set(`session:${message.interactor.fid}`, session);
      //       const res = await fetch(
      //         `https://frame.syndicate.io/api/transaction/${transactionId}/hash`,
      //         {
      //           headers: {
      //             'content-type': 'application/json',
      //             Authorization: `Bearer ${process.env.SYNDICATE_API_KEY}`,
      //           },
      //         },
      //       );
      //       if (res.status === 200) {
      //         return new NextResponse(
      //           getFrameHtml({
      //             buttons: [
      //               {
      //                 label: '🔄 Check status',
      //               },
      //             ],
      //             post_url: `${NEXT_PUBLIC_URL}/api/check`,
      //             image: `${NEXT_PUBLIC_URL}/api/images/check`,
      //           }),
      //         );
      //       }
      //     }
      //   }
      //   return errorResponse();
      // } else {
      //   return mintResponse();
      // }

      return new NextResponse(
        getFrameHtml({
          buttons: [{ label: 'Nope' }],
          image: `${NEXT_PUBLIC_URL}/api/images/error`,
          post_url: `${NEXT_PUBLIC_URL}/api/donation`,
        }),
      );
    }
  } else return new NextResponse('Unauthorized', { status: 401 });
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
