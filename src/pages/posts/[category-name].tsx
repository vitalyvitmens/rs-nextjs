import { useRouter } from 'next/router'

export default function HelloPage() {
  const router = useRouter()
  console.log(router.query, router.isReady) // router.query

  return <div>{router.query['category-name']}</div>
}

export const getServerSideProps = () => {
  return {
    props: {},
  }
}
