import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from "../components/Layout";
import Strapline from '../components/Strapline';
import PostListing from '../components/PostListing';

export default ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
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
          const { id, timeToRead } = node;
          const { slug, title, date, description } = node.frontmatter;

          return (
            <PostListing
              key={id}
              slug={slug}
              title={title}
              posted={date}
              timeToRead={timeToRead}
              description={description}
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
          timeToRead
          frontmatter {
            slug
            title
            date,
            description
          }
        }
      }
    }
  }
`;
