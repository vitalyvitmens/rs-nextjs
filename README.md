### Для создания приложения используй:
- npm create next-app rs-nextjs

Ok to proceed? (y) y
√ Would you like to use TypeScript? ... Yes
√ Would you like to use ESLint? ... Yes
√ Would you like to use Tailwind CSS? ... No 
√ Would you like to use `src/` directory? ... Yes
√ Would you like to use App Router? (recommended) ... Yes
√ Would you like to customize the default import alias (@/*)? ... Yes      
√ What import alias would you like configured? ... @/*

### Что бы поменять порт запуска с 3000 например на порт 8080:
- создаем файл .env и добавляем в него строчку: PORT=8080
- идем в файл package.json именяем строку "dev": "next dev", на строку "dev": "next dev -p 8080",

