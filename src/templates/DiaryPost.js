import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { format } from 'date-fns';

import Layout from "../components/Layout";
import Tags from '../components/Tags';

import styles from '../styles/post.module.scss';

const Diary = ({ data }) => {
  const { markdownRemark: post } = data;
  const { slug, title, date, description, tags } = post.frontmatter;
  const { authorBio } = data.site.siteMetadata;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description || authorBio} />
      </Helmet>

      <h1>{title}</h1>
      <p className={styles.post_meta}>
        <time>{format(date, 'Do MMMM YYYY')}</time> — {post.timeToRead} minute read
      </p>

      <div dangerouslySetInnerHTML={{ __html: post.html }} />

      <Tags tags={tags} />
    </Layout>
  );
};

Diary.propTypes = {
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

export default Diary;

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
