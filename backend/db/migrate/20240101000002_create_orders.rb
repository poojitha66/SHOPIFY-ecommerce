# frozen_string_literal: true

class CreateOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :orders do |t|
      t.references :user, null: false, foreign_key: true
      t.jsonb :line_items, null: false, default: []
      t.jsonb :shipping_address
      t.string :status, null: false, default: 'pending'
      t.string :stripe_checkout_session_id
      t.decimal :total_amount, precision: 10, scale: 2, null: false, default: 0

      t.timestamps
    end
  end
end
