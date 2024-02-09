import { getFrameMetadata } from '@coinbase/onchainkit';
import { Metadata } from 'next';
import { CARD_DIMENSIONS, DONATE_IMAGE, NEXT_PUBLIC_URL } from '../../../config';
import { getCollection } from '../../../lib/collection';
import { ImageResponse } from 'next/og';
import { Card } from '../../../components/Card';

export async function generateMetadata(): Promise<Metadata> {
  const { name } = await getCollection();

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: 'Donte $1',
      },
      {
        label: 'Donte $5',
      },
      {
        label: 'Donte $10',
      },
    ],
    image: `${DONATE_IMAGE}`,
    post_url: `${NEXT_PUBLIC_URL}/api/donate`,
  });

  return {
    title: name,
    description: 'Donate to support this project',
    openGraph: {
      title: name,
      description: 'Donate to support this project',
      images: [`${DONATE_IMAGE}`],
    },
    other: {
      ...frameMetadata,
      'fc:frame:image:aspect_ratio': '1:1',
    },
  };
}

export async function GET() {
  return new ImageResponse(
    <Card message="Your transaction is in the queue." />,
    CARD_DIMENSIONS,
  );
}
