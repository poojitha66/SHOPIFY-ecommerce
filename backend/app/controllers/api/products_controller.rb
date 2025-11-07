# frozen_string_literal: true

module Api
  class ProductsController < BaseController
    before_action :set_product, only: %i[show update destroy]
    before_action :require_admin!, only: %i[create update destroy]

    skip_before_action :authenticate_request, only: %i[index show]

    def index
      render json: Product.all.order(created_at: :desc)
    end

    def show
      render json: @product
    end

    def create
      product = Product.new(product_params)

      if product.save
        render json: product, status: :created
      else
        render json: { errors: product.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      if @product.update(product_params)
        render json: @product
      else
        render json: { errors: @product.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      @product.destroy
      head :no_content
    end

    private

    def public_endpoint?
      %w[index show].include?(action_name)
    end

    def set_product
      @product = Product.find(params[:id])
    end

    def product_params
      params.require(:product).permit(:name, :description, :price, :category, :stock, images: [])
    end
  end
end
