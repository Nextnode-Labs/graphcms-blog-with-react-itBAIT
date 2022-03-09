import React, { useState, useEffect, useRef } from 'react'

type Props = {
  slug: string
}

export type CommentObjType = {
  name: string
  email: string
  comment: string
  slug: string
}

const CommentsForm: React.FC<Props> = ({ slug }) => {
  const [error, setError] = useState(false)
  // const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const commentEl = useRef<HTMLTextAreaElement>(null)
  const nameEl = useRef<HTMLInputElement>(null)
  const emailEl = useRef<HTMLInputElement>(null)
  const storeDataEl = useRef<HTMLInputElement>(null)

  const handleCommentSubmission = () => {
    setError(false)

    const comment = commentEl.current?.value
    const name = nameEl.current?.value
    const email = emailEl.current?.value
    const storeData = storeDataEl.current?.checked

    if (!comment || !name || !email) {
      setError(true)
      return
    }

    const commentObj: CommentObjType = {
      name,
      email,
      comment,
      slug,
    }

    if (storeData) {
      localStorage.setItem('name', name)
      localStorage.setItem('email', email)
    } else {
      localStorage.removeItem('name')
      localStorage.removeItem('email')
    }
  }

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">CommentsForm</h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          ref={commentEl}
          placeholder="Comment"
          name="comment"
          className="w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          ref={nameEl}
          placeholder="Name"
          name="name"
          type="text"
          className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
        />
        <input
          ref={emailEl}
          placeholder="Email"
          name="email"
          type="text"
          className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 ">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeDate"
            value="true"
            className="cursor-pointer"
          />
          <label
            className="ml-2 cursor-pointer text-gray-500"
            htmlFor="storeData"
          >
            Save name and email
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are required!</p>
      )}
      <div className="mt-8">
        <button
          className="ease inline-block cursor-pointer rounded-full bg-pink-600 py-3 px-8 text-lg text-white transition duration-500 hover:bg-indigo-900"
          type="button"
          onClick={handleCommentSubmission}
        >
          Post comment
        </button>
        {showSuccessMessage && (
          <span className="float-right mt-3 text-xl font-semibold text-green-500">
            Comment submited for review!
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentsForm
