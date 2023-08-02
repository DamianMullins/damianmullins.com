import React from 'react'
import { Helmet } from 'react-helmet'

import Layout from '../components/Layout'
import notFoundImage from '../assets/images/404.avif'

const PageNotFound = () => (
  <Layout>
    <Helmet title="Page Not Found" />
    <h1>Page Not Found</h1>

    <p>The page you are looking for couldn't be found.</p>
    <img src={notFoundImage} alt="" />
  </Layout>
)

export default PageNotFound
