module CardContentHelper
  def show_rating(element)
    type = element.class.to_s.downcase
    if type == "cause" || type == "effect"
      true
    else
      false
    end
  end

  def rating(element)
    if element.class.to_s.downcase == "cause"
      element.occurrence
    elsif element.class.to_s.downcase == "effect"
      element.severity
    end
  end

  def rating_color(element)
    return "rating-green" if rating(element).nil?

    if rating(element) <= (0.4 * rating_scale(element))
      "rating-green"
    elsif rating(element) <= (0.8 * rating_scale(element))
      "rating-yellow"
    else
      "rating-red"
    end
  end

  def rating_scale(element)
    element.failure_mode.function.fmea.risk_matrix.scale
  end

  def card_id(element)
    "#{element.class.to_s.downcase}-#{element.id}"
  end

  def placeholder_text(element)
    if element.class.to_s.downcase == "function"
      "Think what is #{element.fmea.fmea_type.downcase} meant to do..."
    elsif element.class.to_s.downcase == "cause"
      "Think what could cause this failure mode to occur..."
    elsif element.class.to_s.downcase == "effect"
      "Think what effect would this have on the #{element.failure_mode.function.fmea.fmea_type.downcase}..."
    elsif element.class.to_s.downcase == "failuremode"
      "Think how might this function fail..."
    else
      ""
    end
  end

  def new_card_broadcast(element)
    {
      action: "create",
      type: element.class.name.downcase,
      body: render_to_string(partial: "fmeas/edit_fmea/card_content", locals: { element: element })
    }
  end
end
