class UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    # @data = {
    #   method: 'get',
    #   data: @user
    # }
    render json: @user
  end

  def create
    
  end

  def update
    
  end

  private
  def create_user
    @user = User.create(params)
  end

end
