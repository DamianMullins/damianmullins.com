import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { format } from 'date-fns';
import { DiscussionEmbed } from 'disqus-react';

import Layout from "../components/layout";

import Tags from '../components/Tags';

import styles from '../styles/post.module.scss';
import layoutStyles from '../styles/layout.module.scss';

const Post = ({ data }) => {
  const { markdownRemark: post } = data;
  const { slug, title, date, description, tags } = post.frontmatter;
  const { siteUrl, authorBio, disqusShortname } = data.site.siteMetadata;
  const disqusConfig = {
    url: siteUrl + slug,
    identifier: slug,
    title
  };

  return (
    <Layout>
      <div className={layoutStyles.l_container}>
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

        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
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
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.stringisRequired,
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
        siteUrl
        authorBio
        disqusShortname
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      html
      timeToRead
      frontmatter {
        slug
        title
        date
        description
        tags
      }
    }
  }
`;
