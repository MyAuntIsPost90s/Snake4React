export default interface AuthRoute {
  path: string,

  component: string,

  redirect?: string,

  exact?: boolean,

  authority?: Array<string>,

  Routes?: Array<string>,

  routes?: Array<AuthRoute>
}
