class FmeaCollaborationChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    fmea = Fmea.find(params[:id])
    stream_for fmea
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
