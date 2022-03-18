import React from 'react'
import { useRouter } from 'next/router'

import {
  PostType,
  CategoryType,
  getCategories,
  getCategoryPost,
} from '../../services'
import { PostCard, Categories, Loader } from '../../components'

type Props = {
  posts: { node: PostType }[]
}

const CategoryPost: React.FC<Props> = ({ posts }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loader />
  }

  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}
export default CategoryPost

// Fetch data at build time
type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const posts = await getCategoryPost(params.slug)

  return {
    props: { posts },
  }
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = (await getCategories()) as CategoryType[]
  return {
    paths: categories.map((categorie) => ({
      params: { slug: categorie.slug },
    })),
    fallback: true,
  }
}
