import { GetServerSideProps } from 'next'
import { readFile } from 'fs/promises'
import path from 'path'
import { useState } from 'react'

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
}

type FilmsData = FilmData[]

interface ExcelDataRow {
  'Таблица недопустимых размеров': string
  __EMPTY?: string
}

type ExcelData = ExcelDataRow[]

interface HomeProps {
  data: FilmsData
  packageJsonData: string
  excelData: ExcelData
}

export default function Home({
  data,
  packageJsonData,
  excelData: initialExcelData,
}: HomeProps) {
  const [excelData, setExcelData] = useState(initialExcelData)

  console.log(data)
  console.log(packageJsonData)
  console.log(excelData)

  const addNewRow = async () => {
    const newRow = {
      'Таблица недопустимых размеров': '6750 - 6820',
      __EMPTY: '6820',
    }

    try {
      const response = await fetch('/api/addRow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRow),
      })

      if (response.ok) {
        setExcelData([...excelData, newRow])
      } else {
        throw new Error('Ошибка при добавлении строки')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <button onClick={addNewRow}>Добавить строку</button>
      {/* Отображаем таблицу данных */}
      <table>
        <thead>
          <tr>
            <th>Таблица недопустимых размеров</th>
            <th>Допустимое значение</th>
          </tr>
        </thead>
        <tbody>
          {excelData.map((row, index) => (
            <tr key={index}>
              <td>{row['Таблица недопустимых размеров']}</td>
              <td>{row.__EMPTY}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch('https://www.swapi.tech/api/films')
  const data = await res.json()

  const packageJsonData = await readFile('package.json', 'utf-8')

  const filePath = path.resolve('./public', 'exelFile.xlsx')
  const workbook = XLSX.readFile(filePath)
  const sheetName = workbook.SheetNames[0]
  const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])

  return {
    props: {
      data: data.result,
      packageJsonData,
      excelData,
    },
  }
}
