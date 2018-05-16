import React from 'react';
import Link from 'gatsby-link';
import moment from 'moment';

import Strapline from '../components/Strapline';
import PostListing from '../components/PostListing';

import layout from '../styles/layout.module.scss';

export default ({ data }) => {
  const posts = data.allMarkdownRemark.edges.filter(
    e => e.node.frontmatter.type === 'diary'
  );

  return (
    <div className={layout.l_container}>
      <Strapline text='Development diary for my personal projects' />

      {posts.length &&
        posts.map(({ node }) => {
          const { id, excerpt, timeToRead } = node;
          const { slug, title, date } = node.frontmatter;

          return (
            <PostListing
              key={id}
              slug={slug}
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
  query DiaryQuery {
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
            slug
            title
            date
            type
          }
        }
      }
    }
  }
`;
