class Api::V1::SoulsController < ApplicationController
  # GET /api/v1/souls
  def index
    render json: {}, status: :ok
  end
end