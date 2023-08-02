const nodepath = require('path')
const kebab = require('slugify')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const postTemplate = nodepath.resolve('src/templates/Post.js')
    const tagTemplate = nodepath.resolve('src/templates/Tags.js')

    resolve(
      graphql(`
        {
          allMarkdownRemark(
            filter: { frontmatter: { published: { eq: true } } }
          ) {
            edges {
              node {
                frontmatter {
                  slug
                  tags
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges

        posts.forEach(({ node }) => {
          const { slug } = node.frontmatter

          createPage({
            path: slug,
            component: postTemplate
          })
        })

        // Builds an array of unique tags
        const tags = [
          ...new Set(
            posts.reduce(
              (prev, post) =>
                post.node.frontmatter.tags
                  ? [...prev, ...post.node.frontmatter.tags]
                  : prev,
              []
            )
          )
        ]

        tags.forEach(tag => {
          createPage({
            path: `/tags/${kebab(tag)}`,
            component: tagTemplate,
            context: {
              tag
            }
          })
        })
      })
    )
  })
}
