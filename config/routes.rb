Rails.application.routes.draw do
  devise_for :users
  get '/user' => "fmeas#index", :as => :user_root
  root to: 'pages#home'
  get '/playground', to: 'pages#playground'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :fmeas, only: %i[index edit create update destroy]
  resources :functions, only: %i[update create destroy]
  resources :failure_modes, only: %i[update create destroy]
  resources :effects, only: %i[update create destroy]
  resources :causes, only: %i[update create destroy]
end
