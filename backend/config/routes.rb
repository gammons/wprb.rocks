Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: 'graphql#execute' if Rails.env.development?

  post '/graphql', to: 'graphql#execute'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get 'spotify/authorize', to: 'spotify#authorize'
  get 'spotify/refresh', to: 'spotify#refresh'

  get '/hb', to: 'application#hb'

  root to: 'application#hb'
end
