// @flow

import * as routingHelpers from '../src/common/routing-helpers';

describe('Routing Helpers', () => {
  const routes = [
    {
      key: 'test',
      exact: false,
      path: '/test/',
      title: 'Test',
      render() {},
    },
    {
      key: 'nest',
      exact: false,
      path: '/nest/:name?',
      title: 'Nest',
      render() {},
      routes: [
        {
          key: 'nest-child',
          exact: false,
          path: '/nest/child/',
          title: 'Child - Nest',
          render() {},
        },
        {
          key: 'nest-sibling',
          exact: false,
          path: '/nest/sibling/',
          title: 'Sibling - Nest',
          render() {},
        },
        {
          key: 'nest-default',
          exact: false,
          title: 'Default - Nest',
          render() {},
        },
      ],
    },
    {
      key: 'default',
      exact: false,
      title: 'Default',
      render() {},
    },
  ];

  describe('getAllPaths', () => {
    it('gets an array of all paths', () => {
      const paths = routingHelpers.getAllPaths(routes);
      expect(paths).toEqual(expect.arrayContaining(['/test/', '/nest/', '/nest/child/', '/nest/sibling/']));
    });
  });

  describe('getRouteFromPath', () => {
    it('finds a top-level route', () => {
      const route = routingHelpers.getRouteFromPath(routes, '/test');
      expect(route).toMatchObject({ key: 'test', index: 0, parent: undefined });
    });

    it('finds a nested route', () => {
      const route = routingHelpers.getRouteFromPath(routes, '/nest/sibling/');
      expect(route).toMatchObject({
        key: 'nest-sibling',
        index: 1,
        pathname: '/nest/sibling/',
        parent: {
          key: 'nest', index: 1, parent: undefined, pathname: '/nest/',
        },
      });
    });

    it('returns null if route is non-existent', () => {
      const route = routingHelpers.getRouteFromPath(routes, '/blah');
      expect(route).toBe(null);
    });
  });

  describe('getAbsolutePath', () => {
    it('adds a trailing slash', () => {
      const route = routingHelpers.getAbsolutePath('/a/b');
      expect(route).toBe('/a/b/');
    });

    it('leaves a well-formed path as it is', () => {
      const route = routingHelpers.getAbsolutePath('/a/b/');
      expect(route).toBe('/a/b/');
    });

    it('removes params', () => {
      const route = routingHelpers.getAbsolutePath('/a/:b/');
      expect(route).toBe('/a/');
    });

    it('removes nested params', () => {
      const route = routingHelpers.getAbsolutePath('/a/:b/c');
      expect(route).toBe('/a/');
    });
  });

  describe('getRouteFromKey', () => {
    it('finds a top-level route', () => {
      const route = routingHelpers.getRouteFromKey(routes, 'test');
      expect(route).toBe(routes[0]);
    });

    it('finds a nested route', () => {
      const route = routingHelpers.getRouteFromKey(routes, 'nest-sibling');
      expect(route).toMatchObject(routes[1].routes[1]);
    });

    it('returns null if route is non-existent', () => {
      const route = routingHelpers.getRouteFromKey(routes, 'blah');
      expect(route).toBe(null);
    });
  });

  describe('getNewPathFromSwipe', () => {
    it('moves horizontally right on top level', () => {
      const currentRoute = {
        key: 'test', index: 0, parent: undefined, pathname: '/test/',
      };
      const path = routingHelpers.getNewPathFromSwipe(routes, currentRoute, 1, 0);
      expect(path).toBe('/nest/');
    });

    it('does not move horizontally if at start of top level', () => {
      const currentRoute = {
        key: 'test', index: 0, parent: undefined, pathname: '/test/',
      };
      const path = routingHelpers.getNewPathFromSwipe(routes, currentRoute, -1, 0);
      expect(path).toBe('/test/');
    });

    it('does not move horizontally if at end of top level', () => {
      const currentRoute = {
        key: 'nest', index: 1, parent: undefined, pathname: '/nest/',
      };
      const path = routingHelpers.getNewPathFromSwipe(routes, currentRoute, 1, 0);
      expect(path).toBe('/nest/');
    });

    it('moves horizontally from nested path', () => {
      const currentRoute = {
        key: 'nest-child',
        index: 0,
        pathname: '/nest/child/',
        parent: {
          key: 'nest', index: 1, parent: undefined, pathname: '/nest/',
        },
      };
      const path = routingHelpers.getNewPathFromSwipe(routes, currentRoute, -1, 0);
      expect(path).toBe('/test/');
    });

    it('does not move horizontally from nested path if at end of top level', () => {
      const currentRoute = {
        key: 'nest-child',
        index: 0,
        pathname: '/nest/child/',
        parent: {
          key: 'nest', index: 1, parent: undefined, pathname: '/nest/',
        },
      };
      const path = routingHelpers.getNewPathFromSwipe(routes, currentRoute, 1, 0);
      expect(path).toBe('/nest/child/');
    });

    it('returns null if swipe is vertical', () => {
      const currentRoute = {
        key: 'nest', index: 1, parent: undefined, pathname: '/nest/',
      };
      const path = routingHelpers.getNewPathFromSwipe(routes, currentRoute, 0, 1);
      expect(path).toBe(null);
    });
  });
});
