import React from 'react'
import Header from './Header.js'
import Footer from './Footer.js'
import {Helmet} from 'react-helmet'
import {Toaster} from 'react-hot-toast'

const Layout = ({children, title, description, keywords, author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
        <Header/>
        <Toaster/>
        <main style={{minHeight:'83.5vh'}} >{children}</main>
        <Footer/>
    </div>
  )
}

Layout.defaultProps = {
  title: "Vote",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "kokitkar",
};

export default Layout