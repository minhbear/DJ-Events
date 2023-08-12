import type { NextApiRequest, NextApiResponse } from "next";
import events from "./data.json";

type Event = {
  id: string;
  name: string;
  slug: string;
  venue: string;
  address: string;
  performers: string;
  date: string;
  time: string;
  description: string;
  image: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const evt = events.events.filter(e => e.slug === req.query.slug)

  if (req.method === 'GET') {
    res.status(200).json({ data: evt });
  }else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({message: `Method ${req.method} is not allow`})
  }
}
