# frozen_string_literal: true

class Product < ApplicationRecord
  validates :name, :price, presence: true
  validates :price, numericality: { greater_than_or_equal_to: 0 }
  validates :stock, numericality: { greater_than_or_equal_to: 0 }

  def images
    super || []
  end

  def as_json(options = {})
    super({ methods: :_id }.merge(options)).merge('price' => price.to_f)
  end
end
