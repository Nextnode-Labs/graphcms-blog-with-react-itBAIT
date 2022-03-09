import { gql, GraphQLClient } from 'graphql-request'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || ''
const graphsmcToken = process.env.GRAPHCMS_TOKEN || ''

type Data = {
  id: string
}

export default async function comments(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphsmcToken}`,
    },
  })

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `

  const result = await graphQLClient.request(query, req.body)

  return res.status(200).send(result)
}
