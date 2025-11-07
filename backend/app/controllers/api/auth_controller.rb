# frozen_string_literal: true

module Api
  class AuthController < BaseController
    skip_before_action :authenticate_request

    def register
      user = User.new(user_params)

      if user.save
        render json: { token: JsonWebToken.encode(user_id: user.id), user: user_response(user) }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def login
      user = User.find_by(email: params[:email])

      if user&.authenticate(params[:password])
        render json: { token: JsonWebToken.encode(user_id: user.id), user: user_response(user) }
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end

    private

    def public_endpoint?
      true
    end

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

    def user_response(user)
      {
        id: user.id,
        _id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        role: user.admin? ? 'admin' : 'customer'
      }
    end
  end
end
