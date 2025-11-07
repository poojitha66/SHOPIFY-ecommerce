# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    post 'auth/register', to: 'auth#register'
    post 'auth/login', to: 'auth#login'

    resources :products

    resources :orders, only: %i[index create show]

    post 'checkout/session', to: 'checkout#create_session'
  end
end
