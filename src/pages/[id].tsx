//! 9. Suspense, серверные компоненты. Не забудь обернуть всё приложение в Suspense и добавить fallback="Loading..." в src\pages\_app.tsx
//! Когда Вам важно SEO
import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

interface FilmData {
  result?: {
    properties: {
      title: string
    }
  }
  message?: string
}

export default function Home({ film }: { film: FilmData }) {
  const { query, isReady } = useRouter()

  const { data, error } = useQuery({
    enabled: isReady,
    queryFn: () =>
      fetch(`https://www.swapi.tech/api/films/${query.id}`).then((res) =>
        res.json()
      ),
    queryKey: ['films', query.id],
    initialData: film,
    // suspense: true,   
  })

  console.log(data)

  if (error) return <div>Error</div>

  return <div>{data.result.properties.title}</div>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id
  const res = await fetch(`https://www.swapi.tech/api/films/${id}`)
  const data = await res.json()

  if (data.message === 'Film not found') {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      film: data,
    },
  }
}

//! 8. Как было до Suspense. Клиентская сторона. React Query
//! Когда Вам важно SEO
// import { useQuery } from '@tanstack/react-query'
// import { GetServerSideProps } from 'next'
// import { useRouter } from 'next/router'

// interface FilmData {
//   result?: {
//     properties: {
//       title: string
//     }
//   }
//   message?: string
// }

// export default function Home({ film }: { film: FilmData }) {
//   const { query, isReady } = useRouter()

//   const { data, isLoading, error } = useQuery({
//     enabled: isReady,
//     queryFn: () =>
//       fetch(`https://www.swapi.tech/api/films/${query.id}`).then((res) =>
//         res.json()
//       ),
//     queryKey: ['films', query.id],
//     initialData: film,
//   })

//   console.log(data)

//   if (isLoading) return <div>Loading...</div>
//   if (error) return <div>Error</div>
//   if (!data || !data.result) return <div>No data found</div>

//   return <div>{data.result.properties.title}</div>
// }

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const id = ctx.params?.id
//   const res = await fetch(`https://www.swapi.tech/api/films/${id}`)
//   const data = await res.json()

//   if (data.message === 'Film not found') {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: {
//       film: data,
//     },
//   }
// }

//! 7. Клиентская сторона. React Query: npm install @tanstack/react-query
//! Не забудь обернуть все приложение в контекст QueryClientProvider и создать const client = new QueryClient(), например в src\pages\_app.tsx
// import { useQuery } from '@tanstack/react-query'
// import { useRouter } from 'next/router'

// export default function Home() {
//   const { query, isReady } = useRouter()

//   const { data, isLoading, error } = useQuery({
//     enabled: isReady,
//     queryFn: () =>
//       fetch(`https://www.swapi.tech/api/films/${query.id}`).then((res) =>
//         res.json()
//       ),
//     queryKey: ['films', query.id],
//   })

//   console.log(data)

//   if (isLoading) return <div>Loading...</div>
//   if (error) return <div>Error</div>
//   if (!data || !data.result) return <div>No data found</div>

//   return <div>{data.result.properties.title}</div>
// }

// //! 6. Клиентская сторона. fetch() Так не стоит действовать лучше использовать библиотеки, например такие как react-query
// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'

// interface FilmData {
//   result?: {
//     properties: {
//       title: string
//     }
//   }
//   message?: string
// }

// export default function Home() {
//   const router = useRouter()
//   const { query, isReady } = useRouter()
//   const [data, setData] = useState<FilmData>({})

//   useEffect(() => {
//     if (!isReady) return
//     const getData = async () => {
//       const res = await fetch(`https://www.swapi.tech/api/films/${query.id}`)
//       const data = await res.json()
//       setData(data)
//     }

//     getData()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isReady])

//   console.log(data)

//   if (data.message === 'Film not found') {
//     router.replace('/404')
//     return null
//   }

//   return <div>{data?.result?.properties.title}</div>
// }

//! 5. GetStaticProps()
// import { GetStaticPaths, GetStaticProps } from 'next'

// interface Film {
//   properties: {
//     title: string
//   }
// }

// export default function Home({ film }: { film: Film }) {
//   console.log(film)

//   return <div>{film.properties.title}</div>
// }

// export const getStaticPaths: GetStaticPaths = async (ctx) => {
//   const res = await fetch(`https://www.swapi.tech/api/films`)
//   const data = await res.json()

//   return {
//     paths: data.result.map((film: { uid: string }) => ({
//       params: { id: film.uid },
//     })),
//     fallback: false,
//   }
// }

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const id = ctx.params?.id
//   const res = await fetch(`https://www.swapi.tech/api/films/${id}`)
//   const data = await res.json()

//   console.log(data)

//   if (data.message === 'Film not found') {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: {
//       film: data.result,
//     },
//   }
// }

//! 4. GetServerSideProps(). Ошибки и редиректы
// import { GetServerSideProps } from 'next'

// export default function Home({ film }) {
//   console.log(film)

//   return <div>{film.properties.title}</div>
// }

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const id = ctx.query.id
//   const res = await fetch(`https://www.swapi.tech/api/films/${id}`)
//   const data = await res.json()

//   console.log(data)

//   if (data.message === 'Film not found') {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: {
//       film: data.result,
//     },
//   }
// }

//! 3. GetServerSideProps(). Преимущества
// import { GetServerSideProps } from 'next'
// import { readFile } from 'fs/promises'
// import path from 'path'

// const XLSX = require('xlsx')

// interface FilmProperties {
//   characters: string[]
//   planets: string[]
//   starships: string[]
//   vehicles: string[]
//   species: string[]
// }

// interface FilmData {
//   description: string
//   properties: FilmProperties
//   uid: string
//   __v: number
//   _id: string
//   title: string
// }

// interface FilmApiData {
//   properties: FilmData
// }

// type FilmsData = FilmData[]

// interface ExcelDataRow {
//   'Таблица недопустимых размеров': string
//   __EMPTY?: string
// }

// type ExcelData = ExcelDataRow[]

// interface HomeProps {
//   film: FilmApiData
//   data: FilmsData
//   packageJsonData: string
//   excelData: ExcelData
// }

// export default function Home({
//   film,
//   data,
//   packageJsonData,
//   excelData,
// }: HomeProps) {
//   console.log(film)
//   console.log(data)
//   console.log(packageJsonData)
//   console.log(excelData)

//   return <div>{film.properties.title}</div>
// }

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const id = ctx.query.id
//   const res2 = await fetch(`https://www.swapi.tech/api/films/${id}`)
//   const data2 = await res2.json()

//   const res = await fetch('https://www.swapi.tech/api/films')
//   const data = await res.json()

//   const packageJsonData = await readFile('package.json', 'utf-8')

//   const filePath = path.resolve('./public', 'exelFile.xlsx')
//   const workbook = XLSX.readFile(filePath)
//   const sheetName = workbook.SheetNames[0]
//   const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])

//   if (data2.message === 'Film not found') {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: {
//       film: data2.result,
//       data: data.result,
//       packageJsonData,
//       excelData,
//     },
//   }
// }
