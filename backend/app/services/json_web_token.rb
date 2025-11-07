# frozen_string_literal: true

class JsonWebToken
  HMAC_SECRET = begin
    ENV['JWT_SECRET'] || Rails.application.secret_key_base || Rails.application.credentials.secret_key_base
  rescue NoMethodError
    ENV['JWT_SECRET'] || 'development-secret'
  end
  ALGORITHM = 'HS256'

  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, HMAC_SECRET, ALGORITHM)
  end

  def self.decode(token)
    body = JWT.decode(token, HMAC_SECRET, true, { algorithm: ALGORITHM })[0]
    HashWithIndifferentAccess.new(body)
  rescue JWT::ExpiredSignature
    nil
  end
end
