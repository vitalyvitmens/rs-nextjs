export default function HelloPage({ children }: { children: JSX.Element }) {
  return (
    <div>
      <header>HEADER</header>
      <br />
      {children}
      <br />
      <footer>FOOTER</footer>
    </div>
  )
}
