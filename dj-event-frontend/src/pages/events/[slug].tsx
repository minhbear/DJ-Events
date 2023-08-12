import Layout from '@/components/Layout'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { GetStaticPaths, GetStaticProps } from 'next'
import type { Event } from '@/models/Event'
import { API_URL } from '@/configs'
import { ParsedUrlQuery } from 'querystring'
import styles from '@/styles/Event.module.css'
import Link from 'next/link'

interface PropsEventPage {
  event: Event
}

export default function EventPage({ event }: PropsEventPage) {
  const deleteEvent = () => {
    console.log('delete')
  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {event.date} at {event.time}
        </span>
        <h1>{event.name}</h1>
        {event.image && (
          <div className={styles.image}>
            <Image src={event.image} width={960} height={600} alt="Image of Event" />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <Link href="/events" className={styles.back}>
          {'<'} Go Back
        </Link>
      </div>
    </Layout>
  )
}

interface ParsedUrlQueryWithSlug extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${API_URL}/api/events`)
  const events = (await res.json()).data.events as Event[]

  const paths = events.map((evt) => ({
    params: {
      slug: evt.slug
    } as ParsedUrlQueryWithSlug
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<{ event: Event }> = async ({ params }) => {
  const slug = (params as ParsedUrlQueryWithSlug).slug

  const res = await fetch(`${API_URL}/api/events/${slug}`)
  const events = (await res.json()).data

  return {
    props: {
      event: events[0] as Event
    }
  }
}
