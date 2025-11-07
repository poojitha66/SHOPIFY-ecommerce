# frozen_string_literal: true

module Api
  class CheckoutController < BaseController
    def create_session
      line_items = params[:line_items] || params[:items]
      return render json: { error: 'line_items are required' }, status: :unprocessable_entity unless line_items.present?

      normalized_items = normalize_line_items(line_items)
      return render json: { error: 'line_items are required' }, status: :unprocessable_entity if normalized_items.empty?
      success_url = params.fetch(:success_url, 'http://localhost:5173/success')
      cancel_url = params.fetch(:cancel_url, 'http://localhost:5173/cancel')

      stripe_session = Stripe::Checkout::Session.create(
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: current_user.email,
        line_items: normalized_items.map { |item| build_line_item(item) },
        success_url: success_url,
        cancel_url: cancel_url
      )

      render json: { id: stripe_session.id }
    rescue Stripe::StripeError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end

    private

    def build_line_item(item)
      product = Product.find(item[:product_id])
      {
        price_data: {
          currency: 'usd',
          product_data: { name: product.title },
          unit_amount: (product.price * 100).to_i
        },
        quantity: item[:quantity]
      }
    end

    def normalize_line_items(line_items)
      line_items.map do |item|
        product_identifier = item[:product_id] || item[:product] || item['product_id'] || item['product']
        product_id = product_identifier.to_s
        next unless product_id.match?(/\A\d+\z/)
        product_id = product_id.to_i
        quantity = (item[:quantity] || item['quantity'] || 1).to_i

        {
          product_id: product_id,
          quantity: quantity,
          price: item[:price] || item['price']
        }.compact
      end.compact
    end
  end
end
