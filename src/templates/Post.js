import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { format } from 'date-fns';

import Layout from "../components/Layout";

import Tags from '../components/Tags';

import styles from '../styles/post.module.scss';
import layoutStyles from '../styles/layout.module.scss';

const Post = ({ data }) => {
  const { markdownRemark: post } = data;
  const { title, date, description, tags } = post.frontmatter;
  const { authorBio } = data.site.siteMetadata;

  return (
    <Layout>
      <div className={layoutStyles.l_container}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description || authorBio} />
        </Helmet>

        <h1>{title}</h1>

        <p className={styles.post_meta}>
          <time>{format(new Date(date), 'do MMMM yyyy')}</time> — {post.timeToRead} minute read
      </p>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <Tags tags={tags} />
      </div>
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
