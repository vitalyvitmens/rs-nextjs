import { useRouter } from "next/router"

export default function HelloPage() {
  const router = useRouter()

  console.log(router.query, router.isReady) // router.query
  return <div>POST</div>
}
