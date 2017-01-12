Rails.application.routes.draw do
  root 'static_pages#index'
  get  'static_pages/index'
  get  'static_pages/index1'
  get  'static_pages/index2'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
