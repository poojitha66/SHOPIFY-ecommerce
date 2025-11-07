# frozen_string_literal: true

class Order < ApplicationRecord
  belongs_to :user

  validates :status, presence: true
  validates :line_items, presence: true

  enum status: { pending: 'pending', paid: 'paid', shipped: 'shipped' }, _default: 'pending'

  def as_json(options = {})
    super({
      methods: :_id,
      include: { user: { only: %i[id name email], methods: :_id } },
      except: [:updated_at]
    }.merge(options)).merge(
      'items' => line_items,
      'total' => total_amount.to_f,
      'createdAt' => created_at&.iso8601,
      'shippingAddress' => shipping_address
    )
  end
end
