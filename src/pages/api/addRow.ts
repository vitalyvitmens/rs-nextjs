import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import ExcelJS from 'exceljs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const filePath = path.resolve('./public', 'exelFileUpdated.xlsx')
      const workbook = new ExcelJS.Workbook()
      await workbook.xlsx.readFile(filePath)
      const worksheet = workbook.getWorksheet(1)!

      // Добавляем новую строку в конец листа
      const newRow = req.body
      const lastRow = worksheet.lastRow!
      const getRowInsert = worksheet.getRow(lastRow.number + 1)
      getRowInsert.getCell(1).value = newRow['Таблица недопустимых размеров']
      getRowInsert.getCell(2).value = newRow.__EMPTY
      await workbook.xlsx.writeFile(filePath)

      res.status(200).json({ message: 'Строка успешно добавлена' })
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при добавлении строки' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
