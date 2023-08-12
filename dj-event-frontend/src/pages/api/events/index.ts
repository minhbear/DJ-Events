import type { NextApiRequest, NextApiResponse } from 'next'
import events from './data.json'

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'GET') {
    res.status(200).json({ data: events })
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allow` })
  }
}
