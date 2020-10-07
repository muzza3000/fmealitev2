Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  get '/playground', to: 'pages#playground'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :fmeas, only: %i[index edit create update]
end
