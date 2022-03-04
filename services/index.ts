import { request, gql } from 'graphql-request'

export type Post = {
  author: {
    bio: string
    name: string
    id: number
    photo: {
      url: string
    }
  }
  createdAt: Date
  slug: string
  title: string
  excerpt: string
  featured_image: {
    url: string
  }
  categories: {
    name: string
    slug: string
  }
}

export const getPosts = async () => {
  const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || ''

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
