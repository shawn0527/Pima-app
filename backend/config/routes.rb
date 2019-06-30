Rails.application.routes.draw do
  # get '/home', to: 'home#index' authentication controller

  get '/users', to: 'users#index'
  post '/login', to: 'users#login'
  get '/users/:id', to: 'users#show'
  post '/register', to: 'users#create'
  patch '/users/:id', to: 'users#update'

  get '/stocks', to: 'stocks#index'
  get '/stocks/:id', to: 'stocks#show'
  post '/stocks', to: 'stocks#create'
  patch '/stocks/:id', to: 'stocks#update'
  delete '/stocks/:id', to: 'stocks#destroy'

  get '/realestates', to: 'real_estates#index'
  get '/realestates/:id', to: 'real_estates#show'
  post '/realestates', to: 'real_estates#create'
  patch '/realestates/:id', to: 'real_estates#update'
  delete '/realestates/:id', to: 'real_estates#destroy'

  get '/otherinvestments', to: 'other_investments#index'
  get '/otherinvestments/:id', to: 'other_investments#show'
  post '/otherinvestments', to: 'other_investments#create'
  patch '/otherinvestments/:id', to: 'other_investments#update'
  delete '/otherinvestments/:id', to: 'other_investments#destroy'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
