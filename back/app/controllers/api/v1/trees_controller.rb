class Api::V1::TreesController < ApplicationController
  #PATCH /api/v1/trees/:id/charge
  def charge
    render json:{"test": "テストです"}, status: :ok
  end
end