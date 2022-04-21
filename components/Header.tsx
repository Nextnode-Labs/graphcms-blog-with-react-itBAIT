import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CategoryType, getCategories } from '../services'
import { useUser } from '@auth0/nextjs-auth0'

const Header: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([])

  const { user, error, isLoading } = useUser()

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories)
    })
  }, [])
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
          <span className="ml-4 align-middle font-semibold text-white md:float-right">
            {user && (
              <div className="flex h-16 flex-row gap-x-2 ">
                <div className="mt-2">
                  <Link href={`/api/auth/logout`}>Logout</Link>
                </div>
                <img
                  src={user.picture as string | undefined}
                  alt={user.name as string | undefined}
                />
                <div className="flex flex-col justify-around px-2 text-xs">
                  <h2>{'Name: ' + user.name}</h2>
                  <p>{'Email: ' + user.email}</p>
                </div>
              </div>
            )}
            {!user && (
              <div className="mt-2">
                <Link href={`/api/auth/login`}>Login</Link>
              </div>
            )}
          </span>
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
