import Link from "next/link"
import Image from "next/image"
import styles from '@/styles/EventItem.module.css'
import type { Event } from "@/models/Event"

interface PropsEventItem {
  evt: Event
}

export default function EventItem({ evt }: PropsEventItem) {
  const DEFAULT_IMAGE = '/images/event-default.png'

  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={evt.image ?? DEFAULT_IMAGE}
          width={170}
          height={100}
          alt={'Image of event'}
        />
      </div>

      <div className={styles.info}>
        <span>
          {evt.date} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`} className='btn'>
            Details
        </Link>
      </div>
    </div>
  )
}
