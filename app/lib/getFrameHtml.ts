import { FrameMetadataType, getFrameHtmlResponse } from '@coinbase/onchainkit';

export function getFrameHtml(frameMetadata: FrameMetadataType) {
  const html = getFrameHtmlResponse(frameMetadata);

  const extraTags = [
    '<meta property="og:title" content="Farcaster: jaxcoder">',
    '<meta property="og:description" content="Farcaster QV Funding">',
    '<meta property="og:image" content="https://ipfs.io/ipfs/QmSdPavyZC5akuUAKr67vUVozASfRGU1vccTcJ2VRmhQFk">',
    '<meta property="fc:frame:image:aspect_ratio" content="1:1" />',
  ];
  // hack: remove close tags, add aspect ratio and required OG tags
  return `${html.slice(0, html.length - 14)}${extraTags.join('')}</head></html>`;
}
