const nodepath = require('path');
const kebab = require('slugify');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const postTemplate = nodepath.resolve('src/templates/Post.js');
    const diaryTemplate = nodepath.resolve('src/templates/DiaryPost.js');
    const tagTemplate = nodepath.resolve('src/templates/Tags.js');

    resolve(
      graphql(`
        {
          allMarkdownRemark(
            filter: { frontmatter: { published: { eq: true } } }
          ) {
            edges {
              node {
                frontmatter {
                  path
                  tags
                  type
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        const posts = result.data.allMarkdownRemark.edges;

        posts.forEach(({ node }) => {
          const { path, type } = node.frontmatter;
          const component = type === 'blog' ? postTemplate : diaryTemplate;

          createPage({
            path,
            component,
            context: {
              path
            }
          });
        });

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
        ];

        tags.forEach(tag => {
          createPage({
            path: `/tags/${kebab(tag)}`,
            component: tagTemplate,
            context: {
              tag
            }
          });
        });
      })
    );
  });
};
