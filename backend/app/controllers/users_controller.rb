class UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def show
    current_user
    # @data = {
    #   method: 'get',
    #   data: @user
    # }
    render json: @user
  end

  def create
    @user = User.new(user_params)
    @user.valid?
    @user.save
  end

  def update
    
  end

  private
  def current_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:username, :password, :password_confrimation, :firstname, :lastname, :email, :mailing)
  end

end
