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

  def placeholder_text(element, belong)
    if element.class.to_s.downcase == "function"
      "Think what is #{belong.fmea_type.downcase} meant to do..."
    else
      ""
    end
  end
end
