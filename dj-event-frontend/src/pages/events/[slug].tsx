import { useRouter } from "next/router"
import Layout from "@/components/Layout"

function EventPage() {
  const router = useRouter()

  return (
    <Layout>
      <h1>
        my event
      </h1>
      <h3>{router.query.slug}</h3>
    </Layout>
  )
}

export default EventPage