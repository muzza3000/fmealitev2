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
    if rating(element) <= (0.4 * range(element))
      "rating-green"
    elsif rating(element) <= (0.8 * range(element))
      "rating-yellow"
    else
      "rating-red"
    end
  end

  def range(element)
    element.failure_mode.function.fmea.risk_matrix.scale
  end
end
