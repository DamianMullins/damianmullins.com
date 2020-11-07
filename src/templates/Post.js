import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from "../components/Layout";
import Tags from '../components/Tags';
import PostTime from '../components/PostTime';

import styles from '../styles/post.module.scss';

const Post = ({ data }) => {
  const { markdownRemark: post } = data;
  const { title, date, description, tags } = post.frontmatter;
  const { authorBio } = data.site.siteMetadata;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description || authorBio} />
      </Helmet>

      <h1>{title}</h1>

      <PostTime
        posted={date}
        timeToRead={post.timeToRead} />

      <div
        className={styles.post}
        dangerouslySetInnerHTML={{ __html: post.html }} />

      <Tags tags={tags} />
    </Layout>
  );
};

Post.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      timeToRead: PropTypes.number.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        tags: PropTypes.array.isRequired
      })
    }).isRequired
  })
};

export default Post;

export const query = graphql`
  query ($path: String!) {
    site {
      siteMetadata {
        authorBio
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      html
      timeToRead
      frontmatter {
        title
        date
        description
        tags
      }
    }
  }
`;
