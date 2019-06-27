class OtherInvestmentsController < ApplicationController
    def index
        @other_investments = OtherInvestment.all
        render json: @other_investments
    end

    def show
        @other_investment = OtherInvestment.find(params[:id])
        render json: @other_investment
    end

    def create
    
    end
    
    def update
      
    end

    def destroy
        @other_investment = OtherInvestment.find(params[:id])
    end
  
    private
    def create_user
      @other_investment = OtherInvestment.create(params)
    end
end