class AuthController < ApplicationController
    skip_before_action :authorized, only: [:login, :user_login_params]

    def login
        @user = User.find_by(username: 'admin')
        if @user && @user.authenticate('a')
            @token = encode_token({user_id: @user.id})
            render json: {user: UserSerializer.new(@user), jwt_token: @token}, status: :accepted
        else
            render json: {message: 'Invalid username or password'}, status: :unauthorized
        end
    end

    private

    def user_login_params
        params.require(:user).permit(:username, :password)
    end
end