import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import { API_URL } from '@/configs'
import { GetServerSideProps } from 'next';

const inter = Inter({ subsets: ['latin'] })

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

interface PropsHome {
  events: Event[]
}

export default function Home({ events }: PropsHome) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<{ events: Event[] }> = async () => {
  const res = await fetch(`${API_URL}/api/events`)
  const { data } = await res.json()

  return {
    props: {
      events: data.events
    }
  }
}
