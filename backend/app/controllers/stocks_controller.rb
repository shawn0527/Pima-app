class StocksController < ApplicationController
    def index
      @stocks = Stock.all
      render json: @stocks
    end
  
    def show
      @stock = Stock.find(params[:id])
      render json: @stock
    end
  
    def create
      @stock = Stock.new(symbol: params[:symbol], purchase_price: params[:purchasePrice], amount_of_shares: params[:shares], user_id: params[:user_id])
      @stock.valid?
      @stock.cost = @stock.amount_of_shares.to_i * @stock.purchase_price.to_f
      @stock.save
      render json:{ stock: StockSerializer.new(@stock)}, status: :accepted
    end
    
    
    ******************************************************************************************************************
    # Highlighted proud codes: I build a a method in controller to handle the calculation of stocks prices, where the values I 
    # got from frontend are different, I need to change them to the right format
    
    def update
      @stock = Stock.find(params[:id])
      if params[:trade] == 'buy'
        @stock.cost += params[:shares].to_i * params[:purchasePrice].to_f
        @stock.amount_of_shares += params[:shares].to_i
        @stock.purchase_price = (@stock.cost/@stock.amount_of_shares.to_f).round(2)
      elsif params[:trade] == 'sell'
        @stock.cost -= params[:shares].to_i * params[:purchasePrice].to_f
        @stock.amount_of_shares -= params[:shares].to_i
        @stock.purchase_price = (@stock.cost/@stock.amount_of_shares.to_f).round(2)
      else
        @stock.market_price = params[:market_price]
      end
      @stock.save
      render json: {stock: StockSerializer.new(@stock)}, status: :accepted
    end
    
    ***********************************************************************************************************************

    def destroy
        @stock = Stock.find(params[:id])
    end
  end
  
