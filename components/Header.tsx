import { useContext } from 'react'
import Link from 'next/link'

const categories = [
  { name: 'React', slug: 'react' },
  { name: 'Web Development', slug: 'webdev' },
  { name: 'Medtronic', slug: 'mdt' },
]

const Header: React.FC = () => {
  useContext
  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="boder-b inline-block w-full border-blue-400 py-8">
        <div className="block md:float-left">
          <Link href="/">
            <span className="cursor-pointer text-4xl font-bold text-white">
              GraphCMS
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category, ind) => (
            <Link href={`/category/${category.slug}`} key={ind}>
              <span className="mt-2 ml-4 cursor-pointer align-middle font-semibold text-white md:float-right">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
