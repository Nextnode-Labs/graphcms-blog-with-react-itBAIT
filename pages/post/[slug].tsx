import { PostType, getPosts, getPostdetails } from '../../services/'
import React from 'react'
import {
  PostDetail,
  Categories,
  PostWidget,
  Post,
  Widget,
  Author,
  Comments,
  CommentsForm,
} from '../../components'

type Props = {
  post: PostType
}

const PostDetails: React.FC<Props> = ({ post }) => {
  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((categorie) => categorie.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const data = await getPostdetails(params.slug)
  return {
    props: { post: data },
  }
}

type Posts = [
  {
    node: Post
  }
]

export async function getStaticPaths() {
  const posts = (await getPosts()) as Posts
  return {
    paths: posts.map((post) => ({ params: { slug: post.node.slug } })),
    fallback: false,
  }
}
