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
      if params[:trade] == 'buy'
        cost = @stock.amount_of_shares * @stock.purchase_price + params[:shares].to_i * params[:purchasePrice].to_f
        @stock.amount_of_shares += params[:shares].to_i
        @stock.purchase_price = (cost/@stock.amount_of_shares.to_f).round(2)
      elsif params[:trade] == 'sell'
        cost = @stock.amount_of_shares * @stock.purchase_price - params[:shares].to_i * params[:purchasePrice].to_i
        @stock.amount_of_shares -= params[:shares].to_i
        @stock.purchase_price = (cost/@stock.amount_of_shares.to_f).round(2)
      end
      @stock.save
      render json: {stock: StockSerializer.new(@stock)}, status: :accepted
    end

    def destroy
        @stock = Stock.find(params[:id])
    end
  end
  