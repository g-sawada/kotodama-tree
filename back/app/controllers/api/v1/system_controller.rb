class Api::V1::SystemController < ApplicationController
  skip_before_action :check_maintenance, only: [:reset]

  # POST /api/v1/system/reset
  def reset
    result = WorldResetter.call
    render json: { result: result }, status: :ok
  end
end