import React from 'react';
import Helmet from 'react-helmet';

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
      <Helmet>G
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
