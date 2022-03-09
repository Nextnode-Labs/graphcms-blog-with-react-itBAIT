import { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'
import {
  PostType,
  CategorieType,
  getRecentPosts,
  getSimilarPosts,
} from '../services'

type Props = {
  categories?: string[]
  slug?: string
}

const PostWidget: React.FC<Props> = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState<PostType[]>([])
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories || [], slug).then((result: PostType[]) =>
        setRelatedPosts(result)
      )
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result))
    }
  }, [slug])
  return (
    <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post, ind) => (
        <Link key={ind} href={`/post/${post.slug}`}>
          <div className="mb-4 flex w-full cursor-pointer items-center">
            <div className="w-16 flex-none">
              <img
                src={post.featured_image.url}
                alt={post.title}
                height="60px"
                width="60px"
                className="rounded-full align-middle"
              />
            </div>
            <div className="ml-4 flex-grow">
              <p className="font-xs text-gray-500">
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </p>

              <span className="text-md">{post.title}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default PostWidget
