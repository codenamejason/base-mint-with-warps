import { ImageResponse } from 'next/og';
import { Card } from '../../../components/Card';
import { CARD_DIMENSIONS } from '../../../config';

export async function POST() {
  return new ImageResponse(
    <Card message="Donate to this project with crypto or with Warps." />,
    CARD_DIMENSIONS,
  );
}
