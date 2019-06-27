class StocksController < ApplicationController
    def index
      @stocks = User.all
      render json: @stock
    end
  
    def show
      @stock = Stock.find(params[:id])
      # @data = {
      #   method: 'get',
      #   data: @user
      # }
      render json: @stock
    end
  
    def create
      
    end
  
    def update
      
    end

    def destroy
        @stock = Stock.find(params[:id])
    end
  
    private
    def create_user
      @user = User.create(params)
    end
  
  end
  