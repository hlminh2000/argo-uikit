import ApplicationRoot from 'components/ApplicationRoot';
import { EGO_JWT_KEY } from 'global/constants';
import { LOGIN_PAGE_PATH } from 'global/constants/pages';
import { decodeToken, isValidJwt } from 'global/utils/egoJwt';
import getApolloCacheForQueries from 'global/utils/getApolloCacheForQueries';
import nextCookies from 'next-cookies';
import Router from 'next/router';
import * as React from 'react';
import ReactGA from 'react-ga';
import { ERROR_STATUS_KEY } from './_error';
import App, { AppContext } from 'next/app';
import { getDefaultRedirectPathForUser } from 'global/utils/pages';
import Cookies from 'js-cookie';
import urlJoin from 'url-join';
import { get } from 'lodash';

import {
  PageWithConfig,
  GetInitialPropsContext,
  ClientSideGetInitialPropsContext,
} from 'global/utils/pages/types';
import { NextPageContext } from 'next';
import { getConfig } from 'global/config';

const redirect = (res, url: string) => {
  if (res) {
    res.writeHead(302, {
      Location: url,
    });
    res.end();
  } else {
    Router.push(url);
  }
};

const enforceLogin = ({ ctx }: { ctx: NextPageContext }) => {
  const loginRedirect = `${LOGIN_PAGE_PATH}?redirect=${encodeURI(ctx.asPath)}`;
  redirect(ctx.res, loginRedirect);
};

type RootGetInitialPropsData = {
  pageProps: { [k: string]: any };
  unauthorized: boolean;
  pathname: string;
  ctx: ClientSideGetInitialPropsContext;
  egoJwt?: string;
  apolloCache: {};
};

const removeCookie = (res, cookieName) => {
  res && res.setHeader('Set-Cookie', `${cookieName}=deleted; expires=${new Date(1).toUTCString()}`);
};

class Root extends App<{
  egoJwt?: string;
  ctx: NextPageContext;
  apolloCache: any;
  pathname: string;
  unauthorized: boolean;
  startWithGlobalLoader: boolean;
}> {
  static async getInitialProps({ Component, ctx }: AppContext & { Component: PageWithConfig }) {
    const egoJwt: string | undefined = nextCookies(ctx)[EGO_JWT_KEY];
    const { res } = ctx;
    const { AUTH_DISABLED } = getConfig();

    if (egoJwt) {
      if (!isValidJwt(egoJwt)) {
        removeCookie(res, EGO_JWT_KEY);
        redirect(res, `${LOGIN_PAGE_PATH}?redirect=${encodeURI(ctx.asPath)}`);
      }
    } else {
      if (!Component.isPublic) {
        enforceLogin({ ctx });
      }
    }

    const unauthorized = Component.isAccessible
      ? !(await Component.isAccessible({ egoJwt, ctx }))
      : false;

    if (unauthorized && !AUTH_DISABLED) {
      const err = new Error('Unauthorized') as Error & { statusCode?: number };
      err[ERROR_STATUS_KEY] = 401;
      throw err;
    }

    const pageProps = await Component.getInitialProps({ ...ctx, egoJwt });

    let graphqlQueriesToCache;
    let apolloCache = {};
    try {
      graphqlQueriesToCache = Component.getGqlQueriesToPrefetch
        ? await Component.getGqlQueriesToPrefetch({ ...ctx, egoJwt })
        : [];
      apolloCache = graphqlQueriesToCache
        ? await getApolloCacheForQueries(graphqlQueriesToCache)(egoJwt)
        : {};
    } catch (e) {
      console.log(e);
    }

    const startWithGlobalLoader = Component.startWithGlobalLoader || false;

    return {
      pageProps,
      unauthorized,
      pathname: ctx.pathname,
      egoJwt,
      ctx: {
        pathname: ctx.pathname,
        query: ctx.query,
        asPath: ctx.asPath,
      },
      apolloCache,
      startWithGlobalLoader,
    };
  }

  componentDidMount() {
    const {
      ctx: { asPath, query, res },
      egoJwt,
    } = this.props;
    const userModel = decodeToken(egoJwt);
    const { GA_TRACKING_ID } = getConfig();

    ReactGA.initialize(GA_TRACKING_ID, {
      gaOptions: {
        userId: userModel ? userModel.context.user.email : 'NA',
      },
    });

    const redirectPath = get(query, 'redirect');

    if (redirectPath && !egoJwt) {
      const { EGO_API_ROOT, EGO_CLIENT_ID } = getConfig();
      const egoLoginUrl = urlJoin(EGO_API_ROOT, `/api/oauth/ego-token?client_id=${EGO_CLIENT_ID}`);
      fetch(egoLoginUrl, {
        credentials: 'include',
        headers: { accept: '*/*' },
        body: null,
        method: 'GET',
        mode: 'cors',
      })
        .then(res => res.text())
        .then(egoToken => {
          if (isValidJwt(egoToken)) {
            Cookies.set(EGO_JWT_KEY, egoToken);
            location.assign(`${redirectPath || '/'}`);
          }
        })
        .catch(err => {
          console.warn('err: ', err);
          removeCookie(res, EGO_JWT_KEY);
          redirect(res, `${LOGIN_PAGE_PATH}?redirect=${encodeURI(asPath)}`);
        });
    }
    ReactGA.pageview(asPath);
  }

  render() {
    const { Component, pageProps, ctx, apolloCache, egoJwt, startWithGlobalLoader } = this.props;

    return (
      <ApplicationRoot
        egoJwt={egoJwt}
        apolloCache={apolloCache}
        pageContext={ctx}
        startWithGlobalLoader={startWithGlobalLoader}
      >
        <Component {...pageProps} />
      </ApplicationRoot>
    );
  }
}

export default Root;
