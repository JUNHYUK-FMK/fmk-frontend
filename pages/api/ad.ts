// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Advertisement } from '../../types/advertisement';

const ad: Advertisement[] = [
  {
    id: 'AD_001',
    type: 'GROCERY',
    date: '2022-04-01',
    startTime: '12:00',
    endTime: '18:00',
    limit: 10,
  },
  {
    id: 'AD_002',
    type: 'GROCERY',
    date: '2022-04-01',
    startTime: '12:00',
    endTime: '12:30',
    limit: 10,
  },
  {
    id: 'AD_003',
    type: 'DELIVERY',
    date: '2022-04-01',
    startTime: '13:00',
    endTime: '18:00',
    limit: 10,
  },
  {
    id: 'AD_004',
    type: 'DELIVERY',
    date: '2022-04-01',
    startTime: '12:00',
    endTime: '18:00',
    limit: 10,
  },
  {
    id: 'AD_005',
    type: 'GROCERY',
    date: '2022-04-01',
    startTime: '12:00',
    endTime: '18:00',
    limit: 10,
  },
  {
    id: 'AD_006',
    type: 'GROCERY',
    date: '2022-04-01',
    startTime: '12:00',
    endTime: '18:00',
    limit: 10,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<Advertisement[]>) {
  res.status(200).json(ad);
}
