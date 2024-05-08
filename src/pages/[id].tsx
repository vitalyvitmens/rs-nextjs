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

import { GetServerSideProps } from 'next'
import { readFile } from 'fs/promises'
import path from 'path'

const XLSX = require('xlsx')

interface FilmProperties {
  characters: string[]
  planets: string[]
  starships: string[]
  vehicles: string[]
  species: string[]
}

interface FilmData {
  description: string
  properties: FilmProperties
  uid: string
  __v: number
  _id: string
  title: string
}

interface FilmApiData {
  properties: FilmData
}

type FilmsData = FilmData[]

interface ExcelDataRow {
  'Таблица недопустимых размеров': string
  __EMPTY?: string
}

type ExcelData = ExcelDataRow[]

interface HomeProps {
  film: FilmApiData
  data: FilmsData
  packageJsonData: string
  excelData: ExcelData
}

export default function Home({
  film,
  data,
  packageJsonData,
  excelData,
}: HomeProps) {
  console.log(film)
  console.log(data)
  console.log(packageJsonData)
  console.log(excelData)

  return <div>{film.properties.title}</div>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id
  const res2 = await fetch(`https://www.swapi.tech/api/films/${id}`)
  const data2 = await res2.json()

  const res = await fetch('https://www.swapi.tech/api/films')
  const data = await res.json()

  const packageJsonData = await readFile('package.json', 'utf-8')

  const filePath = path.resolve('./public', 'exelFile.xlsx')
  const workbook = XLSX.readFile(filePath)
  const sheetName = workbook.SheetNames[0]
  const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])

  if (data2.message === 'Film not found') {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      film: data2.result,
      data: data.result,
      packageJsonData,
      excelData,
    },
  }
}
