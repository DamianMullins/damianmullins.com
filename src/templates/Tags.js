import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import layout from '../styles/layout.module.scss';

const Tags = ({ pathContext, data }) => {
  const { tag } = pathContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  return (
  <div className={layout.l_container}>
      <h1>{tagHeader}</h1>

      <ul>
        {edges.map(({ node }) => {
          const { slug, title } = node.frontmatter;
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          );
        })}
      </ul>

      <Link to='/tags'>All tags</Link>
    </div>
  );
};

Tags.propTypes = {
  pathContext: PropTypes.shape({
    tag: PropTypes.string.isRequired
  }),

  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              slug: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired
            })
          })
        }).isRequired
      )
    })
  })
};

export default Tags;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`;
