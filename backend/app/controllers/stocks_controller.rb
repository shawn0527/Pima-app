class StocksController < ApplicationController
    def index
      @stocks = Stock.all
      render json: @stocks
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
      @stock = Stock.new(symbol: params[:symbol], purchase_price: params[:purchasePrice], amount_of_shares: params[:shares], user_id: params[:user_id])
      @stock.valid?
      @stock.save
      render json:{ stock: StockSerializer.new(@stock)}, status: :accepted
    end
  
    def update
      @stock = Stock.find(params[:id])
      byebug
    end

    def destroy
        @stock = Stock.find(params[:id])
    end
  end
  