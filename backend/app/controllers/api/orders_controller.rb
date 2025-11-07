# frozen_string_literal: true

require 'bigdecimal'

module Api
  class OrdersController < BaseController
    before_action :set_order, only: :show

    def index
      orders = current_user&.admin? ? Order.includes(:user).order(created_at: :desc) : current_user.orders.order(created_at: :desc)
      render json: orders.map(&:as_json)
    end

    def show
      unless current_user&.admin? || @order.user_id == current_user&.id
        return head :forbidden
      end

      render json: @order.as_json
    end

    def create
      payload = order_params
      line_items = normalize_line_items(payload[:line_items] || payload[:items] || [])
      return render json: { error: 'line_items are required' }, status: :unprocessable_entity if line_items.empty?
      total = calculate_total(line_items)

      order = current_user.orders.new(
        line_items: line_items,
        shipping_address: payload[:shipping_address],
        total_amount: total
      )

      if order.save
        render json: order.as_json, status: :created
      else
        render json: { errors: order.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def set_order
      @order = Order.find(params[:id])
    end

    def order_params
      order_hash = params[:order]&.to_unsafe_h || params.to_unsafe_h
      order_hash.deep_symbolize_keys.slice(:line_items, :items, :shipping_address)
    end

    def calculate_total(line_items)
      line_items.sum do |item|
        price = item[:price] || Product.find(item[:product_id]).price
        BigDecimal(price.to_s) * item[:quantity].to_i
      end
    rescue ActiveRecord::RecordNotFound
      0
    end

    def normalize_line_items(line_items)
      line_items.map do |item|
        product_identifier = item[:product_id] || item[:product] || item['product_id'] || item['product']
        product_id = product_identifier.to_s
        next unless product_id.match?(/\A\d+\z/)
        product_id = product_id.to_i
        quantity = (item[:quantity] || item['quantity'] || 1).to_i

        next unless product_id

        {
          product_id: product_id,
          quantity: quantity,
          price: item[:price] || item['price']
        }.compact
      end.compact
    end
  end
end
