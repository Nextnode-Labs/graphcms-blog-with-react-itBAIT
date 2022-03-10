import React, { useState, useEffect } from 'react'
import moment from 'moment'
import parse from 'html-react-parser'
import { CommentType, getComments } from '../services'

type Props = {
  slug: string
}

const Comments: React.FC<Props> = ({ slug }) => {
  const [comments, setComments] = useState<CommentType[]>([])

  useEffect(() => {
    getComments(slug).then((result) => {
      setComments(result)
    })
  }, [])

  return (
    <>
      {comments.length > 0 && (
        <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
          <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
            {comments.length} Comments
          </h3>
          {comments.map((comment, ind) => (
            <div key={ind} className="mb-4 border-b border-gray-100 pb-4">
              <p className="mb-4">
                <span className="font-semibold">{comment.name}</span> on{' '}
                {moment(comment.createdAt).format('MMM, DD, YYYY')}
              </p>
              <p className="text-gray-600 w-full whitespace-pre-line">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments
