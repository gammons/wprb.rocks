class ApplicationController < ActionController::API
  def hb
    render plain: 'up'
  end
end
