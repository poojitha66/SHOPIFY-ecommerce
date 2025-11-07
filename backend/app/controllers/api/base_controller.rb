# frozen_string_literal: true

module Api
  class BaseController < ApplicationController
    private

    def public_endpoint?
      false
    end
  end
end
