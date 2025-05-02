Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: %i[index create show destroy] do
        collection do
          get :find_by_provider
        end

        member do
          patch :move
          get :profile
        end
      end

      resources :rooms, only: %i[show] do
        member do
          post :enter
        end
      end

      resources :souls, only: %i[index create destroy] do
        resources :favorites, only: %i[create] do
          collection do
            delete :destroy # いいね解除時にフロント側でfavorite_idが取得できないため、souls/:soul_id/favoritesをエンドポイントとしています
          end
        end
        member do
          patch :harvest
          patch :offer
        end
      end

      resources :pathways, only: %i[create]

      resources :trees, only: %i[] do
        member do
          patch :charge
        end
      end

      post 'system/reset', to: 'system#reset'
      get  'system/maintenance', to: 'system#maintenance'
    end
  end
end
