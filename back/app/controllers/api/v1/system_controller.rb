class Api::V1::SystemController < ApplicationController
  # POST /api/v1/system/reset
  def reset
    result = WorldResetter.call
    render json: { result: result }, status: :ok
  end
end