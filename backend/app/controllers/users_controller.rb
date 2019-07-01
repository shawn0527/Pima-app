class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]

  def index
    @users = User.all
    render json: @users
  end

  def login
    render json: {user: UserSerializer.new(current_user)}, status: :accepted
  end

  def show
    current_user
    render json: @user
  end

  def create
    @user = User.new(user_params)
    if @user.valid?
      @user.save
      @token = encode_token({user_id: @user.id})
      render json: {user: UserSerializer.new(@user), jwt_token: @token}, status: :accepted
    else
      render json: {error: 'failed to create user'}, status: :not_acceptable
    end
  end

  def update
    
  end

  private

  def user_params
    params.require(:user).permit(:id, :username, :password, :password_confirmation, :firstname, :middlename, :lastname, :email, :mailing)
  end

end
