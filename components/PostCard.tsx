type Props = {
  post: {
    title: string
    excerpt: string
  }
}

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <div>
      {post.title}
      {post.excerpt}
    </div>
  )
}

export default PostCard
