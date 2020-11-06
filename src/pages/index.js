import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from "../components/Layout";
import Strapline from '../components/Strapline';
import PostListing from '../components/PostListing';

export default ({ data }) => {
  const posts = data.allMarkdownRemark.edges.filter(
    e => e.node.frontmatter.type === 'blog'
  );
  const { authorBio } = data.site.siteMetadata;

  return (
    <Layout>
      <Helmet>
        <meta
          name="google-site-verification"
          content="a6Ox8VBA5N9ohpNFIepLCkROEGmvZc2eqnm6msYIMSk"
        />
      </Helmet>

      <Strapline text={authorBio} />

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
