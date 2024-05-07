export default function HelloPage() {
  return <div>PROGRAMMING IS COOL!</div>
}

HelloPage.getLayout = (page: JSX.Element) => {
  return (
    <>
      <header style={{ color: 'yellow', fontSize: '24px', fontWeight: 'bold' }}>
        HEADER
      </header>
      <br />
      {page}
      <br />
      <footer style={{ color: 'pink', fontSize: '24px', fontWeight: 'bold' }}>
        FOOTER
      </footer>
    </>
  )
}
