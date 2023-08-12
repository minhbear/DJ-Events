import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/configs'
import { GetStaticProps } from 'next'
import type { Event } from '@/models/Event'

const inter = Inter({ subsets: ['latin'] })

interface PropsHome {
  events: Event[]
}

export default function EventPage({ events }: PropsHome) {
  return (
    <Layout>
      <h1>Events</h1>

      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<{ events: Event[] }> = async () => {
  const res = await fetch(`${API_URL}/api/events`)
  const { data } = await res.json()

  return {
    props: {
      events: data.events.slice(0, 3)
    },
    revalidate: 1
  }
}
