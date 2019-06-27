class RealEstatesController < ApplicationController
    def index
        @real_estates = RealEstate.all
        render json: @real_estates
    end

    def show
        @real_estate = RealEstate.find(params[:id])
        render json: @real_estate
    end

    def create
    
    end
    
    def update
      
    end

    def destroy
        @real_estate = RealEstate.find(params[:id])
    end
  
    private
    def create_user
      @real_estate = RealEstate.create(params)
    end
end