import React from 'react';
import { graphql } from 'gatsby';

import Layout from "../components/layout";
import Strapline from '../components/Strapline';
import PostListing from '../components/PostListing';

export default ({ data }) => {
  const posts = data.allMarkdownRemark.edges.filter(
    e => e.node.frontmatter.type === 'diary'
  );

  return (
    <Layout>
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
    </Layout>
  );
};

export const query = graphql`
  {
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
