import React, { Fragment } from 'react';
import Link from 'gatsby-link';

import Strapline from '../components/Strapline';
import PostListing from '../components/PostListing';

import layout from '../styles/layout.module.scss';

export default ({ data }) => {
  const posts = data.allMarkdownRemark.edges.filter(
    e => e.node.frontmatter.type === 'blog'
  );
  const { authorBio } = data.site.siteMetadata;

  return (
    <div className={layout.l_container}>
      <Strapline text={authorBio} />

      {posts.length &&
        posts.map(({ node }) => {
          const { id, excerpt, timeToRead } = node;
          const { path, title, date } = node.frontmatter;

          return (
            <PostListing
              key={id}
              path={path}
              title={title}
              posted={date}
              excerpt={excerpt}
              timeToRead={timeToRead}
            />
          );
        })}
    </div>
  );
};

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        authorBio
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { published: { eq: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          timeToRead
          frontmatter {
            path
            title
            date
            type
          }
        }
      }
    }
  }
`;
