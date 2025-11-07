# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  before_action :authenticate_request

  private

  def authenticate_request
    return if public_endpoint?

    authenticate_or_request_with_http_token do |token, _options|
      payload = JsonWebToken.decode(token)
      @current_user = User.find(payload['user_id']) if payload
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError
      head :unauthorized
    end
  end

  def public_endpoint?
    false
  end

  def current_user
    @current_user
  end

  def require_admin!
    head :forbidden unless current_user&.admin?
  end
end
