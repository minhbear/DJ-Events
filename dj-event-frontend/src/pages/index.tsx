import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/configs'
import { GetStaticProps } from 'next'
import type { Event } from '@/models/Event'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

interface PropsHome {
  events: Event[]
}

export default function Home({ events }: PropsHome) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>

      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events" className="btn-secondary">
          View All Events
        </Link>
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<{ events: Event[] }> = async () => {
  const res = await fetch(`${API_URL}/api/events`)
  const { data } = await res.json()

  return {
    props: {
      events: data.events
    },
    revalidate: 1
  }
}
