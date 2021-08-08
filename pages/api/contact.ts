// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_API_KEY
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, message } = req.body
  await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID || '',
    },
    properties: {
      name: {
        type: "title",
        title: [
          {
            type: 'text',
            text: {
              content: name
            }
          }
        ]
      },
      email: {
        type: 'email',
        email: email
      },
      message: {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: message
            }
          }
        ]
      }
    }
  }).then(() => {
    res.status(201).json({ message: 'Sucesso!' })
  }).catch((error) => {
    console.log(error)
    res.status(500).json({ message: 'Ops, algo deu errado!' })
  })
}
