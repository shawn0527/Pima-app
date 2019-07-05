class CostsController < ApplicationController
    def index
        @costs = Cost.all
        byebug
        render json: @costs, status: :accepted
    end

    def create
        @cost = Cost.create(item_name: params[:item_name], cost: params[:cost], description: params[:description])
        render json: @cost, status: :accepted
      end
end
