import { Header } from './'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout
