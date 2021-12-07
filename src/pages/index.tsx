import { graphql, PageProps, Link } from 'gatsby';
import * as React from 'react';
import Layout from '../components/layout';
import Source from '../components/source';
import TwoSum from './solutions/1';

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps extends PageProps {
  data: {
    site: {
      siteMetadata: {
        siteName: string;
      };
    };
  };
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteName
      }
    }
  }
`;

export default class IndexPage extends React.Component<IndexPageProps> {
  readonly hello = `Hello`;
  public render() {
    const { siteName } = this.props.data.site.siteMetadata;
    return (
      <Layout>
        <h1>{this.hello} Dashboard</h1>
        <div>
          <Link to={'1'}>Page 1</Link>
        </div>
        <div>
          <Link to={'/404/'}>404</Link>
        </div>
        <div>
          <Link to={'/helloworld/'}>HelloWorld</Link>
        </div>

        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </Layout>
    );
  }
}
