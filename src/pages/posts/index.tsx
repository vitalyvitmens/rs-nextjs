import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const links = [
  {
    href: '/posts/cars',
    title: 'Машинки',
  },
  {
    href: '/posts/cats',
    title: 'Котятки',
  },
]

interface propsFromApp {
  user: string
  app: string
}
export default function HelloPage(props: propsFromApp) {
  console.log(props)
  console.log(props.user)
  console.log(props.app)
  return links.map((link) => (
    <React.Fragment key={link.href}>
      <Link href={link.href}>{link.title}</Link>
      <br />
    </React.Fragment>
  ))
}

//! Так работать с ссылками не стоит. Пример используется для ознакомления работы с кнопками и useRouter(), как подмена ссылки
// export default function HelloPage() {
//   const router = useRouter()

//   return links.map((link) => {
//     const handleClick = () => {
//       router.push(link.href)
//     }

//     return (
//       <React.Fragment key={link.href}>
//         <button onClick={handleClick}>{link.title}</button>
//         <br />
//       </React.Fragment>
//     )
//   })
// }
