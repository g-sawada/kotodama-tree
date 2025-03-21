class Api::V1::RoomsController < ApplicationController
  # GET /api/v1/rooms/:id
  def show
    return render json: {}, status: :ok
  end
end