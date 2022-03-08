import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Categorie, getcategories } from '../services'

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Categorie[]>([])

  useEffect(() => {
    getcategories().then((newCategories) => {
      setCategories(newCategories)
    })
  }, [])

  return (
    <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">Categories</h3>

      {categories.map((categorie, ind) => (
        <div key={ind} className="mb-3 cursor-pointer pb-3">
          <Link href={`/categorie/${categorie.slug}`}>
            <span>{categorie.name}</span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Categories
