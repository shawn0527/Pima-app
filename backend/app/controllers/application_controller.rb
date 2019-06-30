class ApplicationController < ActionController::Base
    def encode_token(payload) #payload is a hash(object) eg {'user_id': user.id}
        @token = JWT.encode(payload, 'pima') #issue a token, store payload in token
    end

    def auth_header
        request.headers['Authorized'] #`Bear <token>`
    end

    def decoded_token
        if auth_header
            token = auth_header.split(' ')[1]
            begin
                JWT.decode(token, 'pima', true, algorithm: 'HS256')
            rescue JWT::DecodeError
                nil
            end
        end
    end

    def current_user
        if decoded_token
            user_id = decoded_token[0][0]
            @user = User.find(user_id)
        else
            nil
        end
    end

    def logged_in?
        !!current_user
    end

    def authorized
        render json: {message: 'Please log in'} unless logged_in
    end
end
