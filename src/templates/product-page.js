import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const ProductPageTemplate = ({ title, content, image, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <div>
      <div className="main-section">
        <div className="flex-container">
          <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
            {title}
          </h2>
          <PageContent className="content" content={content} />
          <img src={`${
            !!image.childImageSharp ? image.childImageSharp.fluid.src : image
            }`} alt="Servicios" className="image-small"></img>
        </div>
      </div>
    </div>
  )
}

ProductPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const ProductPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ProductPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        image={post.frontmatter.image}
      />
    </Layout>
  )
}

ProductPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ProductPage

export const productPageQuery = graphql`
  query ProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
