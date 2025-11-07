# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  has_many :orders, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :name, presence: true

  def as_json(options = {})
    super({ methods: :_id, except: [:password_digest] }.merge(options))
  end
end
