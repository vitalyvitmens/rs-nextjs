import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

const XLSX = require('xlsx')

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const filePath = path.resolve('./public', 'exelFile.xlsx')
      const workbook = XLSX.readFile(filePath)
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]

      // Добавляем новую строку в конец листа
      const newRow = req.body
      XLSX.utils.sheet_add_json(worksheet, [newRow], {
        skipHeader: true,
        origin: -1,
      })

      // Перезаписываем файл с новыми данными
      XLSX.writeFile(workbook, filePath)

      res.status(200).json({ message: 'Строка успешно добавлена' })
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при добавлении строки' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
