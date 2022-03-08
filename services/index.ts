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

export const GetSimilarPosts = async (categories: string[], slug: string) => {
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
  const result = await request(graphqlAPI, query)
  return result.posts
}
