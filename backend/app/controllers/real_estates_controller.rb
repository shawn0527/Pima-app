class RealEstatesController < ApplicationController
    def index
        @real_estates = RealEstate.all
        render json: @real_estates
    end

    def show
        @real_estate = RealEstate.find(params[:id])
        render json: @real_estate.total_extra_cost
    end

    def create
        @real_estate = RealEstate.new(name: params[:name], address: params[:address], rent: params[:rent], insurance: params[:insurance], tax: params[:tax], cost: params[:cost], description: params[:description], user_id: params[:user_id])
        @real_estate.save
        render json: @real_estate, status: :accepted
    end
    
    def update
        @real_estate = RealEstate.find(params[:id])
        @real_estate.update(name: params[:name], address: params[:address], rent: params[:rent], insurance: params[:insurance], tax: params[:tax], cost: params[:cost], description: params[:description])
    end

    def destroy
        @real_estate = RealEstate.find(params[:id])
        @real_estate.destroy
    end
  
    private
    def create_user
      @real_estate = RealEstate.create(params)
    end
end