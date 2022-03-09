import { getPosts } from '../../services/'
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

type Props = {}

const PostDetails: React.FC<Props> = ({}) => {
  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="lg:grod-cols-12 grid grid-cols-1 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail />
          <Author />
          <CommentsForm />
          <Comments />
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

export default PostDetails
