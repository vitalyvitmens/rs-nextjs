import { GetServerSideProps } from 'next'
import { readFile } from 'fs/promises'
import path from 'path'
import { useState } from 'react'
import ExcelJS from 'exceljs'

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
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Таблица недопустимых размеров</th>
          </tr>
          <tr>
            <th colSpan={2}>Версия от 28.05.18</th>
          </tr>
          <tr>
            <th>Расчётное значение, мм.</th>
            <th>Допустимое значение, мм.</th>
          </tr>
        </thead>
        <tbody>
          {excelData.map((row, index) => (
            <tr key={index}>
              <td>{row['Таблица недопустимых размеров']}</td>
              <td>{row.__EMPTY || 'Значение отсутствует'}</td>
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
  // Получаем данные как и раньше
  const packageJsonData = await readFile('package.json', 'utf-8')

  // Чтение и парсинг файла Excel с использованием ExcelJS
  const filePath = path.resolve('./public', 'exelFile.xlsx')
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.readFile(filePath)
  const worksheet = workbook.getWorksheet(1)
  const excelData: ExcelData = []

  worksheet!.eachRow({ includeEmpty: true }, function (row, rowNumber) {
    const rowData: ExcelDataRow = {
      'Таблица недопустимых размеров': row.getCell(1).text,
      __EMPTY: row.getCell(2).text,
    }
    excelData.push(rowData)
  })

  return {
    props: {
      data: data.result,
      packageJsonData,
      excelData,
    },
  }
}
