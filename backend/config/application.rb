# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    config.load_defaults 7.1
    config.api_only = true

    config.generators.system_tests = nil
    config.autoload_paths << Rails.root.join('app', 'services')
  end
end
