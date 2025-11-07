# frozen_string_literal: true

stripe_key = ENV['STRIPE_SECRET_KEY']
Stripe.api_key = stripe_key if stripe_key.present?
