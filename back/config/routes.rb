Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: %i[index create show destroy] do
        collection do
          get :find_by_provider
        end
      end

      resources :rooms, only: %i[show]

      resources :souls, only: %i[index create destroy]
    end
  end
end
