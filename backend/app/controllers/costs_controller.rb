class CostsController < ApplicationController
    def index
        @costs = Cost.all
        render json: @costs, status: :accepted
    end

    def create
        @cost = Cost.create(item_name: params[:item_name], cost: params[:cost], description: params[:description], real_estate_id: params[:real_estate_id])
        render json: @cost, status: :accepted
      end
end
