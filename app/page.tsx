import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import {
  DONATE_IMAGE,
  NEXT_PUBLIC_URL,
  START_IMAGE,
  ZORA_COLLECTION_ADDRESS,
  ZORA_TOKEN_ID_1,
} from './config';
import { getCollection } from './lib/collection';

export async function generateMetadata(): Promise<Metadata> {
  const { name } = await getCollection();

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: 'Donte $1',
        action: 'mint',
        target: `eip155:8453:${ZORA_COLLECTION_ADDRESS}:${ZORA_TOKEN_ID_1}`,
      },
      {
        label: 'Donte $3',
        action: 'mint',
        target: `eip155:8453:${ZORA_COLLECTION_ADDRESS}:${ZORA_TOKEN_ID_1}`,
      },
      {
        label: 'Donte $5',
        action: 'mint',
        target: `eip155:8453:${ZORA_COLLECTION_ADDRESS}:${ZORA_TOKEN_ID_1}`,
      },
      {
        label: 'Share',
        action: 'link',
        target: `https://shareme.com`, // todo: udpate
      }
    ],
    image: `${DONATE_IMAGE}`,
    post_url: `${NEXT_PUBLIC_URL}/api/donate`,
  });

  return {
    metadataBase: new URL(NEXT_PUBLIC_URL as string),
    title: name,
    description: 'Donate to your favorite projects on Warpcaster',
    openGraph: {
      title: name,
      description: 'Donate to your favorite projects on Warpcaster',
      images: [`${DONATE_IMAGE}`],
    },
    other: {
      ...frameMetadata,
      'fc:frame:image:aspect_ratio': '1:1',
    },
  };
}

export default async function Page() {
  const { name, image, address, tokenId } = await getCollection();
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-center min-h-screen items-start font-body">
        <div className="w-full md:w-3/4 flex justify-center items-center">
          <img src={image} alt={name} className="w-full lg:max-w-[800px] md:max-w-[400px] h-auto" />
        </div>
        <div className="w-full md:w-1/4 flex flex-col items-center md:items-start space-y-4 mt-4 md:mt-0 md:pl-4">
          <h1 className="text-2xl font-bold">{name}</h1>
          <a href={`https://zora.co/collect/base:${address}/${tokenId}`} target="_blank">
            <button className="px-4 py-2 bg-violet-500 text-white hover:bg-violet-700 transition duration-300">
              Mint on Zora
            </button>
          </a>
          <div className="text-xs text-stone-400 hover:underline tracking-tighter text-center">
            <a href="https://github.com/codenamejason/base-mint-with-warps" target="_blank">
              See code on Github
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
