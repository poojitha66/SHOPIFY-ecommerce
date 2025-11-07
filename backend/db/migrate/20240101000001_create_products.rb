# frozen_string_literal: true

class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.text :description
      t.decimal :price, precision: 10, scale: 2, null: false, default: 0
      t.string :category
      t.string :images, array: true, default: []
      t.integer :stock, null: false, default: 0

      t.timestamps
    end
  end
end
