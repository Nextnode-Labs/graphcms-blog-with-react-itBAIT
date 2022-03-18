import type { NextPage } from 'next'
import Head from 'next/head'
import { PostCard, PostWidget, Categories } from '../components'
import { PostType, getPosts } from '../services'
import { FeaturedPosts } from '../sections'

type Props = {
  posts: { node: PostType }[]
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>My Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, ind) => (
            <PostCard key={ind} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const posts: PostType[] = (await getPosts()) || []
  return {
    props: { posts },
  }
}


export default Home
