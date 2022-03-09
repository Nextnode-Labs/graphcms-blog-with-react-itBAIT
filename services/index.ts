import { request, gql } from 'graphql-request'
import { RichTextContent } from '@graphcms/rich-text-types'
import { CommentObjType } from '../components/CommentsForm'

export type PostType = {
  author: AuthorType
  createdAt: Date
  slug: string
  title: string
  excerpt: string
  featured_image: {
    url: string
  }
  categories: CategorieType[]
  content: {
    raw: RichTextContent
  }
}

export type AuthorType = {
  bio: string
  name: string
  id: number
  photo: {
    url: string
  }
}

export type CategorieType = {
  name: string
  slug: string
}

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || ''

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featured_image {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `
  const result = await request(graphqlAPI, query)
  return result.postsConnection.edges
}

export const getPostdetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featured_image {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `
  const result = await request(graphqlAPI, query, { slug })
  return result.post
}

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featured_image {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query)
  return result.posts
}

export const getSimilarPosts = async (categories: string[], slug: string) => {
  if (!categories) return
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featured_image {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query, { categories, slug })
  return result.posts
}

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query)
  return result.categories
}

export const submitComment = async (obj: CommentObjType) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify(obj),
  })

  return result.json()
}
