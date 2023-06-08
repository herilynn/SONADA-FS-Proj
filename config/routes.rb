Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get 'api/test', to: 'application#test'
  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :show, :destroy]
    resources :groups, only: [:create, :index, :destroy, :show, :update] do
      collection do
        post 'search'
      end
    end
  end
  get '*path', to: "static_pages#frontend_index"
end
